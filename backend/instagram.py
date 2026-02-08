import yt_dlp
import time
import re
import logging
import os
import requests
from flask import jsonify
from dotenv import load_dotenv
from utils import get_best_thumbnail, detect_audio_in_format, get_production_download_opts

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)

class InstagramDownloader:
    def __init__(self):
        self.platform = 'instagram'
        # Load Instagram credentials from environment
        self.username = os.getenv('INSTAGRAM_USERNAME', '')
        self.password = os.getenv('INSTAGRAM_PASSWORD', '')
        self.has_credentials = bool(self.username and self.password and 
                                     self.username != 'your_instagram_username' and
                                     self.password != 'your_instagram_password')
        if self.has_credentials:
            logger.info(f"Instagram credentials loaded for user: {self.username}")
        else:
            logger.info("No Instagram credentials configured - using anonymous mode")
    
    def get_robust_instagram_opts(self, base_opts=None, attempt=0):
        """Robust Instagram options for yt-dlp"""
        if base_opts is None:
            base_opts = {}

        # More diverse user agents for better success rate
        user_agents = [
            # Instagram App User Agent (most effective)
            'Instagram 275.0.0.27.98 Android (33/13; 420dpi; 1080x2400; samsung; SM-S918B; dm3q; qcom; en_US; 458229258)',
            # Mobile Safari (iOS)
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
            # Android Chrome
            'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
            # Desktop Chrome
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        ]

        current_ua = user_agents[attempt % len(user_agents)]
        
        instagram_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'socket_timeout': 60,
            'retries': 5,
            'fragment_retries': 5,
            'file_access_retries': 3,
            'extractor_retries': 5,
            'skip_unavailable_fragments': True,
            'ignoreerrors': False,
            'no_color': True,
            'user_agent': current_ua,
            'format_sort': ['res', 'ext:mp4:m4a'],
            'format_sort_force': True,
            'http_chunk_size': 5242880,
            'concurrent_fragment_downloads': 1,
            
            # Enhanced headers for Instagram
            'http_headers': {
                'User-Agent': current_ua,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.instagram.com/',
                'Origin': 'https://www.instagram.com',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Dest': 'document',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'X-IG-App-ID': '936619743392459',
                'X-ASBD-ID': '129477',
                'X-IG-WWW-Claim': '0',
                'X-Requested-With': 'XMLHttpRequest',
            },
            
            # Geo bypass for Instagram
            'geo_bypass': True,
            'geo_bypass_country': 'US',
            
            # Instagram-specific extractor args
            'extractor_args': {
                'instagram': {
                    'direct': ['true'],
                }
            },
        }
        
        # Add credentials if available
        if self.has_credentials:
            instagram_opts['username'] = self.username
            instagram_opts['password'] = self.password
            logger.info(f"Using Instagram credentials for authentication")

        # Merge production options
        production_opts = get_production_download_opts()
        instagram_opts.update(production_opts)
        instagram_opts.update(base_opts)
        return instagram_opts
    
    @staticmethod
    def extract_shortcode(url):
        """Extract shortcode from Instagram URL"""
        patterns = [
            r'instagram\.com/(?:p|reel|reels|tv)/([A-Za-z0-9_-]+)',
            r'instagr\.am/(?:p|reel)/([A-Za-z0-9_-]+)',
        ]
        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        return None
    
    def try_external_api(self, url, shortcode):
        """Try external API services as fallback when yt-dlp fails"""
        logger.info(f"Trying external API for Instagram shortcode: {shortcode}")
        
        # Try multiple free Instagram API services
        apis = [
            # API 1: saveig.app style API
            {
                'url': f'https://api.saveig.app/api/v1/media/{shortcode}',
                'headers': {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'application/json',
                }
            },
            # API 2: igram style
            {
                'url': 'https://api.igram.io/api/convert',
                'method': 'POST',
                'data': {'url': url},
                'headers': {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            },
        ]
        
        for api in apis:
            try:
                if api.get('method') == 'POST':
                    response = requests.post(
                        api['url'], 
                        data=api.get('data', {}),
                        headers=api['headers'],
                        timeout=30
                    )
                else:
                    response = requests.get(api['url'], headers=api['headers'], timeout=30)
                
                if response.status_code == 200:
                    data = response.json()
                    # Parse response based on API format
                    if 'video_url' in data or 'url' in data or 'media' in data:
                        logger.info(f"External API success")
                        return data
            except Exception as e:
                logger.warning(f"External API failed: {str(e)}")
                continue
        
        return None
    
    def try_webpage_scraping(self, url, shortcode):
        """Try to scrape Instagram webpage directly for video URL"""
        logger.info(f"Trying webpage scraping for: {shortcode}")
        
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
            }
            
            # Try the mobile version
            mobile_url = url.replace('www.instagram.com', 'm.instagram.com')
            response = requests.get(mobile_url, headers=headers, timeout=30)
            
            if response.status_code == 200:
                html = response.text
                
                # Try to find video URL in the page
                video_patterns = [
                    r'"video_url"\s*:\s*"([^"]+)"',
                    r'"contentUrl"\s*:\s*"([^"]+)"',
                    r'<meta\s+property="og:video"\s+content="([^"]+)"',
                    r'<meta\s+property="og:video:url"\s+content="([^"]+)"',
                    r'"playable_url"\s*:\s*"([^"]+)"',
                    r'"playable_url_quality_hd"\s*:\s*"([^"]+)"',
                ]
                
                for pattern in video_patterns:
                    match = re.search(pattern, html)
                    if match:
                        video_url = match.group(1).replace('\\u0026', '&').replace('\\/', '/')
                        if video_url and 'cdninstagram' in video_url:
                            logger.info(f"Found video URL via webpage scraping")
                            
                            # Try to get thumbnail
                            thumb_match = re.search(r'<meta\s+property="og:image"\s+content="([^"]+)"', html)
                            thumbnail = thumb_match.group(1) if thumb_match else ''
                            
                            # Try to get title/description
                            title_match = re.search(r'<meta\s+property="og:title"\s+content="([^"]+)"', html)
                            title = title_match.group(1) if title_match else 'Instagram Video'
                            
                            return {
                                'video_url': video_url,
                                'thumbnail': thumbnail,
                                'title': title,
                            }
                
        except Exception as e:
            logger.warning(f"Webpage scraping failed: {str(e)}")
        
        return None
    
    def get_video_info(self, url, return_json=True):
        """Extract Instagram video/reel information using yt-dlp with fallbacks
        
        Args:
            url: Instagram URL
            return_json: If True, return Flask jsonify response. If False, return plain dict.
        """
        max_attempts = 4
        last_error = None
        
        # Validate URL first
        shortcode = self.extract_shortcode(url)
        if not shortcode:
            if return_json:
                return jsonify({'error': 'Invalid Instagram URL. Please provide a valid Instagram post/reel URL.'}), 400
            else:
                raise Exception('Invalid Instagram URL. Please provide a valid Instagram post/reel URL.')
        
        # Try yt-dlp first
        for attempt in range(max_attempts):
            try:
                logger.info(f"Instagram yt-dlp attempt {attempt + 1}/{max_attempts} for shortcode: {shortcode}")
                
                ydl_opts = self.get_robust_instagram_opts({
                    'noplaylist': True,
                    'extract_flat': False,
                }, attempt)
                
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(url, download=False)
                    
                    if not info:
                        raise Exception('Could not extract video information')
                    
                    duration = info.get('duration', 0) or 0
                    logger.info(f"Instagram extraction successful - Duration: {duration}s")
                    
                    # Better thumbnail handling
                    thumbnail_url = get_best_thumbnail(info)
                    
                    # Enhanced title handling
                    title = info.get('title', '') or info.get('fulltitle', '') or info.get('description', '')[:100] if info.get('description') else 'Instagram Video'
                    if not title or title == 'NA':
                        uploader = info.get('uploader', '') or info.get('creator', '') or info.get('uploader_id', '')
                        title = f"{uploader} - Instagram Video" if uploader else "Instagram Video"
                    
                    # Truncate title if too long
                    if len(title) > 100:
                        title = title[:100] + "..."
                    
                    video_info = {
                        'title': title,
                        'duration': duration,
                        'view_count': info.get('view_count', 0) or 0,
                        'uploader': info.get('uploader', '') or info.get('creator', '') or info.get('uploader_id', 'Unknown'),
                        'uploader_id': info.get('uploader_id', ''),
                        'thumbnail': thumbnail_url,
                        'description': (info.get('description', '')[:200] + '...') if info.get('description', '') else '',
                        'upload_date': info.get('upload_date', ''),
                        'like_count': info.get('like_count', 0) or 0,
                        'comment_count': info.get('comment_count', 0) or 0,
                        'platform': 'instagram',
                        'formats': []
                    }
                    
                    # Process formats
                    formats = info.get('formats', [])
                    if not formats:
                        # Try to get URL directly for single format
                        direct_url = info.get('url')
                        if direct_url:
                            video_info['formats'] = {
                                'video_formats': [{
                                    'quality': 'Best Available',
                                    'type': 'video',
                                    'format_id': 'best',
                                    'ext': 'mp4',
                                    'filesize': 0,
                                    'direct_url': direct_url,
                                    'width': info.get('width', 0),
                                    'height': info.get('height', 0),
                                    'has_audio': True,
                                    'platform': 'instagram',
                                    'watermark_free': True,
                                    'duration': duration,
                                    'resolution': 'HD'
                                }],
                                'audio_formats': []
                            }
                            logger.info("Instagram success - Single format extracted")
                            if return_json:
                                return jsonify(video_info)
                            return video_info
                        else:
                            raise Exception('No formats available')
                    
                    video_formats = []
                    audio_formats = []
                    
                    for fmt in formats:
                        if not fmt.get('format_id'):
                            continue
                            
                        vcodec = fmt.get('vcodec', 'none')
                        acodec = fmt.get('acodec', 'none')
                        height = fmt.get('height') or 0
                        ext = fmt.get('ext', '')
                        
                        if ext not in ['mp4', 'm4a', 'webm', 'mp3']:
                            continue
                        
                        if vcodec != 'none' and height > 0:
                            video_formats.append(fmt)
                        elif acodec != 'none':
                            audio_formats.append(fmt)
                    
                    # Process video formats
                    processed_video = []
                    for fmt in sorted(video_formats, key=lambda x: x.get('height') or 0, reverse=True):
                        height = fmt.get('height') or 0
                        if height < 144:
                            continue
                            
                        quality = f"{height}p"
                        ext = fmt.get('ext', 'mp4')
                        has_audio = detect_audio_in_format(fmt)
                        
                        format_data = {
                            'quality': quality,
                            'type': 'video',
                            'format_id': fmt['format_id'],
                            'ext': ext,
                            'filesize': fmt.get('filesize', 0) or 0,
                            'fps': fmt.get('fps', 30),
                            'width': fmt.get('width', 0),
                            'height': height,
                            'has_audio': has_audio,
                            'platform': 'instagram',
                            'watermark_free': True,
                            'duration': duration,
                            'audio_description': 'With Audio' if has_audio else 'Video Only',
                            'direct_url': fmt.get('url', '')  # Direct download URL from yt-dlp
                        }
                        processed_video.append(format_data)
                    
                    # If no video formats found, create a default one
                    if not processed_video:
                        direct_url = info.get('url') or (formats[0].get('url') if formats else None)
                        if direct_url or formats:
                            best_fmt = formats[0] if formats else {}
                            processed_video.append({
                                'quality': 'Best Available',
                                'type': 'video',
                                'format_id': best_fmt.get('format_id', 'best'),
                                'ext': 'mp4',
                                'filesize': best_fmt.get('filesize', 0) or 0,
                                'direct_url': direct_url or best_fmt.get('url', ''),
                                'width': info.get('width', 0),
                                'height': info.get('height', 0),
                                'has_audio': True,
                                'platform': 'instagram',
                                'watermark_free': True,
                                'duration': duration,
                                'resolution': 'HD'
                            })
                    
                    # Process audio formats
                    processed_audio = []
                    for fmt in sorted(audio_formats, key=lambda x: x.get('abr') or 0, reverse=True):
                        abr = fmt.get('abr') or 128
                        quality_level = f"{int(abr)}kbps"
                        
                        format_data = {
                            'quality': quality_level,
                            'type': 'audio',
                            'format_id': fmt['format_id'],
                            'ext': 'mp3',
                            'filesize': fmt.get('filesize', 0) or 0,
                            'abr': abr,
                            'platform': 'instagram',
                            'description': f"Audio ({quality_level})"
                        }
                        processed_audio.append(format_data)
                    
                    video_info['formats'] = {
                        'video_formats': processed_video[:8],
                        'audio_formats': processed_audio[:6]
                    }
                    
                    logger.info(f"Instagram success - Video: {len(processed_video)}, Audio: {len(processed_audio)}")
                    if return_json:
                        return jsonify(video_info)
                    return video_info
                    
            except yt_dlp.DownloadError as e:
                last_error = e
                error_msg = str(e).lower()
                logger.warning(f"Instagram yt-dlp attempt {attempt + 1} failed: {error_msg}")
                
                # Don't retry for certain errors
                if 'private' in error_msg and 'login' not in error_msg:
                    break
                
                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue
                    
            except Exception as e:
                last_error = e
                logger.warning(f"Instagram attempt {attempt + 1} exception: {str(e)}")
                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue
        
        # yt-dlp failed, try fallback methods
        logger.info("yt-dlp failed, trying fallback methods...")
        
        # Try webpage scraping
        scraped_data = self.try_webpage_scraping(url, shortcode)
        if scraped_data and scraped_data.get('video_url'):
            video_info = {
                'title': scraped_data.get('title', 'Instagram Video'),
                'duration': 0,
                'view_count': 0,
                'uploader': 'Instagram User',
                'uploader_id': '',
                'thumbnail': scraped_data.get('thumbnail', ''),
                'description': '',
                'upload_date': '',
                'like_count': 0,
                'comment_count': 0,
                'platform': 'instagram',
                'formats': {
                    'video_formats': [{
                        'quality': 'Best Available',
                        'type': 'video',
                        'format_id': 'scraped_best',
                        'ext': 'mp4',
                        'filesize': 0,
                        'direct_url': scraped_data['video_url'],
                        'width': 0,
                        'height': 0,
                        'has_audio': True,
                        'platform': 'instagram',
                        'watermark_free': True,
                        'duration': 0,
                        'resolution': 'HD'
                    }],
                    'audio_formats': []
                }
            }
            logger.info("Instagram success via webpage scraping")
            if return_json:
                return jsonify(video_info)
            return video_info
        
        # Handle final error
        if last_error:
            error_msg = str(last_error).lower()
            logger.error(f"Instagram final error: {error_msg}")
            
            if 'login' in error_msg or 'authentication' in error_msg:
                err = 'Instagram requires login for this content. This video may be from a private account or age-restricted. Please try a different public post.'
            elif 'private' in error_msg:
                err = 'This Instagram video is private. Only public videos can be downloaded.'
            elif 'not found' in error_msg or '404' in error_msg:
                err = 'Instagram video not found. It may have been deleted.'
            elif 'rate' in error_msg or 'limit' in error_msg:
                err = 'Instagram rate limit reached. Please try again in a few minutes.'
            else:
                err = 'Instagram video could not be processed. Please check the URL and try again.'
            
            if return_json:
                return jsonify({'error': err}), 400
            raise Exception(err)
        
        if return_json:
            return jsonify({'error': 'Failed to process Instagram video. Please try a different post.'}), 400
        raise Exception('Failed to process Instagram video. Please try a different post.')

    @staticmethod
    def download_video(url, format_id='best', output_path='downloads'):
        """
        Download Instagram video - now uses yt-dlp
        """
        try:
            import os
            
            # Create output directory
            os.makedirs(output_path, exist_ok=True)
            
            ydl_opts = {
                'format': format_id if format_id != 'best' else 'best',
                'outtmpl': os.path.join(output_path, '%(title)s.%(ext)s'),
                'quiet': True,
                'no_warnings': True,
                'geo_bypass': True,
            }
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                filename = ydl.prepare_filename(info)
                logger.info(f"Successfully downloaded: {filename}")
                return filename
                
        except Exception as e:
            logger.error(f"Download failed: {str(e)}")
            raise Exception(f"Download failed: {str(e)}")
