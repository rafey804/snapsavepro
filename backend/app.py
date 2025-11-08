import os
import logging
import tempfile
import threading
import time
import uuid
import shutil
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv

from flask import Flask, request, jsonify, send_file, Response
from flask_cors import CORS
from werkzeug.exceptions import RequestEntityTooLarge

# Load environment variables
load_dotenv()

# Import platform-specific modules
from tiktok import TiktokDownloader
from snapchat import SnapchatDownloader
from facebook import FacebookDownloader
from audio_downloader import AudioDownloader
from pinterest import PinterestDownloader
from instagram import InstagramDownloader
from linkedin import LinkedInDownloader
from twitch import TwitchDownloader
from kwai import KwaiDownloader
from dailymotion import DailymotionDownloader
from threads import ThreadsDownloader
from instagram_profile import InstagramProfileDownloader
from profile_picture_downloader import ProfilePictureDownloader
from telegram_downloader import TelegramDownloader
from videomp3convert import VideoToMP3Converter
from utils import detect_platform, ProgressHook, download_worker

# Environment Configuration
DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
PORT = int(os.getenv('PORT', 5002))
HOST = os.getenv('HOST', '127.0.0.1')
MAX_CONTENT_LENGTH = int(os.getenv('MAX_CONTENT_LENGTH', 104857600))  # 100MB
SECRET_KEY = os.getenv('SECRET_KEY', 'your-default-secret-key-change-this')

# CORS Configuration
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS',
    'http://localhost:3000,http://localhost:3001,http://localhost:3003'
).split(',')

# Strip whitespace from origins
ALLOWED_ORIGINS = [origin.strip() for origin in ALLOWED_ORIGINS]

# Configure logging
logging.basicConfig(
    level=logging.INFO if not DEBUG else logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Flask App Configuration
app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# CORS Setup
CORS(app, origins=ALLOWED_ORIGINS, supports_credentials=True)

# Store download progress and files
download_progress = {}
download_files = {}
executor = ThreadPoolExecutor(max_workers=8)  # Increased to 8 to handle 5+ videos simultaneously

# Initialize platform downloaders
try:
    tiktok_downloader = TiktokDownloader()
    snapchat_downloader = SnapchatDownloader()
    facebook_downloader = FacebookDownloader()
    from twitter import TwitterDownloader
    twitter_downloader = TwitterDownloader()
    from reddit import RedditDownloader
    reddit_downloader = RedditDownloader()
    pinterest_downloader = PinterestDownloader()
    instagram_downloader = InstagramDownloader()
    linkedin_downloader = LinkedInDownloader()
    twitch_downloader = TwitchDownloader()
    kwai_downloader = KwaiDownloader()
    dailymotion_downloader = DailymotionDownloader()
    threads_downloader = ThreadsDownloader()
    audio_downloader = AudioDownloader()
    instagram_profile_downloader = InstagramProfileDownloader()
    profile_picture_downloader = ProfilePictureDownloader()
    telegram_downloader = TelegramDownloader()
    video_mp3_converter = VideoToMP3Converter()
    logger.info("All platform downloaders initialized successfully")
except Exception as e:
    logger.error(f"Error initializing downloaders: {e}")
    raise

# Error Handlers
@app.errorhandler(413)
@app.errorhandler(RequestEntityTooLarge)
def handle_file_too_large(error):
    logger.warning("File upload too large")
    return jsonify({'error': 'File too large. Maximum size is 100MB.'}), 413

@app.errorhandler(500)
def handle_internal_error(error):
    logger.error(f"Internal server error: {error}")
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(404)
def handle_not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(405)
def handle_method_not_allowed(error):
    return jsonify({'error': 'Method not allowed'}), 405

# Middleware for request logging
@app.before_request
def log_request_info():
    if DEBUG:
        logger.debug(f"Request: {request.method} {request.url}")
        logger.debug(f"Headers: {dict(request.headers)}")

@app.after_request
def log_response_info(response):
    if DEBUG:
        logger.debug(f"Response: {response.status_code}")
    return response

# Routes
@app.route('/api/video-info', methods=['POST'])
def get_video_info():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400
            
        url = data.get('url', '').strip()
        
        if not url:
            return jsonify({'error': 'URL is required'}), 400
        
        platform = detect_platform(url)

        if platform == 'unknown':
            return jsonify({'error': 'Please provide a valid TikTok, Instagram, Snapchat, Facebook, Twitter, Reddit, Pinterest, LinkedIn, Twitch, or Telegram URL'}), 400

        logger.info(f"Processing {platform.upper()} URL: {url}")

        # Route to appropriate platform handler
        if platform == 'tiktok':
            return tiktok_downloader.get_video_info(url)
        elif platform == 'snapchat':
            return snapchat_downloader.get_video_info(url)
        elif platform == 'twitter':
            return twitter_downloader.get_video_info(url)
        elif platform == 'reddit':
            return reddit_downloader.get_video_info(url)
        elif platform == 'pinterest':
            return pinterest_downloader.get_video_info(url)
        elif platform == 'instagram':
            return instagram_downloader.get_video_info(url)
        elif platform == 'facebook':
            return facebook_downloader.get_video_info(url)
        elif platform == 'linkedin':
            return linkedin_downloader.get_video_info(url)
        elif platform == 'twitch':
            return twitch_downloader.get_video_info(url)
        elif platform == 'kwai':
            return kwai_downloader.get_video_info(url)
        elif platform == 'dailymotion':
            return dailymotion_downloader.get_video_info(url)
        elif platform == 'threads':
            return threads_downloader.get_video_info(url)
        elif platform == 'telegram':
            return telegram_downloader.get_video_info(url)

    except Exception as e:
        logger.error(f"Unexpected error in get_video_info: {str(e)}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/audio-info', methods=['POST'])
def get_audio_info():
    """New endpoint for audio-only downloads from links"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400

        url = data.get('url', '').strip()

        if not url:
            return jsonify({'error': 'URL is required'}), 400

        logger.info(f"Processing AUDIO URL: {url}")

        # Use generic audio downloader
        return audio_downloader.get_audio_info(url)

    except Exception as e:
        logger.error(f"Unexpected error in get_audio_info: {str(e)}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/download', methods=['POST'])
def download_video():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400
            
        url = data.get('url', '').strip()
        format_id = data.get('format_id')
        download_type = data.get('type', 'video')
        original_ext = data.get('ext', 'mp4')
        target_bitrate = data.get('target_bitrate', 192)
        duration = data.get('duration', 0)
        platform = data.get('platform', detect_platform(url))
        is_conversion = data.get('is_conversion', False)
        direct_url = data.get('direct_url')  # For direct audio downloads
        direct_video_url = data.get('direct_video_url')  # For direct video downloads (Threads)
        image_url = data.get('image_url')  # For direct image downloads

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
        
        logger.info(f"Starting {platform} download - Format: {format_id}, Type: {download_type}, Conversion: {is_conversion}")

        # Handle Telegram downloads
        if platform == 'telegram':
            logger.info(f"Using Telegram downloader for {url}")
            future = executor.submit(
                telegram_downloader.download_media, url, download_id,
                download_progress, download_files
            )
        # Handle audio-specific downloads
        elif platform in ['audio_link', 'audio_platform']:
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
                download_progress, download_files, image_url, direct_video_url
            )
        
        return jsonify({'download_id': download_id})
        
    except Exception as e:
        logger.error(f"API error in download_video: {str(e)}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/progress/<download_id>', methods=['GET'])
def get_progress(download_id):
    try:
        progress = download_progress.get(download_id, {'status': 'not_found'})
        return jsonify(progress)
    except Exception as e:
        logger.error(f"Error getting progress for {download_id}: {e}")
        return jsonify({'status': 'error', 'error': str(e)}), 500

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
            logger.error(f"File not found on disk: {filepath}")
            return jsonify({'error': 'File not found on disk'}), 404
            
        file_size = os.path.getsize(filepath)
        if file_size == 0:
            logger.error(f"Downloaded file is empty: {filepath}")
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
                logger.info(f"Cleaned up download {download_id}")
            except Exception as e:
                logger.error(f"Cleanup error for {download_id}: {e}")
        
        threading.Thread(target=cleanup_after_send, daemon=True).start()
        
        logger.info(f"Serving file download: {filename} ({file_size} bytes)")
        
        return send_file(
            filepath,
            as_attachment=True,
            download_name=filename,
            mimetype=mime_type,
            conditional=True,
            etag=False
        )
        
    except Exception as e:
        logger.error(f"Direct download error for {download_id}: {str(e)}")
        return jsonify({'error': f'Download error: {str(e)}'}), 500

@app.route('/api/download-stream', methods=['GET'])
def download_stream():
    """Stream download directly to browser - browser handles progress"""
    try:
        # Get parameters from query string
        url = request.args.get('url')
        format_id = request.args.get('format_id')
        download_type = request.args.get('download_type', 'video')
        ext = request.args.get('ext', 'mp4')
        duration = int(request.args.get('duration', 0))
        platform = request.args.get('platform', 'shorts')
        filename = request.args.get('filename', f'{platform}_video.{ext}')

        if not url or not format_id:
            return jsonify({'error': 'Missing required parameters'}), 400

        logger.info(f"Starting stream download - Platform: {platform}, Format: {format_id}")

        # Use utils.py download_worker to get the file
        from utils import download_worker
        import uuid

        download_id = str(uuid.uuid4())

        # Start download in background and wait for completion
        future = executor.submit(
            download_worker,
            download_id, url, format_id, download_type, ext, 192, duration, platform, False, download_progress, download_files
        )

        # Wait for download to complete (with timeout)
        future.result(timeout=120)  # 2 minute timeout

        # Check if download completed
        if download_id not in download_files:
            return jsonify({'error': 'Download failed'}), 500

        file_info = download_files[download_id]
        filepath = file_info['filepath']

        if not os.path.exists(filepath):
            return jsonify({'error': 'File not found'}), 404

        file_size = os.path.getsize(filepath)
        mime_types = {
            'mp4': 'video/mp4',
            'webm': 'video/webm',
            'mp3': 'audio/mpeg',
            'm4a': 'audio/mp4',
        }
        mime_type = mime_types.get(ext, 'application/octet-stream')

        # Stream file to browser with proper headers for download
        def generate():
            with open(filepath, 'rb') as f:
                while True:
                    chunk = f.read(8192)  # 8KB chunks
                    if not chunk:
                        break
                    yield chunk

            # Cleanup after streaming
            try:
                if os.path.exists(file_info['temp_dir']):
                    shutil.rmtree(file_info['temp_dir'], ignore_errors=True)
                download_progress.pop(download_id, None)
                download_files.pop(download_id, None)
            except Exception as e:
                logger.error(f"Cleanup error: {e}")

        response = Response(generate(), mimetype=mime_type)
        response.headers['Content-Disposition'] = f'attachment; filename="{filename}"'
        response.headers['Content-Length'] = str(file_size)
        response.headers['Cache-Control'] = 'no-cache'

        logger.info(f"Streaming file: {filename} ({file_size} bytes)")
        return response

    except TimeoutError:
        logger.error("Download timeout exceeded")
        return jsonify({'error': 'Download timeout - video may be too large'}), 504
    except Exception as e:
        logger.error(f"Stream download error: {str(e)}")
        return jsonify({'error': f'Download error: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    try:
        import yt_dlp
        return jsonify({
            'status': 'healthy',
            'service': 'Multi-Platform Video Downloader',
            'active_downloads': len(download_progress),
            'cached_files': len(download_files),
            'supported_platforms': ['tiktok', 'snapchat', 'facebook', 'instagram', 'twitter', 'reddit', 'pinterest', 'linkedin', 'twitch', 'telegram'],
            'yt_dlp_version': yt_dlp.version.__version__,
            'telegram_enabled': telegram_downloader.enabled,
            'debug_mode': DEBUG,
            'allowed_origins': ALLOWED_ORIGINS
        })
    except Exception as e:
        logger.error(f"Health check error: {e}")
        return jsonify({
            'status': 'error',
            'error': str(e)
        }), 500

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
                logger.info(f"Cleaned up {len(to_remove)} old downloads")
                
        except Exception as e:
            logger.error(f"Cleanup error: {e}")
        
        time.sleep(600)  # Run every 10 minutes

# Profile Picture Downloader Endpoints
@app.route('/api/profile-picture', methods=['POST'])
def get_profile_picture():
    """Get profile picture from various platforms"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400

        username = data.get('username', '').strip()
        platform = data.get('platform', 'instagram').lower()

        if not username:
            return jsonify({'error': 'Username is required'}), 400

        logger.info(f"Fetching profile picture for {username} from {platform}")

        # Use universal profile picture downloader for all platforms
        response_data = profile_picture_downloader.get_profile_picture(username, platform)
        return jsonify(response_data), 200

    except Exception as e:
        logger.error(f"Error fetching profile picture: {str(e)}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/instagram-profile', methods=['POST'])
def get_instagram_profile():
    """Get Instagram profile picture specifically"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400

        username = data.get('username', '').strip()

        if not username:
            return jsonify({'error': 'Instagram username is required'}), 400

        logger.info(f"Fetching Instagram profile for {username}")

        # Use the Instagram profile downloader
        response_data = instagram_profile_downloader.get_profile_info(username)

        return jsonify(response_data), 200

    except Exception as e:
        logger.error(f"Error fetching Instagram profile: {str(e)}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/api/proxy-image', methods=['GET'])
def proxy_image():
    """Proxy profile picture images to avoid CORS issues"""
    try:
        import requests

        image_url = request.args.get('url')
        if not image_url:
            return jsonify({'error': 'Image URL is required'}), 400

        logger.info(f"Proxying image: {image_url[:80]}...")

        # Fetch the image from Instagram/social media CDN
        response = requests.get(
            image_url,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://www.instagram.com/',
            },
            timeout=15
        )
        response.raise_for_status()

        # Return the image with proper headers
        return Response(
            response.content,
            mimetype=response.headers.get('Content-Type', 'image/jpeg'),
            headers={
                'Cache-Control': 'public, max-age=31536000',
                'Access-Control-Allow-Origin': '*'
            }
        )

    except Exception as e:
        logger.error(f"Error proxying image: {str(e)}")
        return jsonify({'error': f'Failed to load image: {str(e)}'}), 500

@app.route('/api/download-profile-picture', methods=['POST'])
def download_profile_picture():
    """Download profile picture file"""
    try:
        import requests
        from io import BytesIO

        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400

        image_url = data.get('url', '')
        username = data.get('username', 'profile')
        format_type = data.get('format', 'jpg').lower()

        if not image_url:
            return jsonify({'error': 'Image URL is required'}), 400

        logger.info(f"Downloading profile picture for {username} from {image_url[:80]}...")

        # Fetch the image
        response = requests.get(
            image_url,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://www.instagram.com/',
            },
            timeout=15
        )
        response.raise_for_status()

        # Prepare filename
        filename = f"{username}_profile_picture.{format_type}"

        # Return the file for download
        return send_file(
            BytesIO(response.content),
            mimetype=f'image/{format_type}',
            as_attachment=True,
            download_name=filename
        )

    except Exception as e:
        logger.error(f"Error downloading profile picture: {str(e)}")
        return jsonify({'error': f'Failed to download image: {str(e)}'}), 500

# Video to MP3 Converter Endpoints
@app.route('/api/video-to-mp3/upload', methods=['POST'])
def upload_video_for_mp3():
    """Upload video file and convert to MP3"""
    try:
        # Check if file is in request
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        # Get bitrate parameter (default 192kbps)
        bitrate = int(request.form.get('bitrate', 192))

        # Validate bitrate
        if bitrate not in [128, 192, 256, 320]:
            bitrate = 192

        # Save uploaded file temporarily
        temp_dir = tempfile.mkdtemp()
        original_filename = file.filename
        temp_filepath = os.path.join(temp_dir, original_filename)

        file.save(temp_filepath)
        logger.info(f"Video file uploaded: {original_filename} ({os.path.getsize(temp_filepath)} bytes)")

        # Create download ID for progress tracking
        download_id = str(uuid.uuid4())

        download_progress[download_id] = {
            'status': 'processing',
            'percent': 0,
            'message': 'Starting conversion...',
            'platform': 'video_to_mp3'
        }

        def progress_update(percent, message):
            """Update progress for this conversion"""
            download_progress[download_id] = {
                'status': 'processing',
                'percent': percent,
                'message': message,
                'platform': 'video_to_mp3'
            }

        # Process video in background
        def process_video():
            try:
                logger.info(f"Starting conversion for {original_filename} with ID {download_id}")
                result = video_mp3_converter.process_uploaded_video(
                    temp_filepath,
                    original_filename,
                    bitrate,
                    progress_update
                )

                if result['success']:
                    logger.info(f"Conversion successful for {original_filename}: {result['output_filename']}")
                    download_files[download_id] = {
                        'filepath': result['output_path'],
                        'filename': result['output_filename'],
                        'platform': 'video_to_mp3',
                        'temp_dir': temp_dir
                    }
                    download_progress[download_id] = {
                        'status': 'completed',
                        'percent': 100,
                        'message': 'Conversion complete!',
                        'platform': 'video_to_mp3',
                        'bitrate': result['bitrate'],
                        'file_size': result['output_size']
                    }
                else:
                    logger.error(f"Conversion failed for {original_filename}: {result.get('error', 'Unknown error')}")
                    download_progress[download_id] = {
                        'status': 'error',
                        'percent': 0,
                        'message': result.get('error', 'Conversion failed'),
                        'platform': 'video_to_mp3'
                    }

                # Clean up uploaded file
                try:
                    if os.path.exists(temp_filepath):
                        os.remove(temp_filepath)
                except:
                    pass

            except Exception as e:
                logger.error(f"Video to MP3 conversion error: {e}")
                download_progress[download_id] = {
                    'status': 'error',
                    'percent': 0,
                    'message': f'Error: {str(e)}',
                    'platform': 'video_to_mp3'
                }

        # Start background processing
        executor.submit(process_video)

        return jsonify({
            'download_id': download_id,
            'message': 'Video uploaded successfully, conversion started'
        })

    except Exception as e:
        logger.error(f"Error uploading video for MP3 conversion: {str(e)}")
        return jsonify({'error': f'Upload failed: {str(e)}'}), 500

@app.route('/api/video-to-mp3/url', methods=['POST'])
def convert_url_to_mp3():
    """Convert video from URL to MP3"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Invalid JSON data'}), 400

        url = data.get('url', '').strip()
        bitrate = int(data.get('bitrate', 192))

        if not url:
            return jsonify({'error': 'URL is required'}), 400

        # Validate bitrate
        if bitrate not in [128, 192, 256, 320]:
            bitrate = 192

        logger.info(f"Converting URL to MP3: {url} at {bitrate}kbps")

        # Create download ID for progress tracking
        download_id = str(uuid.uuid4())

        download_progress[download_id] = {
            'status': 'processing',
            'percent': 0,
            'message': 'Fetching video...',
            'platform': 'video_to_mp3'
        }

        def progress_update(percent, message):
            """Update progress for this conversion"""
            download_progress[download_id] = {
                'status': 'processing',
                'percent': percent,
                'message': message,
                'platform': 'video_to_mp3'
            }

        # Process URL in background
        def process_url():
            try:
                result = video_mp3_converter.convert_url_to_mp3(
                    url,
                    bitrate,
                    progress_update
                )

                if result['success']:
                    temp_dir = os.path.dirname(result['output_path'])
                    download_files[download_id] = {
                        'filepath': result['output_path'],
                        'filename': result['output_filename'],
                        'platform': 'video_to_mp3',
                        'temp_dir': temp_dir
                    }
                    download_progress[download_id] = {
                        'status': 'completed',
                        'percent': 100,
                        'message': 'Conversion complete!',
                        'platform': 'video_to_mp3',
                        'bitrate': result['bitrate'],
                        'file_size': result['output_size']
                    }
                else:
                    download_progress[download_id] = {
                        'status': 'error',
                        'percent': 0,
                        'message': result.get('error', 'Conversion failed'),
                        'platform': 'video_to_mp3'
                    }

            except Exception as e:
                logger.error(f"URL to MP3 conversion error: {e}")
                download_progress[download_id] = {
                    'status': 'error',
                    'percent': 0,
                    'message': f'Error: {str(e)}',
                    'platform': 'video_to_mp3'
                }

        # Start background processing
        executor.submit(process_url)

        return jsonify({
            'download_id': download_id,
            'message': 'URL conversion started'
        })

    except Exception as e:
        logger.error(f"Error converting URL to MP3: {str(e)}")
        return jsonify({'error': f'Conversion failed: {str(e)}'}), 500

@app.route('/api/video-to-mp3/formats', methods=['GET'])
def get_supported_formats():
    """Get list of supported video formats and bitrates"""
    try:
        return jsonify({
            'video_formats': video_mp3_converter.supported_video_formats,
            'audio_bitrates': video_mp3_converter.supported_audio_bitrates,
            'max_file_size': '500MB',
            'message': 'Supported formats retrieved successfully'
        })
    except Exception as e:
        logger.error(f"Error getting supported formats: {str(e)}")
        return jsonify({'error': f'Failed to get formats: {str(e)}'}), 500

# Start cleanup thread
cleanup_thread = threading.Thread(target=cleanup_old_downloads, daemon=True)
cleanup_thread.start()

if __name__ == '__main__':
    logger.info("Starting Enhanced Video Downloader API")
    logger.info(f"Debug mode: {DEBUG}")
    logger.info(f"Host: {HOST}")
    logger.info(f"Port: {PORT}")
    logger.info(f"Allowed origins: {ALLOWED_ORIGINS}")
    logger.info(f"Max content length: {MAX_CONTENT_LENGTH} bytes")
    
    if DEBUG:
        logger.info("Running in development mode")
        app.run(debug=True, host='0.0.0.0', port=PORT, threaded=True)
    else:
        logger.info("Running in production mode")
        # For production, this should be handled by Gunicorn
        app.run(debug=False, host=HOST, port=5002, threaded=True)