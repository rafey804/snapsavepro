from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import tempfile
import threading
import time
import uuid
import shutil
from concurrent.futures import ThreadPoolExecutor

# Import platform-specific modules
from tiktok import TiktokDownloader
from instagram import InstagramDownloader
from facebook import FacebookDownloader
from audio_downloader import AudioDownloader
from utils import detect_platform, ProgressHook, download_worker

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:3001", 
    "https://snapsavepro.com", 
    "http://snapsavepro.com",
    "http://localhost:3000"
], supports_credentials=True)

# Store download progress and files
download_progress = {}
download_files = {}
executor = ThreadPoolExecutor(max_workers=4)

# Initialize platform downloaders
tiktok_downloader = TiktokDownloader()
instagram_downloader = InstagramDownloader()
facebook_downloader = FacebookDownloader()
audio_downloader = AudioDownloader()

@app.route('/api/video-info', methods=['POST'])
def get_video_info():
    try:
        data = request.get_json()
        url = data.get('url', '').strip()
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        platform = detect_platform(url)
        
        if platform == 'unknown':
            return jsonify({'error': 'Please provide a valid TikTok, Instagram, or Facebook URL'}), 400

        print(f"Processing {platform.upper()} URL: {url}")

        # Route to appropriate platform handler
        if platform == 'tiktok':
            return tiktok_downloader.get_video_info(url)
        elif platform == 'instagram':
            return instagram_downloader.get_video_info(url)
        elif platform == 'facebook':
            return facebook_downloader.get_video_info(url)
            
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/audio-info', methods=['POST'])
def get_audio_info():
    """New endpoint for audio-only downloads from links"""
    try:
        data = request.get_json()
        url = data.get('url', '').strip()
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400

        print(f"Processing AUDIO URL: {url}")

        # Route to audio downloader
        return audio_downloader.get_audio_info(url)
            
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/download', methods=['POST'])
def download_video():
    try:
        data = request.get_json()
        url = data.get('url', '').strip()
        format_id = data.get('format_id')
        download_type = data.get('type', 'video')
        original_ext = data.get('ext', 'mp4')
        target_bitrate = data.get('target_bitrate', 192)
        duration = data.get('duration', 0)
        platform = data.get('platform', detect_platform(url))
        is_conversion = data.get('is_conversion', False)
        direct_url = data.get('direct_url')  # For direct audio downloads
        
        if not url or not format_id:
            return jsonify({'error': 'URL and format_id are required'}), 400
        
        # Handle audio-only downloads
        if platform == 'direct_link' or direct_url:
            platform = 'audio_link'
        elif platform == 'unknown' and not direct_url:
            # Try to determine if it's a supported audio platform
            audio_validation = audio_downloader.validate_audio_url(url)
            if audio_validation:
                platform = 'audio_platform'
            else:
                return jsonify({'error': 'Please provide a valid URL'}), 400
        
        download_id = str(uuid.uuid4())
        
        download_progress[download_id] = {
            'status': 'initializing',
            'percent': 0,
            'platform': platform
        }
        
        print(f"Starting {platform} download - Format: {format_id}, Type: {download_type}, Conversion: {is_conversion}")
        
        # Handle audio-specific downloads
        if platform in ['audio_link', 'audio_platform']:
            if platform == 'audio_link':
                future = executor.submit(
                    audio_downloader.download_direct_audio, url, download_id, 
                    download_progress, download_files
                )
            else:
                future = executor.submit(
                    audio_downloader.download_platform_audio, url, download_id, 
                    download_progress, download_files, target_bitrate
                )
        else:
            future = executor.submit(
                download_worker, download_id, url, format_id, download_type, 
                original_ext, target_bitrate, duration, platform, is_conversion,
                download_progress, download_files
            )
        
        return jsonify({'download_id': download_id})
        
    except Exception as e:
        print(f"API error: {str(e)}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/progress/<download_id>', methods=['GET'])
def get_progress(download_id):
    progress = download_progress.get(download_id, {'status': 'not_found'})
    return jsonify(progress)

@app.route('/api/download-direct/<download_id>', methods=['GET'])
def download_direct(download_id):
    """Direct download endpoint"""
    try:
        if download_id not in download_progress:
            return jsonify({'error': 'Download ID not found'}), 404
            
        progress = download_progress.get(download_id)
        
        if not progress or progress.get('status') != 'completed':
            return jsonify({
                'error': f'Download not ready. Status: {progress.get("status", "unknown") if progress else "not found"}',
                'status': progress.get('status') if progress else 'not found',
                'percent': progress.get('percent', 0) if progress else 0
            }), 400
        
        file_info = download_files.get(download_id)
        if not file_info:
            return jsonify({'error': 'File information not found'}), 404
        
        filepath = file_info['filepath']
        filename = file_info['filename']
        platform = file_info.get('platform', 'tiktok')
        
        if not os.path.exists(filepath):
            return jsonify({'error': 'File not found on disk'}), 404
            
        file_size = os.path.getsize(filepath)
        if file_size == 0:
            return jsonify({'error': 'Downloaded file is empty'}), 404
        
        file_ext = filename.split('.')[-1].lower()
        mime_types = {
            'mp4': 'video/mp4',
            'webm': 'video/webm',
            'mp3': 'audio/mpeg',
            'm4a': 'audio/mp4',
        }
        mime_type = mime_types.get(file_ext, 'application/octet-stream')
        
        def cleanup_after_send():
            cleanup_delay = 10 if platform == 'tiktok' else 8
            time.sleep(cleanup_delay)
            try:
                if os.path.exists(file_info['temp_dir']):
                    shutil.rmtree(file_info['temp_dir'], ignore_errors=True)
                download_progress.pop(download_id, None)
                download_files.pop(download_id, None)
            except Exception as e:
                print(f"Cleanup error: {e}")
        
        threading.Thread(target=cleanup_after_send, daemon=True).start()
        
        return send_file(
            filepath,
            as_attachment=True,
            download_name=filename,
            mimetype=mime_type,
            conditional=True,
            etag=False
        )
        
    except Exception as e:
        print(f"Direct download error: {str(e)}")
        return jsonify({'error': f'Download error: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    import yt_dlp
    return jsonify({
        'status': 'healthy',
        'service': 'TikTok, Instagram & Facebook Video Downloader',
        'active_downloads': len(download_progress),
        'cached_files': len(download_files),
        'supported_platforms': ['tiktok', 'instagram', 'facebook'],
        'yt_dlp_version': yt_dlp.version.__version__
    })

# Enhanced cleanup function
def cleanup_old_downloads():
    while True:
        try:
            current_time = time.time()
            to_remove = []
            
            for download_id in list(download_progress.keys()):
                if download_id not in download_files:
                    continue
                    
                file_info = download_files.get(download_id, {})
                temp_dir = file_info.get('temp_dir')
                platform = file_info.get('platform', 'tiktok')
                
                if temp_dir and os.path.exists(temp_dir):
                    dir_age = current_time - os.path.getctime(temp_dir)
                    max_age = 1800 if platform == 'tiktok' else 1200  # 30min for TikTok, 20min for Instagram
                    
                    if dir_age > max_age:
                        to_remove.append(download_id)
                        
            for download_id in to_remove:
                if download_id in download_files:
                    file_info = download_files[download_id]
                    if os.path.exists(file_info.get('temp_dir', '')):
                        shutil.rmtree(file_info['temp_dir'], ignore_errors=True)
                    download_files.pop(download_id, None)
                download_progress.pop(download_id, None)
                
            if to_remove:
                print(f"Cleaned up {len(to_remove)} old downloads")
                
        except Exception as e:
            print(f"Cleanup error: {e}")
        
        time.sleep(600)  # Run every 10 minutes

# Start cleanup thread
cleanup_thread = threading.Thread(target=cleanup_old_downloads, daemon=True)
cleanup_thread.start()

if __name__ == '__main__':
    print("Starting Enhanced TikTok & Instagram Video Downloader")
    print("TikTok: HD downloads with watermark removal")
    print("Instagram: Posts, Reels, IGTV support with FIXED thumbnail and audio handling")
    print("Facebook: Enhanced video and audio extraction")
    print("FIXES APPLIED:")
    print("- Enhanced thumbnail extraction with multiple fallbacks")
    print("- Better audio detection (assumes Instagram videos have audio by default)")
    print("- Improved format processing for audio/video merging")
    print("- Multiple retry mechanisms for maximum reliability")
    app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)