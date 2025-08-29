from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import yt_dlp
import os
import tempfile
import threading
import time
import uuid
from urllib.parse import urlparse
import json
import shutil
from concurrent.futures import ThreadPoolExecutor

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:3000",
    "https://youtube-downloader-frontend.onrender.com"
])

# Store download progress and files
download_progress = {}
download_files = {}  # Store file paths
executor = ThreadPoolExecutor(max_workers=3)  # Increased concurrent downloads

class ProgressHook:
    def __init__(self, download_id):
        self.download_id = download_id
    
    def __call__(self, d):
        if d['status'] == 'downloading':
            try:
                percent = d.get('_percent_str', '0%').replace('%', '')
                speed = d.get('_speed_str', 'N/A')
                eta = d.get('_eta_str', 'N/A')
                
                download_progress[self.download_id] = {
                    'status': 'downloading',
                    'percent': float(percent) if percent != 'N/A' else 0,
                    'speed': speed,
                    'eta': eta,
                    'downloaded_bytes': d.get('downloaded_bytes', 0),
                    'total_bytes': d.get('total_bytes', 0)
                }
            except:
                pass
        elif d['status'] == 'finished':
            download_progress[self.download_id] = {
                'status': 'processing',
                'percent': 95,
                'filename': d['filename']
            }

def is_valid_youtube_url(url):
    """Check if URL is a valid YouTube URL"""
    parsed_url = urlparse(url)
    youtube_domains = ['youtube.com', 'youtu.be', 'www.youtube.com', 'm.youtube.com']
    return parsed_url.netloc.lower() in youtube_domains

def get_enhanced_ydl_opts(base_opts=None):
    """Get enhanced yt-dlp options with better error handling and authentication"""
    if base_opts is None:
        base_opts = {}
    
    enhanced_opts = {
        'quiet': True,
        'no_warnings': True,
        'extract_flat': False,
        
        # Enhanced timeouts and retries
        'socket_timeout': 180,  # 3 minutes timeout
        'retries': 8,  # More retries
        'fragment_retries': 8,
        'file_access_retries': 5,
        'extractor_retries': 5,
        
        # Better error handling
        'skip_unavailable_fragments': True,
        'ignoreerrors': False,
        'no_color': True,
        'abort_on_unavailable_fragments': False,
        
        # Enhanced authentication and headers
        'cookiefile': None,
        'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        
        # Better format selection - Allow all qualities
        'format_sort': ['res', 'ext:mp4:m4a', 'proto'],
        'format_sort_force': True,
        
        # Network optimization
        'http_chunk_size': 10485760,  # 10MB chunks
        'concurrent_fragment_downloads': 3,  # Increased for better performance
        
        # Bypass geo-restrictions if needed
        'geo_bypass': True,
        'geo_bypass_country': 'US',
        
        # Additional headers to avoid blocks
        'http_headers': {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-us,en;q=0.5',
            'Sec-Fetch-Mode': 'navigate',
        }
    }
    
    # Merge with base options
    enhanced_opts.update(base_opts)
    return enhanced_opts

@app.route('/api/video-info', methods=['POST'])
def get_video_info():
    try:
        data = request.get_json()
        url = data.get('url', '').strip()
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        if not is_valid_youtube_url(url):
            return jsonify({'error': 'Please provide a valid YouTube URL'}), 400

        # Enhanced options for better support
        ydl_opts = get_enhanced_ydl_opts({
            'noplaylist': True,
            'extract_flat': False,
        })
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            if not info:
                return jsonify({'error': 'Could not extract video information'}), 400
            
            # Get video duration
            duration = info.get('duration', 0)
            print(f"Video duration: {duration} seconds ({duration/60:.1f} minutes)")
            
            # Extract basic video information
            video_info = {
                'title': info.get('title', 'Unknown'),
                'duration': duration,
                'view_count': info.get('view_count', 0),
                'uploader': info.get('uploader', 'Unknown'),
                'thumbnail': info.get('thumbnail', ''),
                'description': (info.get('description', '')[:200] + '...') if info.get('description', '') else '',
                'upload_date': info.get('upload_date', ''),
                'formats': []
            }
            
            # Process available formats - REMOVED restrictive filtering
            formats = info.get('formats', [])
            if not formats:
                return jsonify({'error': 'No formats available for this video'}), 400
            
            video_with_audio = {}
            video_only = {}
            audio_only = {}
            
            # Process ALL video formats without restrictions
            video_formats = []
            audio_formats = []
            
            for fmt in formats:
                if not fmt.get('format_id'):
                    continue
                    
                vcodec = fmt.get('vcodec', 'none')
                acodec = fmt.get('acodec', 'none')
                height = fmt.get('height') or 0
                ext = fmt.get('ext', '')
                
                # Skip invalid formats only
                if ext not in ['mp4', 'm4a', 'webm', 'mkv', '3gp']:
                    continue
                
                # Collect video formats - Accept ALL resolutions
                if vcodec != 'none' and height > 0:
                    video_formats.append(fmt)
                # Collect audio formats
                elif acodec != 'none' and vcodec == 'none':
                    audio_formats.append(fmt)
            
            # Process video formats - Keep ALL qualities
            processed_qualities = set()
            for fmt in sorted(video_formats, key=lambda x: (x.get('height') or 0, x.get('filesize') or 0), reverse=True):
                height = fmt.get('height') or 0
                if height <= 0:
                    continue
                    
                quality = f"{height}p"
                ext = fmt.get('ext', 'mp4')
                
                # Accept ALL common video resolutions (removed restrictions)
                common_heights = [144, 240, 360, 480, 720, 1080, 1440, 2160]
                if height not in common_heights:
                    # Still accept other heights if they're reasonable
                    if height < 100 or height > 5000:
                        continue
                    
                quality_key = f"{quality}_{ext}"
                if quality_key in processed_qualities:
                    continue
                processed_qualities.add(quality_key)
                
                vcodec = fmt.get('vcodec', '')
                acodec = fmt.get('acodec', '')
                filesize = fmt.get('filesize', 0)
                
                format_data = {
                    'quality': quality,
                    'type': 'video',
                    'format_id': fmt['format_id'],
                    'ext': ext,
                    'filesize': filesize,
                    'fps': fmt.get('fps', 30),
                    'vcodec': vcodec,
                    'acodec': acodec,
                    'has_builtin_audio': acodec and acodec != 'none',
                    'combined_with_audio': False,
                    'protocol': fmt.get('protocol', 'https'),
                    'duration': duration  # Add duration info
                }
                
                # Add to appropriate category
                if acodec and acodec != 'none':
                    video_with_audio[f"{quality}_{ext}_builtin"] = format_data
                else:
                    video_only[f"{quality}_{ext}_only"] = format_data
                    # Also create combined option
                    format_data_copy = format_data.copy()
                    format_data_copy['combined_with_audio'] = True
                    if audio_formats:
                        video_with_audio[f"{quality}_{ext}_combined"] = format_data_copy
            
            # Process audio formats - Accept ALL audio qualities
            audio_qualities = {}
            for fmt in sorted(audio_formats, key=lambda x: x.get('abr') or 0, reverse=True):
                abr = fmt.get('abr') or 0
                if abr <= 0:
                    continue
                    
                ext = fmt.get('ext', 'm4a')
                filesize = fmt.get('filesize') or 0
                
                # Accept ALL bitrates
                if abr >= 300:
                    quality_level = "320kbps"
                    target_abr = 320
                elif abr >= 250:
                    quality_level = "256kbps"
                    target_abr = 256
                elif abr >= 180:
                    quality_level = "192kbps" 
                    target_abr = 192
                elif abr >= 100:
                    quality_level = "128kbps"
                    target_abr = 128
                elif abr >= 60:
                    quality_level = "96kbps"
                    target_abr = 96
                else:
                    quality_level = f"{int(abr)}kbps"
                    target_abr = int(abr)
                
                if quality_level not in audio_qualities:
                    audio_qualities[quality_level] = {
                        'quality': quality_level,
                        'type': 'audio',
                        'format_id': fmt['format_id'],
                        'ext': ext,
                        'filesize': filesize,
                        'abr': target_abr,
                        'protocol': fmt.get('protocol', 'https'),
                        'description': f"High Quality Audio ({quality_level})" if abr >= 180 else f"Standard Audio ({quality_level})"
                    }
            
            # Don't limit options - Show more formats
            max_options = 8  # Increased from 4/6
            
            video_with_audio_list = list(video_with_audio.values())[:max_options]
            video_only_list = list(video_only.values())[:max_options]
            audio_only_list = list(audio_qualities.values())[:max_options]
            
            # Sort by quality (highest first)
            video_with_audio_list.sort(key=lambda x: -int(x['quality'].replace('p', '')))
            video_only_list.sort(key=lambda x: -int(x['quality'].replace('p', '')))
            
            video_info['formats'] = {
                'video_with_audio': video_with_audio_list,
                'video_only': video_only_list,
                'audio_only': audio_only_list
            }
            
            print(f"Found formats - Video+Audio: {len(video_with_audio_list)}, Video Only: {len(video_only_list)}, Audio: {len(audio_only_list)}")
            
            return jsonify(video_info)
            
    except yt_dlp.DownloadError as e:
        error_msg = str(e)
        if 'timeout' in error_msg.lower():
            return jsonify({'error': 'Video processing timeout. Please try again.'}), 400
        elif '403' in error_msg or 'forbidden' in error_msg.lower():
            return jsonify({'error': 'Access denied. This video may be geo-restricted.'}), 400
        return jsonify({'error': f'YouTube error: {error_msg}'}), 400
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
        is_conversion = data.get('is_conversion', False)
        target_bitrate = data.get('target_bitrate', data.get('abr', 192))
        duration = data.get('duration', 0)
        
        if not url or not format_id:
            return jsonify({'error': 'URL and format_id are required'}), 400
        
        if not is_valid_youtube_url(url):
            return jsonify({'error': 'Please provide a valid YouTube URL'}), 400
        
        # Generate unique download ID
        download_id = str(uuid.uuid4())
        
        # Initialize progress
        download_progress[download_id] = {
            'status': 'initializing',
            'percent': 0
        }
        
        print(f"Starting download - Duration: {duration}s, Type: {download_type}, Format: {format_id}")
        
        # Start download
        future = executor.submit(
            download_worker, download_id, url, format_id, download_type, 
            original_ext, is_conversion, target_bitrate, duration
        )
        
        return jsonify({'download_id': download_id})
        
    except Exception as e:
        print(f"API error: {str(e)}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

def download_worker(download_id, url, format_id, download_type, original_ext='mp4', 
                   is_conversion=False, target_bitrate=192, duration=0):
    """Enhanced worker function for downloading videos - supports ALL durations"""
    temp_dir = None
    try:
        download_progress[download_id] = {
            'status': 'starting',
            'percent': 5
        }
        
        temp_dir = tempfile.mkdtemp()
        
        download_progress[download_id] = {
            'status': 'downloading',
            'percent': 10
        }
        
        # Enhanced base options - optimized for ALL video lengths
        base_opts = get_enhanced_ydl_opts({
            'progress_hooks': [ProgressHook(download_id)],
            'keepvideo': False,
        })
        
        # Dynamic timeout based on duration
        if duration > 3600:  # Videos longer than 1 hour
            base_opts.update({
                'socket_timeout': 600,  # 10 minute timeout for very long videos
                'retries': 10,
                'fragment_retries': 10,
                'http_chunk_size': 8388608,  # 8MB chunks
                'concurrent_fragment_downloads': 2,  # Conservative for long videos
            })
            print(f"Using long video settings for {duration}s video")
        elif duration > 1800:  # Videos longer than 30 minutes
            base_opts.update({
                'socket_timeout': 300,  # 5 minute timeout
                'retries': 8,
                'fragment_retries': 8,
                'http_chunk_size': 10485760,  # 10MB chunks
                'concurrent_fragment_downloads': 3,
            })
            print(f"Using medium video settings for {duration}s video")
        else:
            # Standard settings for shorter videos
            base_opts.update({
                'socket_timeout': 180,  # 3 minute timeout
                'concurrent_fragment_downloads': 4,  # Faster for short videos
            })
        
        if download_type == 'audio':
            if original_ext == 'mp3' or is_conversion:
                ydl_opts = {
                    **base_opts,
                    'format': f'{format_id}/bestaudio[ext=m4a]/bestaudio',
                    'outtmpl': os.path.join(temp_dir, '%(title).100s.%(ext)s'),
                    'postprocessors': [{
                        'key': 'FFmpegExtractAudio',
                        'preferredcodec': 'mp3',
                        'preferredquality': str(target_bitrate),
                    }],
                    'prefer_ffmpeg': True,
                }
            else:
                ydl_opts = {
                    **base_opts,
                    'format': f'{format_id}/bestaudio',
                    'outtmpl': os.path.join(temp_dir, '%(title).100s.%(ext)s'),
                    'prefer_ffmpeg': True,
                }
        else:
            # Improved format selection for ALL video lengths
            format_selector = f'{format_id}+bestaudio/best[format_id={format_id}]/best'
            
            ydl_opts = {
                **base_opts,
                'format': format_selector,
                'outtmpl': os.path.join(temp_dir, '%(title).100s.%(ext)s'),
                'prefer_ffmpeg': True,
                'merge_output_format': 'mp4',  # Always try to merge to mp4
            }
        
        print(f"Download config - Type: {download_type}, Duration: {duration}s, Format: {format_id}")
        
        # Enhanced retry mechanism
        max_attempts = 5 if duration > 1800 else 3  # More retries for longer videos
        last_error = None
        
        for attempt in range(max_attempts):
            try:
                if attempt > 0:
                    print(f"Retry attempt {attempt + 1} for {download_id}")
                    download_progress[download_id] = {
                        'status': f'retrying (attempt {attempt + 1})',
                        'percent': 10 + (attempt * 5)
                    }
                    time.sleep(3 + attempt)  # Progressive backoff
                
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    ydl.download([url])
                    break  # Success, break out of retry loop
                    
            except yt_dlp.DownloadError as e:
                last_error = e
                error_msg = str(e).lower()
                
                if '403' in error_msg or 'forbidden' in error_msg:
                    if attempt < max_attempts - 1:
                        print(f"403 error, trying alternative format selection...")
                        # Try with simpler format selection
                        if download_type == 'video':
                            ydl_opts['format'] = f'best[format_id={format_id}]/best'
                        continue
                    else:
                        raise e
                elif 'timeout' in error_msg or 'connection' in error_msg:
                    if attempt < max_attempts - 1:
                        print(f"Connection/timeout error, retrying...")
                        continue
                    else:
                        raise e
                else:
                    if attempt < max_attempts - 1:
                        print(f"Download error: {error_msg}, retrying...")
                        continue
                    else:
                        raise e
        else:
            # All attempts failed
            if last_error:
                raise last_error
            
        download_progress[download_id] = {
            'status': 'finalizing',
            'percent': 90
        }
        
        # Find downloaded file
        files = [f for f in os.listdir(temp_dir) if os.path.isfile(os.path.join(temp_dir, f))]
        if files:
            largest_file = max(files, key=lambda f: os.path.getsize(os.path.join(temp_dir, f)))
            filepath = os.path.join(temp_dir, largest_file)
            
            # Wait for file to be completely written
            time.sleep(2)
            
            if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
                file_size = os.path.getsize(filepath)
                print(f"Download completed: {largest_file} ({file_size/1024/1024:.1f} MB)")
                
                download_files[download_id] = {
                    'filepath': filepath,
                    'filename': largest_file,
                    'temp_dir': temp_dir,
                    'filesize': file_size,
                    'expected_format': original_ext
                }
                
                download_progress[download_id] = {
                    'status': 'completed',
                    'percent': 100,
                    'filename': largest_file,
                    'filepath': filepath,
                    'filesize': file_size
                }
            else:
                raise Exception("Downloaded file is empty or corrupted")
        else:
            raise Exception("No files were downloaded")
                
    except Exception as e:
        error_msg = str(e)
        print(f"Download error for {download_id}: {error_msg}")
        
        # Provide specific error messages
        if '403' in error_msg or 'HTTP Error 403' in error_msg:
            error_msg = "Access denied. This video may be geo-restricted or require special permissions."
        elif 'timeout' in error_msg.lower():
            error_msg = "Download timeout. Please check your internet connection and try again."
        elif 'unavailable' in error_msg.lower():
            error_msg = "Video format unavailable. Try a different quality option."
        elif 'private' in error_msg.lower():
            error_msg = "This video is private or requires authentication."
        
        download_progress[download_id] = {
            'status': 'error',
            'percent': 0,
            'error': f"Download failed: {error_msg}"
        }
        
        if temp_dir and os.path.exists(temp_dir):
            shutil.rmtree(temp_dir, ignore_errors=True)

@app.route('/api/progress/<download_id>', methods=['GET'])
def get_progress(download_id):
    progress = download_progress.get(download_id, {'status': 'not_found'})
    return jsonify(progress)

@app.route('/api/download-direct/<download_id>', methods=['GET'])
def download_direct(download_id):
    """Direct download endpoint for browser's default download behavior"""
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
        
        if not os.path.exists(filepath):
            return jsonify({'error': 'File not found on disk'}), 404
            
        file_size = os.path.getsize(filepath)
        if file_size == 0:
            return jsonify({'error': 'Downloaded file is empty'}), 404
        
        file_ext = filename.split('.')[-1].lower()
        mime_types = {
            'mp4': 'video/mp4',
            'webm': 'video/webm', 
            'mkv': 'video/x-matroska',
            'mp3': 'audio/mpeg',
            'm4a': 'audio/mp4',
            'ogg': 'audio/ogg'
        }
        mime_type = mime_types.get(file_ext, 'application/octet-stream')
        
        def cleanup_after_send():
            time.sleep(15)  # Wait longer for large files
            try:
                if os.path.exists(file_info['temp_dir']):
                    shutil.rmtree(file_info['temp_dir'], ignore_errors=True)
                download_progress.pop(download_id, None)
                download_files.pop(download_id, None)
            except Exception as e:
                print(f"Cleanup error for {download_id}: {e}")
        
        threading.Thread(target=cleanup_after_send, daemon=True).start()
        
        return send_file(
            filepath,
            as_attachment=True,
            download_name=filename,
            mimetype=mime_type
        )
        
    except Exception as e:
        print(f"Direct download error for {download_id}: {str(e)}")
        return jsonify({'error': f'Download error: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'active_downloads': len(download_progress),
        'cached_files': len(download_files)
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
                
                if temp_dir and os.path.exists(temp_dir):
                    dir_age = current_time - os.path.getctime(temp_dir)
                    # Increased cleanup time to 4 hours for large files
                    if dir_age > 14400:  
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

cleanup_thread = threading.Thread(target=cleanup_old_downloads, daemon=True)
cleanup_thread.start()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)