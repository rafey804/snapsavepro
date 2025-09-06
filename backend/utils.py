import yt_dlp
import os
import tempfile
import threading
import time
import shutil
import re

class ProgressHook:
    def __init__(self, download_id, download_progress_dict=None):
        self.download_id = download_id
        self.download_progress = download_progress_dict
    
    def __call__(self, d):
        if not self.download_progress:
            return
            
        if d['status'] == 'downloading':
            try:
                percent = d.get('_percent_str', '0%').replace('%', '')
                speed = d.get('_speed_str', 'N/A')
                eta = d.get('_eta_str', 'N/A')
                
                self.download_progress[self.download_id] = {
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
            self.download_progress[self.download_id] = {
                'status': 'processing',
                'percent': 95,
                'filename': d['filename']
            }

def detect_platform(url):
    """Detect if URL is TikTok, Instagram, or Facebook"""
    url = url.strip().lower()
    
    # TikTok patterns
    tiktok_patterns = [
        r'(?:https?://)?(?:www\.)?tiktok\.com/@[\w.-]+/video/\d+',
        r'(?:https?://)?(?:vm|vt)\.tiktok\.com/[\w.-]+',
        r'(?:https?://)?(?:www\.)?tiktok\.com/t/[\w.-]+',
        r'(?:https?://)?m\.tiktok\.com/v/\d+',
    ]
    
    for pattern in tiktok_patterns:
        if re.match(pattern, url):
            return 'tiktok'
    
    # Instagram patterns
    instagram_patterns = [
        r'(?:https?://)?(?:www\.)?instagram\.com/p/[\w-]+/?',
        r'(?:https?://)?(?:www\.)?instagram\.com/reel/[\w-]+/?',
        r'(?:https?://)?(?:www\.)?instagram\.com/reels/[\w-]+/?',
        r'(?:https?://)?(?:www\.)?instagram\.com/tv/[\w-]+/?',
    ]
    
    for pattern in instagram_patterns:
        if re.match(pattern, url):
            return 'instagram'
    
    # Facebook patterns
    facebook_patterns = [
        r'(?:https?://)?(?:www\.|m\.)?facebook\.com/[\w.-]+/videos/[\w.-]+/?',
        r'(?:https?://)?(?:www\.|m\.)?facebook\.com/watch/?\?v=[\w.-]+',
        r'(?:https?://)?(?:www\.|m\.)?facebook\.com/[\w.-]+/posts/[\w.-]+',
        r'(?:https?://)?(?:www\.|m\.)?facebook\.com/reel/[\w.-]+/?',
        r'(?:https?://)?(?:www\.|m\.)?facebook\.com/[\w.-]+/videos/[\w.-]+/[\w.-]+/?',
        r'(?:https?://)?fb\.watch/[\w.-]+/?',
    ]
    
    for pattern in facebook_patterns:
        if re.match(pattern, url):
            return 'facebook'
    
    return 'unknown'

def get_best_thumbnail(info):
    """Get the best quality thumbnail from video info with multiple fallbacks"""
    # Try multiple thumbnail sources
    thumbnail_sources = [
        info.get('thumbnail'),
        info.get('display_id', {}).get('thumbnail') if isinstance(info.get('display_id'), dict) else None,
    ]
    
    thumbnails = info.get('thumbnails', [])
    if thumbnails:
        # Sort by resolution and prefer certain formats
        def thumbnail_score(thumb):
            width = thumb.get('width', 0)
            height = thumb.get('height', 0)
            resolution = width * height
            url = thumb.get('url', '')
            
            # Prefer jpg/jpeg over webp, and avoid very small thumbnails
            if width < 150 or height < 150:
                return 0
            if url.endswith(('.jpg', '.jpeg')):
                resolution += 1000000
            elif url.endswith('.webp'):
                resolution += 500000
                
            return resolution
        
        valid_thumbnails = [t for t in thumbnails if thumbnail_score(t) > 0]
        if valid_thumbnails:
            best_thumbnail = max(valid_thumbnails, key=thumbnail_score)
            thumbnail_sources.append(best_thumbnail.get('url'))
    
    # Return first valid thumbnail URL
    for thumb_url in thumbnail_sources:
        if thumb_url and isinstance(thumb_url, str) and thumb_url.startswith('http'):
            return thumb_url
    
    return ''

def detect_audio_in_format(fmt):
    """Enhanced audio detection in format"""
    acodec = fmt.get('acodec', 'none')
    vcodec = fmt.get('vcodec', 'none')
    
    # Check if format explicitly has audio codec
    if acodec and acodec != 'none':
        return True
    
    # Check format note for audio indicators
    format_note = (fmt.get('format_note', '') + ' ' + fmt.get('format', '')).lower()
    audio_indicators = ['audio', 'sound', 'mp3', 'm4a', 'aac', 'opus']
    
    if any(indicator in format_note for indicator in audio_indicators):
        return True
    
    # Check if it's a video format with potential audio
    if vcodec and vcodec != 'none':
        # Most video formats should have audio unless specifically noted
        video_only_indicators = ['video only', 'no audio', 'silent']
        if not any(indicator in format_note for indicator in video_only_indicators):
            # For Instagram, assume video formats have audio by default
            return True
    
    return False

def download_worker(download_id, url, format_id, download_type, original_ext='mp4', 
                   target_bitrate=192, duration=0, platform='tiktok', is_conversion=False,
                   download_progress=None, download_files=None):
    """Enhanced download worker with better audio handling"""
    temp_dir = None
    try:
        download_progress[download_id] = {
            'status': 'starting',
            'percent': 5,
            'platform': platform
        }
        
        temp_dir = tempfile.mkdtemp()
        
        download_progress[download_id] = {
            'status': 'downloading',
            'percent': 10,
            'platform': platform
        }
        
        # Import platform-specific options
        if platform == 'tiktok':
            from tiktok import TiktokDownloader
            downloader = TiktokDownloader()
            base_opts = downloader.get_robust_tiktok_opts({
                'progress_hooks': [ProgressHook(download_id)],
                'keepvideo': False,
            })
        elif platform == 'instagram':
            from instagram import InstagramDownloader
            downloader = InstagramDownloader()
            base_opts = downloader.get_robust_instagram_opts({
                'progress_hooks': [ProgressHook(download_id)],
                'keepvideo': False,
            })
        else:  # facebook
            from facebook import FacebookDownloader
            downloader = FacebookDownloader()
            base_opts = downloader.get_robust_facebook_opts({
                'progress_hooks': [ProgressHook(download_id)],
                'keepvideo': False,
            })
        
        # Enhanced format selection and audio handling
        if download_type == 'audio':
            # For audio downloads, use the best format and extract audio
            ydl_opts = {
                **base_opts,
                'format': f'{format_id}/best[height<=1080]+bestaudio/best',
                'outtmpl': os.path.join(temp_dir, '%(title).100s.%(ext)s'),
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': str(target_bitrate),
                }],
                'prefer_ffmpeg': True,
                'merge_output_format': 'mp3',
            }
        else:
            # For video downloads, ensure we get the format with audio
            if platform == 'instagram':
                # For Instagram, try to get video+audio merged
                video_format = f'{format_id}+bestaudio/best[ext=mp4]/best'
            elif platform == 'facebook':
                # For Facebook, try to get video+audio merged
                video_format = f'{format_id}+bestaudio/best[ext=mp4]/best'
            else:
                video_format = f'{format_id}'
            
            ydl_opts = {
                **base_opts,
                'format': video_format,
                'outtmpl': os.path.join(temp_dir, '%(title).100s.%(ext)s'),
                'prefer_ffmpeg': True,
                'merge_output_format': 'mp4',
            }
        
        # Download with retries
        max_attempts = 3
        last_error = None
        
        for attempt in range(max_attempts):
            try:
                if attempt > 0:
                    print(f"{platform} download retry {attempt + 1}")
                    download_progress[download_id] = {
                        'status': f'retrying (attempt {attempt + 1})',
                        'percent': 15 + (attempt * 5),
                        'platform': platform
                    }
                    time.sleep(3 + attempt)
                
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    ydl.download([url])
                    break  # Success
                    
            except Exception as e:
                last_error = e
                error_msg = str(e).lower()
                
                if 'private' in error_msg or 'login' in error_msg:
                    raise e  # Don't retry authentication errors
                
                if attempt < max_attempts - 1:
                    continue
                else:
                    raise e
        
        download_progress[download_id] = {
            'status': 'finalizing',
            'percent': 90,
            'platform': platform
        }
        
        # Find downloaded file
        files = [f for f in os.listdir(temp_dir) if os.path.isfile(os.path.join(temp_dir, f))]
        if files:
            largest_file = max(files, key=lambda f: os.path.getsize(os.path.join(temp_dir, f)))
            filepath = os.path.join(temp_dir, largest_file)
            
            time.sleep(2)  # Wait for file completion
            
            if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
                file_size = os.path.getsize(filepath)
                print(f"{platform} download completed: {largest_file} ({file_size/1024/1024:.1f} MB)")
                
                download_files[download_id] = {
                    'filepath': filepath,
                    'filename': largest_file,
                    'temp_dir': temp_dir,
                    'filesize': file_size,
                    'expected_format': original_ext,
                    'platform': platform
                }
                
                download_progress[download_id] = {
                    'status': 'completed',
                    'percent': 100,
                    'filename': largest_file,
                    'filepath': filepath,
                    'filesize': file_size,
                    'platform': platform
                }
            else:
                raise Exception("Downloaded file is empty or corrupted")
        else:
            raise Exception("No files were downloaded")
                
    except Exception as e:
        error_msg = str(e)
        print(f"{platform} download error for {download_id}: {error_msg}")
        
        # Platform-specific error handling
        if platform == 'tiktok':
            if 'signature' in error_msg.lower():
                error_msg = "TikTok signature error. Please try again in a few minutes."
            elif 'private' in error_msg.lower():
                error_msg = "This TikTok video is private or requires login."
            elif 'unavailable' in error_msg.lower():
                error_msg = "TikTok video unavailable. It may have been deleted."
            elif '403' in error_msg or 'forbidden' in error_msg.lower():
                error_msg = "Access denied. Video may be geo-restricted."
        elif platform == 'instagram':
            if 'login' in error_msg.lower() or 'cookie' in error_msg.lower():
                error_msg = "Instagram requires login for this content. Try a public post."
            elif 'private' in error_msg.lower():
                error_msg = "This Instagram content is private."
            elif 'unavailable' in error_msg.lower():
                error_msg = "Instagram content unavailable or deleted."
        else:  # facebook
            if 'login' in error_msg.lower() or 'cookie' in error_msg.lower():
                error_msg = "Facebook requires login for this content. Try a public video."
            elif 'private' in error_msg.lower():
                error_msg = "This Facebook content is private."
            elif 'unavailable' in error_msg.lower():
                error_msg = "Facebook content unavailable or deleted."
            elif 'age-restricted' in error_msg.lower():
                error_msg = "This Facebook video is age-restricted."
        
        download_progress[download_id] = {
            'status': 'error',
            'percent': 0,
            'error': f"{platform.title()} download failed: {error_msg}",
            'platform': platform
        }
        
        if temp_dir and os.path.exists(temp_dir):
            shutil.rmtree(temp_dir, ignore_errors=True)