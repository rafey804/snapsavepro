import yt_dlp
import os
import tempfile
import threading
import time
import shutil
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class ProgressHook:
    def __init__(self, download_id, download_progress_dict=None):
        self.download_id = download_id
        self.download_progress = download_progress_dict
    
    def __call__(self, d):
        if not self.download_progress:
            return

        if d['status'] == 'downloading':
            try:
                # Better percent calculation
                downloaded = d.get('downloaded_bytes', 0)
                total = d.get('total_bytes') or d.get('total_bytes_estimate', 0)

                if total and total > 0:
                    percent = min((downloaded / total) * 100, 99)
                else:
                    # Fallback to string parsing
                    percent_str = d.get('_percent_str', '0%').replace('%', '').strip()
                    try:
                        percent = float(percent_str)
                    except:
                        percent = 0

                speed = d.get('_speed_str', 'N/A')
                eta = d.get('_eta_str', 'N/A')

                self.download_progress[self.download_id] = {
                    'status': 'downloading',
                    'percent': min(percent, 99),
                    'speed': speed,
                    'eta': eta,
                    'downloaded_bytes': downloaded,
                    'total_bytes': total
                }
            except Exception as e:
                print(f"[DEBUG] Progress hook error: {e}")
                pass
        elif d['status'] == 'finished':
            print(f"[DEBUG] yt-dlp finished downloading, setting to processing")
            self.download_progress[self.download_id] = {
                'status': 'processing',
                'percent': 95,
                'filename': d.get('filename', '')
            }

def detect_platform(url):
    """Detect platform from URL"""
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

    
    # Snapchat patterns - More comprehensive
    snapchat_patterns = [
        r'(?:https?://)?(?:www\.)?snapchat\.com/add/[\w.-]+/?',
        r'(?:https?://)?(?:www\.)?snapchat\.com/@[\w.-]+/spotlight/[\w_-]+/?',  # User spotlight
        r'(?:https?://)?(?:www\.)?snapchat\.com/spotlight/[\w_-]+/?',  # Direct spotlight
        r'(?:https?://)?(?:www\.)?snapchat\.com/t/[\w_-]+/?',
        r'(?:https?://)?(?:www\.)?snapchat\.com/p/[\w_-]+/?',
        r'(?:https?://)?t\.snapchat\.com/[\w_-]+/?',
        r'(?:https?://)?(?:www\.)?snapchat\.com/@[\w.-]+/?',  # User profile
        r'(?:https?://)?(?:story|www)\.snapchat\.com/(?:s|p)/[\w_-]+/?',
        r'(?:https?://)?(?:www\.)?snapchat\.com/discover/[\w_-]+/[\w_-]+/?',  # Discover stories
    ]

    for pattern in snapchat_patterns:
        if re.match(pattern, url):
            return 'snapchat'

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

    # Twitter/X patterns
    # Reddit patterns
    reddit_patterns = [
        r'(?:https?://)?(?:www\.|old\.|new\.)?reddit\.com/r/[\w]+/comments/[\w]+',
        r'(?:https?://)?(?:www\.|old\.|new\.)?reddit\.com/r/[\w]+/s/[\w]+',
        r'(?:https?://)?(?:www\.)?redd\.it/[\w]+',
        r'(?:https?://)?v\.redd\.it/[\w]+',
        r'(?:https?://)?i\.redd\.it/[\w]+',
    ]

    for pattern in reddit_patterns:
        if re.match(pattern, url):
            return 'reddit'

    twitter_patterns = [
        r'(?:https?://)?(?:www\.|mobile\.)?twitter\.com/[\w]+/status/\d+',
        r'(?:https?://)?(?:www\.|mobile\.)?x\.com/[\w]+/status/\d+',
        r'(?:https?://)?(?:www\.)?twitter\.com/i/status/\d+',
        r'(?:https?://)?(?:www\.)?x\.com/i/status/\d+',
        r'(?:https?://)?t\.co/[\w]+',  # Twitter short URLs
    ]

    for pattern in twitter_patterns:
        if re.match(pattern, url):
            return 'twitter'

    # Pinterest patterns
    pinterest_patterns = [
        r'(?:https?://)?(?:www\.)?pinterest\.com/pin/\d+/?',
        r'(?:https?://)?(?:www\.)?pinterest\.com/pin/[\w-]+/?',
        r'(?:https?://)?(?:www\.)?pinterest\.[a-z.]+/pin/\d+/?',
        r'(?:https?://)?(?:www\.)?pin\.it/[\w-]+/?',
    ]

    for pattern in pinterest_patterns:
        if re.match(pattern, url):
            return 'pinterest'

    # Instagram patterns
    instagram_patterns = [
        r'(?:https?://)?(?:www\.)?instagram\.com/p/[\w-]+/?',
        r'(?:https?://)?(?:www\.)?instagram\.com/reel/[\w-]+/?',
        r'(?:https?://)?(?:www\.)?instagram\.com/reels/[\w-]+/?',
        r'(?:https?://)?(?:www\.)?instagram\.com/tv/[\w-]+/?',
        r'(?:https?://)?(?:www\.)?instagr\.am/p/[\w-]+/?',
        r'(?:https?://)?(?:www\.)?instagr\.am/reel/[\w-]+/?',
    ]

    for pattern in instagram_patterns:
        if re.match(pattern, url):
            return 'instagram'

    # LinkedIn patterns
    linkedin_patterns = [
        r'(?:https?://)?(?:www\.)?linkedin\.com/posts/[\w-]+',
        r'(?:https?://)?(?:www\.)?linkedin\.com/feed/update/urn:li:activity:\d+',
        r'(?:https?://)?(?:www\.)?linkedin\.com/feed/update/urn:li:ugcPost:\d+',
        r'(?:https?://)?(?:www\.)?linkedin\.com/video/live/urn:li:ugcPost:\d+',
    ]

    for pattern in linkedin_patterns:
        if re.match(pattern, url):
            return 'linkedin'

    # Twitch patterns
    twitch_patterns = [
        r'(?:https?://)?(?:www\.)?twitch\.tv/[\w-]+/clip/[\w-]+/?',
        r'(?:https?://)?(?:www\.)?clips\.twitch\.tv/[\w-]+/?',
        r'(?:https?://)?(?:www\.)?twitch\.tv/videos/\d+/?',
        r'(?:https?://)?(?:www\.)?twitch\.tv/[\w-]+/video/\d+/?',
    ]

    for pattern in twitch_patterns:
        if re.match(pattern, url):
            return 'twitch'

    # Kwai patterns
    kwai_patterns = [
        r'(?:https?://)?(?:www\.)?kwai\.com/@[\w.-]+/video/[\w-]+/?',
        r'(?:https?://)?(?:www\.)?kwai\.me/[\w-]+/?',
        r'(?:https?://)?(?:www\.)?kwai\.video/[\w-]+/?',
        r'(?:https?://)?m\.kwai\.com/[\w-]+/?',
        r'(?:https?://)?(?:www\.)?kwai\.com/.*',
    ]

    for pattern in kwai_patterns:
        if re.match(pattern, url):
            return 'kwai'

    # Dailymotion patterns
    dailymotion_patterns = [
        r'(?:https?://)?(?:www\.)?dailymotion\.com/video/[\w]+',
        r'(?:https?://)?(?:www\.)?dai\.ly/[\w]+',
        r'(?:https?://)?(?:www\.)?dailymotion\.com/[\w]+',
    ]

    for pattern in dailymotion_patterns:
        if re.match(pattern, url):
            return 'dailymotion'

    # Threads patterns - Support both threads.net and threads.com
    threads_patterns = [
        r'(?:https?://)?(?:www\.)?threads\.(?:net|com)/@[^/]+/post/[\w-]+',
        r'(?:https?://)?(?:www\.)?threads\.(?:net|com)/t/[\w-]+',
        r'(?:https?://)?(?:www\.)?threads\.(?:net|com)/[\w]+',
    ]

    for pattern in threads_patterns:
        if re.match(pattern, url):
            return 'threads'

    # Telegram patterns
    telegram_patterns = [
        r'(?:https?://)?t\.me/([a-zA-Z0-9_]+)/(\d+)',
        r'(?:https?://)?t\.me/c/(\d+)/(\d+)',
        r'(?:https?://)?telegram\.me/([a-zA-Z0-9_]+)/(\d+)',
    ]

    for pattern in telegram_patterns:
        if re.match(pattern, url):
            return 'telegram'

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
                   download_progress=None, download_files=None, image_url=None, direct_video_url=None):
    """Enhanced download worker with better audio handling and image support"""
    temp_dir = None
    try:
        download_progress[download_id] = {
            'status': 'starting',
            'percent': 5,
            'platform': platform
        }

        temp_dir = tempfile.mkdtemp()

        # Handle direct image downloads
        if download_type == 'image' and image_url:
            download_progress[download_id] = {
                'status': 'downloading',
                'percent': 30,
                'platform': platform
            }

            # Download image directly
            import requests
            response = requests.get(image_url, timeout=60)
            response.raise_for_status()

            # Determine file extension from URL or content-type
            ext = original_ext if original_ext != 'mp4' else 'jpg'
            if 'png' in image_url.lower():
                ext = 'png'
            elif 'webp' in image_url.lower():
                ext = 'webp'

            output_file = os.path.join(temp_dir, f'{platform}_image.{ext}')
            with open(output_file, 'wb') as f:
                f.write(response.content)

            download_progress[download_id] = {
                'status': 'completed',
                'percent': 100,
                'platform': platform
            }

            # Store file info in proper format
            download_files[download_id] = {
                'filepath': output_file,
                'filename': os.path.basename(output_file),
                'platform': platform,
                'temp_dir': temp_dir
            }
            print(f"Image download completed: {output_file}")
            return

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
                'progress_hooks': [ProgressHook(download_id, download_progress)],
                'keepvideo': False,
            })
        elif platform == 'snapchat':
            from snapchat import SnapchatDownloader
            downloader = SnapchatDownloader()
            base_opts = downloader.get_robust_snapchat_opts({
                'progress_hooks': [ProgressHook(download_id, download_progress)],
                'keepvideo': False,
            })
        elif platform == 'twitter':
            from twitter import TwitterDownloader
            downloader = TwitterDownloader()
            base_opts = downloader.get_robust_twitter_opts({
                'progress_hooks': [ProgressHook(download_id, download_progress)],
                'keepvideo': False,
            })
        elif platform == 'reddit':
            from reddit import RedditDownloader
            downloader = RedditDownloader()
            base_opts = downloader.get_robust_reddit_opts({
                'progress_hooks': [ProgressHook(download_id, download_progress)],
                'keepvideo': False,
            })
        elif platform == 'pinterest':
            from pinterest import PinterestDownloader
            downloader = PinterestDownloader()
            base_opts = {
                'progress_hooks': [ProgressHook(download_id, download_progress)],
                'quiet': True,
                'no_warnings': True,
            }
        elif platform == 'instagram':
            # Instagram uses instagrapi (not yt-dlp), so we handle it separately
            # Set dummy base_opts to avoid variable errors (not used for Instagram)
            base_opts = {}
        elif platform == 'linkedin':
            from linkedin import LinkedInDownloader
            downloader = LinkedInDownloader()
            base_opts = downloader.get_robust_linkedin_opts({
                'progress_hooks': [ProgressHook(download_id, download_progress)],
                'keepvideo': False,
            })
        elif platform == 'kwai':
            from kwai import KwaiDownloader
            downloader = KwaiDownloader()
            base_opts = downloader.get_robust_kwai_opts({
                'progress_hooks': [ProgressHook(download_id, download_progress)],
                'keepvideo': False,
            })
        elif platform == 'dailymotion':
            from dailymotion import DailymotionDownloader
            downloader = DailymotionDownloader()
            base_opts = downloader.get_robust_dailymotion_opts({
                'progress_hooks': [ProgressHook(download_id, download_progress)],
                'keepvideo': False,
            })
        elif platform == 'threads':
            from threads import ThreadsDownloader
            downloader = ThreadsDownloader()
            base_opts = downloader.get_robust_threads_opts({
                'progress_hooks': [ProgressHook(download_id, download_progress)],
                'keepvideo': False,
            })
        else:  # facebook
            from facebook import FacebookDownloader
            downloader = FacebookDownloader()
            base_opts = downloader.get_robust_facebook_opts({
                'progress_hooks': [ProgressHook(download_id, download_progress)],
                'keepvideo': False,
            })
        
        # Enhanced format selection and audio handling
        if download_type == 'audio':
            # For audio downloads, use the best format and extract audio
            # Handle unique format_id (e.g., "0_audio_192kbps" -> extract "0")
            actual_format_id = format_id
            if '_audio_' in format_id:
                # Extract original format_id before the suffix
                actual_format_id = format_id.split('_audio_')[0]
                print(f"Audio download: Using original format_id '{actual_format_id}' from '{format_id}'")

            ydl_opts = {
                **base_opts,
                'format': f'{actual_format_id}/best[height<=1080]+bestaudio/best',
                'outtmpl': os.path.join(temp_dir, f'{platform}_audio.%(ext)s'),  # Use simple filename to avoid Unicode issues
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': str(target_bitrate),
                }],
                'prefer_ffmpeg': True,
                'merge_output_format': 'mp3',
                'restrictfilenames': False,  # Allow unicode in filenames
                'windowsfilenames': True,  # Make filenames Windows-compatible
            }
        else:
            # For video downloads, ensure we get the format with audio
            if platform == 'instagram':
                # For Instagram, try to get video+audio merged
                video_format = f'{format_id}+bestaudio/best[ext=mp4]/best'
            elif platform == 'snapchat':
                # For Snapchat, try to get video+audio merged
                video_format = f'{format_id}+bestaudio/best[ext=mp4]/best'
            elif platform == 'twitter':
                # For Twitter, try to get video+audio merged
                video_format = f'{format_id}+bestaudio/best[ext=mp4]/best'
            elif platform == 'reddit':
                # For Reddit, try to get video+audio merged
                video_format = f'{format_id}+bestaudio/best[ext=mp4]/best'
            elif platform == 'pinterest':
                # For Pinterest, try to get video+audio merged
                video_format = f'{format_id}+bestaudio/best[ext=mp4]/best'
            elif platform == 'facebook':
                # For Facebook, try to get video+audio merged
                video_format = f'{format_id}+bestaudio/best[ext=mp4]/best'
            elif platform == 'kwai':
                # For Kwai, try to get video+audio merged
                video_format = f'{format_id}+bestaudio/best[ext=mp4]/best'
            elif platform == 'dailymotion':
                # For Dailymotion, try to get video+audio merged
                video_format = f'{format_id}+bestaudio/best[ext=mp4]/best'
            else:
                video_format = f'{format_id}'

            ydl_opts = {
                **base_opts,
                'format': video_format,
                'outtmpl': os.path.join(temp_dir, f'{platform}_video.%(ext)s'),  # Use simple filename to avoid Unicode issues
                'restrictfilenames': False,  # Allow unicode in filenames
                'windowsfilenames': True,  # Make filenames Windows-compatible
            }
        
        # Download with retries
        max_attempts = 3
        last_error = None

        # Special handling for Instagram, LinkedIn scraped videos, and Threads (use direct URL, not yt-dlp)
        if platform == 'instagram' or platform == 'threads' or (platform == 'linkedin' and format_id == 'scraped_video'):
            try:
                print(f"[DEBUG] Starting direct download for {platform} - {download_id}")

                # Get direct URL based on platform
                direct_video_url = None

                if platform == 'instagram':
                    from instagram import InstagramDownloader
                    downloader = InstagramDownloader()
                    video_info = downloader.get_video_info(url)
                    video_formats = video_info.get('formats', {}).get('video_formats', [])
                    if not video_formats:
                        raise Exception("No video formats available for Instagram download")
                    direct_video_url = video_formats[0].get('direct_url')

                elif platform == 'threads':
                    # Check if direct_video_url was passed from frontend (faster, avoids re-scraping)
                    if direct_video_url:
                        print(f"[DEBUG] Using direct video URL from frontend for Threads")
                        # direct_video_url is already set from function parameters
                    else:
                        print(f"[DEBUG] Scraping Threads post again to get video URL")
                        from threads import ThreadsDownloader
                        downloader = ThreadsDownloader()
                        # Call with return_json=False to get dict instead of Flask response
                        video_info = downloader.get_video_info(url, return_json=False)

                        # Get video URL (same for both video and audio - we extract audio later)
                        video_formats = video_info.get('formats', {}).get('video_formats', [])
                        if not video_formats:
                            raise Exception("No video formats available for Threads download")
                        direct_video_url = video_formats[0].get('direct_url')

                elif platform == 'linkedin' and format_id == 'scraped_video':
                    from linkedin import LinkedInDownloader
                    downloader = LinkedInDownloader()
                    scraped_data = downloader.extract_from_webpage(url)
                    if scraped_data:
                        direct_video_url = scraped_data.get('video_url')

                if not direct_video_url:
                    raise Exception(f"Could not get direct download URL from {platform}")

                print(f"[DEBUG] Got {platform} direct URL, downloading...")

                # Download using requests
                import requests
                response = requests.get(direct_video_url, stream=True, timeout=60)
                response.raise_for_status()

                # Save video to temp file first (always download as video)
                temp_video_file = os.path.join(temp_dir, f'{platform}_video_temp.mp4')
                total_size = int(response.headers.get('content-length', 0))
                downloaded = 0

                with open(temp_video_file, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        if chunk:
                            f.write(chunk)
                            downloaded += len(chunk)
                            if total_size > 0:
                                percent = int((downloaded / total_size) * 100)
                                download_progress[download_id] = {
                                    'status': 'downloading',
                                    'percent': min(percent, 90) if download_type == 'audio' else min(percent, 99),
                                    'platform': platform
                                }

                print(f"[DEBUG] {platform} video downloaded successfully")

                # If audio download, extract audio using FFmpeg
                if download_type == 'audio':
                    print(f"[DEBUG] Extracting audio from video for {platform}...")
                    download_progress[download_id] = {
                        'status': 'processing',
                        'percent': 92,
                        'platform': platform
                    }

                    output_file = os.path.join(temp_dir, f'{platform}_audio.mp3')

                    # Use FFmpeg to extract audio
                    import subprocess
                    ffmpeg_cmd = [
                        'ffmpeg', '-i', temp_video_file,
                        '-vn',  # No video
                        '-acodec', 'libmp3lame',
                        '-ab', f'{target_bitrate}k',
                        '-ar', '44100',
                        '-y',  # Overwrite output file
                        output_file
                    ]

                    try:
                        subprocess.run(ffmpeg_cmd, check=True, capture_output=True, timeout=60)
                        print(f"[DEBUG] Audio extraction successful")

                        # Remove temp video file
                        if os.path.exists(temp_video_file):
                            os.remove(temp_video_file)

                    except subprocess.CalledProcessError as e:
                        print(f"[ERROR] FFmpeg extraction failed: {e.stderr.decode() if e.stderr else str(e)}")
                        raise Exception("Failed to extract audio from video")
                    except Exception as e:
                        print(f"[ERROR] Audio extraction error: {str(e)}")
                        raise Exception(f"Audio extraction failed: {str(e)}")
                else:
                    # For video download, just rename the temp file
                    output_file = os.path.join(temp_dir, f'{platform}_video.mp4')
                    if os.path.exists(output_file):
                        os.remove(output_file)
                    os.rename(temp_video_file, output_file)

                print(f"[DEBUG] {platform} direct download SUCCESS for {download_id}")

            except Exception as e:
                print(f"[ERROR] {platform} direct download failed: {str(e)}")
                raise e
        else:
            # Use yt-dlp for other platforms
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

                    print(f"[DEBUG] Starting yt-dlp download for {download_id} (platform: {platform})")
                    print(f"[DEBUG] Download options: format={ydl_opts.get('format', 'N/A')}")

                    # Direct download without context manager or __exit__ (prevents hanging on Windows)
                    ydl = yt_dlp.YoutubeDL(ydl_opts)
                    try:
                        print(f"[DEBUG] Calling ydl.download() for {download_id}...")
                        ydl.download([url])
                        print(f"[DEBUG] yt-dlp download() call completed for {download_id}")
                    finally:
                        # Force cleanup without hanging
                        try:
                            if hasattr(ydl, '_opener'):
                                ydl._opener = None
                        except:
                            pass

                    print(f"[DEBUG] Download attempt {attempt + 1} SUCCESS for {download_id}")
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
        
        print(f"[DEBUG] Reached finalization section for {download_id}")
        download_progress[download_id] = {
            'status': 'finalizing',
            'percent': 90,
            'platform': platform
        }
        print(f"[DEBUG] Set status to finalizing for {download_id}")

        # Give minimal time for file system to complete
        time.sleep(0.3)

        # Find downloaded file
        print(f"[DEBUG] Looking for files in temp_dir: {temp_dir}")
        files = [f for f in os.listdir(temp_dir) if os.path.isfile(os.path.join(temp_dir, f))]
        print(f"[DEBUG] Found {len(files)} files: {files}")
        if files:
            largest_file = max(files, key=lambda f: os.path.getsize(os.path.join(temp_dir, f)))
            filepath = os.path.join(temp_dir, largest_file)

            print(f"[DEBUG] Largest file: {largest_file}")
            print(f"[DEBUG] File path: {filepath}")

            # Quick stability check
            print(f"[DEBUG] Waiting for file to be fully written...")
            max_wait = 40  # Increased from 8 to 40 (12 seconds total instead of 2.4)
            wait_count = 0
            last_size = 0
            while wait_count < max_wait:
                time.sleep(0.3)  # Faster polling
                if os.path.exists(filepath):
                    current_size = os.path.getsize(filepath)
                    print(f"[DEBUG] File size check {wait_count}: {current_size/1024/1024:.2f} MB (last: {last_size/1024/1024:.2f} MB)")
                    if current_size > 0 and current_size == last_size:
                        # File size stable, probably finished
                        print(f"[DEBUG] File size stable at {current_size/1024/1024:.2f} MB, doing final check...")
                        time.sleep(0.5)  # Longer final check for better stability
                        if os.path.getsize(filepath) == current_size:
                            print(f"[DEBUG] File confirmed stable, breaking out of wait loop")
                            break
                    last_size = current_size
                wait_count += 1

            print(f"[DEBUG] File wait complete after {wait_count * 0.3:.1f} seconds, final size: {os.path.getsize(filepath)/1024/1024:.2f} MB" if os.path.exists(filepath) else f"[DEBUG] File wait complete but file not found after {wait_count * 0.3:.1f} seconds")

            print(f"[DEBUG] Checking file existence and size...")
            if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
                file_size = os.path.getsize(filepath)
                print(f"[DEBUG] File exists with size: {file_size/1024/1024:.1f} MB")
                print(f"{platform} download completed: {largest_file} ({file_size/1024/1024:.1f} MB)")

                print(f"[DEBUG] Saving to download_files dict...")
                download_files[download_id] = {
                    'filepath': filepath,
                    'filename': largest_file,
                    'temp_dir': temp_dir,
                    'filesize': file_size,
                    'expected_format': original_ext,
                    'platform': platform
                }
                print(f"[DEBUG] Saved to download_files")

                # Directly set to completed - no intermediate step for speed
                print(f"[DEBUG] Setting progress status to completed...")
                download_progress[download_id] = {
                    'status': 'completed',
                    'percent': 100,
                    'filename': largest_file,
                    'filepath': filepath,
                    'filesize': file_size,
                    'platform': platform
                }
                print(f"[DEBUG] SUCCESSFULLY set status to COMPLETED for {download_id}")
                print(f"[DEBUG] Final progress: {download_progress[download_id]}")
            else:
                # Retry stability check one more time if file seems incomplete
                print(f"[WARN] File appears empty or missing, retrying stability check once more...")
                time.sleep(3)  # Give more time for file system
                if os.path.exists(filepath):
                    retry_size = os.path.getsize(filepath)
                    print(f"[DEBUG] Retry check - file size: {retry_size/1024/1024:.2f} MB")
                    if retry_size > 0:
                        # File appeared! Update and continue
                        file_size = retry_size
                        print(f"[SUCCESS] File recovered after retry: {file_size/1024/1024:.1f} MB")
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
                        print(f"[DEBUG] Recovery successful for {download_id}")
                    else:
                        # Still empty after retry - add detailed error logging
                        file_size = os.path.getsize(filepath)
                        print(f"[ERROR] File exists but is empty after retry: {filepath} (size: {file_size} bytes)")
                        raise Exception(f"Downloaded file is empty: {largest_file} (0 bytes). File may still be writing or download failed.")
                else:
                    print(f"[ERROR] File not found after download and retry: {filepath}")
                    print(f"[ERROR] Files in temp_dir: {files}")
                    raise Exception(f"Downloaded file not found: {largest_file}. File may have been deleted or never created.")
        else:
            print(f"[ERROR] No files found in temp directory: {temp_dir}")
            print(f"[ERROR] Directory contents: {os.listdir(temp_dir) if os.path.exists(temp_dir) else "Directory does not exist"}")
            raise Exception("No files were downloaded. Check if yt-dlp is working correctly and URL is valid.")
                
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
        elif platform == 'snapchat':
            if 'login' in error_msg.lower() or 'private' in error_msg.lower():
                error_msg = "This Snapchat content is private or requires login."
            elif 'unavailable' in error_msg.lower() or 'not found' in error_msg.lower():
                error_msg = "Snapchat content unavailable or deleted."
            elif '403' in error_msg or 'forbidden' in error_msg.lower():
                error_msg = "Access denied. Content may be restricted."
            elif 'geo' in error_msg.lower() or 'region' in error_msg.lower():
                error_msg = "This Snapchat content is not available in your region."
        elif platform == 'twitter':
            if 'login' in error_msg.lower() or 'private' in error_msg.lower() or 'protected' in error_msg.lower():
                error_msg = "This Twitter post is private or protected."
            elif 'unavailable' in error_msg.lower() or 'not found' in error_msg.lower():
                error_msg = "Twitter video unavailable or deleted."
            elif '403' in error_msg or 'forbidden' in error_msg.lower():
                error_msg = "Access denied. Tweet may be restricted."
        elif platform == 'reddit':
            if 'removed' in error_msg.lower() or 'deleted' in error_msg.lower():
                error_msg = "This Reddit post has been removed or deleted."
            elif 'private' in error_msg.lower() or 'nsfw' in error_msg.lower():
                error_msg = "This Reddit post is private or requires login."
            elif '403' in error_msg or 'forbidden' in error_msg.lower():
                error_msg = "Access denied. Reddit post may be restricted."
        elif platform == 'pinterest':
            if 'login' in error_msg.lower() or 'private' in error_msg.lower():
                error_msg = "This Pinterest pin is private or requires login."
            elif 'removed' in error_msg.lower() or 'deleted' in error_msg.lower():
                error_msg = "This Pinterest pin has been removed or deleted."
            elif '403' in error_msg or 'forbidden' in error_msg.lower():
                error_msg = "Access denied. Pinterest pin may be restricted."
        elif platform == 'instagram':
            if 'login' in error_msg.lower() or 'cookie' in error_msg.lower():
                error_msg = "Instagram requires login for this content. Try a public post."
            elif 'private' in error_msg.lower():
                error_msg = "This Instagram content is private."
            elif 'unavailable' in error_msg.lower():
                error_msg = "Instagram content unavailable or deleted."
        elif platform == 'linkedin':
            if 'login' in error_msg.lower() or 'private' in error_msg.lower():
                error_msg = "This LinkedIn content is private or requires login."
            elif 'unavailable' in error_msg.lower() or 'not found' in error_msg.lower():
                error_msg = "LinkedIn video unavailable or deleted."
            elif '403' in error_msg or 'forbidden' in error_msg.lower():
                error_msg = "Access denied. Content may be restricted."
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

def get_production_download_opts():
    """Get production-specific download options to prevent blocking"""
    enable_geo_bypass = os.getenv('ENABLE_GEO_BYPASS', 'True').lower() == 'true'

    production_opts = {
        # Geo bypass to avoid regional restrictions
        'geo_bypass': enable_geo_bypass,
        'geo_bypass_country': 'US',

        # Source address to bind (helps with multiple IPs)
        # 'source_address': '0.0.0.0',  # Uncomment if server has multiple IPs

        # Additional headers to avoid detection
        'nocheckcertificate': True,
        'prefer_insecure': False,

        # Referrer spoofing
        'http_headers': {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Sec-Fetch-Mode': 'navigate',
        }
    }

    return production_opts