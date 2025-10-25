import yt_dlp
import time
import random
import logging
import os
import requests
import json
import re

logger = logging.getLogger(__name__)

class InstagramDownloader:
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

    @staticmethod
    def try_alternative_extraction(url):
        """
        Alternative Instagram extraction using direct API/embed methods
        This is used as fallback when yt-dlp fails
        """
        try:
            shortcode = InstagramDownloader.extract_shortcode(url)
            if not shortcode:
                raise Exception("Could not extract Instagram shortcode from URL")

            logger.info(f"Trying alternative extraction for shortcode: {shortcode}")

            # Method 1: Try Instagram embed endpoint
            embed_url = f"https://www.instagram.com/p/{shortcode}/embed/"
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://www.instagram.com/',
            }

            response = requests.get(embed_url, headers=headers, timeout=15)
            if response.status_code == 200:
                # Try to extract video URL from embed page
                video_match = re.search(r'"video_url":"([^"]+)"', response.text)
                if video_match:
                    video_url = video_match.group(1).replace('\\u0026', '&')
                    logger.info(f"Found video URL via embed: {video_url[:100]}...")

                    # Extract basic info from embed page
                    title_match = re.search(r'<title>([^<]+)</title>', response.text)
                    title = title_match.group(1) if title_match else "Instagram Video"

                    return {
                        'method': 'embed',
                        'video_url': video_url,
                        'title': title,
                        'shortcode': shortcode
                    }

            # Method 2: Try different embed format
            embed_url2 = f"https://www.instagram.com/reel/{shortcode}/embed/"
            response2 = requests.get(embed_url2, headers=headers, timeout=15)
            if response2.status_code == 200:
                video_match = re.search(r'"video_url":"([^"]+)"', response2.text)
                if video_match:
                    video_url = video_match.group(1).replace('\\u0026', '&')
                    logger.info(f"Found video URL via reel embed: {video_url[:100]}...")
                    return {
                        'method': 'embed',
                        'video_url': video_url,
                        'title': "Instagram Reel",
                        'shortcode': shortcode
                    }

            return None

        except Exception as e:
            logger.error(f"Alternative extraction failed: {str(e)}")
            return None

    @staticmethod
    def get_robust_instagram_opts(base_opts, attempt=0):
        """
        Get robust yt-dlp options for Instagram with fallback strategies
        """
        user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
        ]

        opts = base_opts.copy()
        opts['user_agent'] = user_agents[attempt % len(user_agents)]

        # Instagram-specific configurations
        opts['http_headers'] = {
            'User-Agent': opts['user_agent'],
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Cache-Control': 'max-age=0',
        }

        # Enhanced retry and extraction options
        opts['retries'] = 8
        opts['fragment_retries'] = 8
        opts['skip_unavailable_fragments'] = True
        opts['ignoreerrors'] = False
        opts['no_warnings'] = False

        # Instagram extraction options with multiple fallbacks
        opts['extractor_args'] = {
            'instagram': {
                'api_hostname': 'i.instagram.com' if attempt == 0 else 'www.instagram.com',
                'guest': True,  # Try as guest first
            }
        }

        # On retry attempts, try different extraction strategies
        if attempt > 0:
            opts['extractor_args']['instagram']['rhx_gis'] = None

        if attempt > 1:
            # Try without API hostname restriction
            opts['extractor_args']['instagram'].pop('api_hostname', None)

        # Geo-bypass and network options
        opts['geo_bypass'] = True
        opts['geo_bypass_country'] = 'US'

        # Socket timeout
        opts['socket_timeout'] = 30

        # Source address - rotate on retries to avoid IP blocks
        if attempt > 2:
            opts['source_address'] = '0.0.0.0'  # Let system choose best interface

        # Format selection for Instagram
        opts['format'] = 'best[ext=mp4]/best'

        # Try to use cookies from file if available (for better access to Instagram)
        cookies_file = os.path.join(os.path.dirname(__file__), 'cookies.txt')
        if os.path.exists(cookies_file):
            opts['cookiefile'] = cookies_file
            logger.info(f"Using cookies file: {cookies_file}")
        else:
            opts['cookiesfrombrowser'] = None

        # Additional retry strategy based on attempt
        if attempt > 0:
            opts['sleep_interval'] = 2
            opts['max_sleep_interval'] = 5

        if attempt > 1:
            # Try alternative extraction methods
            opts['extractor_retries'] = 5
            opts['file_access_retries'] = 5

        return opts

    @staticmethod
    def get_best_thumbnail(thumbnails):
        """
        Get the best quality thumbnail from Instagram
        """
        if not thumbnails:
            return None

        # Instagram usually provides thumbnails in different sizes
        # Sort by preference: width, then height
        sorted_thumbs = sorted(
            [t for t in thumbnails if t.get('url')],
            key=lambda x: (x.get('width', 0) * x.get('height', 0)),
            reverse=True
        )

        return sorted_thumbs[0]['url'] if sorted_thumbs else None

    @staticmethod
    def get_video_info(url):
        """
        Get Instagram Reels/Video information with robust retry mechanism
        """
        max_attempts = 6  # Increased attempts for better success rate
        last_error = None

        for attempt in range(max_attempts):
            try:
                # Wait before retry (except first attempt)
                if attempt > 0:
                    wait_time = 2 ** attempt + random.uniform(0, 1)
                    time.sleep(min(wait_time, 8))

                ydl_opts = InstagramDownloader.get_robust_instagram_opts({
                    'quiet': True,
                    'no_warnings': True,
                    'extract_flat': False,
                    'skip_download': True,
                }, attempt)

                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(url, download=False)

                    if not info:
                        raise Exception("Failed to extract video information")

                    # Extract comprehensive metadata
                    title = info.get('title', 'Instagram Reel')

                    # Handle title fallback
                    if title == 'NA' or not title or title.strip() == '':
                        title = f"Instagram Reel by {info.get('uploader', 'Unknown')}"

                    duration = info.get('duration', 0)
                    view_count = info.get('view_count', 0)
                    like_count = info.get('like_count', 0)
                    comment_count = info.get('comment_count', 0)
                    uploader = info.get('uploader', info.get('creator', 'Unknown'))
                    description = info.get('description', '')
                    upload_date = info.get('upload_date', '')

                    # Get best thumbnail - try multiple sources
                    thumbnail = None

                    # Debug: Log available thumbnail data
                    logger.info(f"Instagram thumbnails available: {len(info.get('thumbnails', []))}")
                    logger.info(f"Instagram direct thumbnail: {info.get('thumbnail')}")

                    # First, try from thumbnails array
                    thumbnail = InstagramDownloader.get_best_thumbnail(info.get('thumbnails', []))
                    if thumbnail:
                        logger.info(f"Using thumbnail from thumbnails array: {thumbnail[:100]}")

                    # If no thumbnail, try from format data
                    if not thumbnail and formats:
                        for fmt in formats:
                            if fmt.get('thumbnail'):
                                thumbnail = fmt['thumbnail']
                                logger.info(f"Using thumbnail from format data: {thumbnail[:100]}")
                                break

                    # Try from direct thumbnail field
                    if not thumbnail:
                        thumbnail = info.get('thumbnail')
                        if thumbnail:
                            logger.info(f"Using direct thumbnail field: {thumbnail[:100]}")

                    # If still no thumbnail, try to construct from media URL
                    if not thumbnail:
                        # Instagram video URLs often have a pattern we can use
                        video_url = info.get('url') or (formats[0].get('url') if formats else None)
                        if video_url and 'cdninstagram' in video_url:
                            # Try to get thumbnail from video URL pattern
                            thumbnail = video_url
                            logger.info(f"Using video URL as thumbnail: {thumbnail[:100]}")

                    # Last resort: use data URI for Instagram gradient placeholder
                    if not thumbnail:
                        # Use a data URI with Instagram's gradient colors (purple/pink/orange)
                        thumbnail = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iZ3JhZCIgY3g9IjMwJSIgY3k9IjMwJSIgcj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM1MTUyRkY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iNTAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRDYyOTc2O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGNTdENkU7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L3JhZGlhbEdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNncmFkKSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjYwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCI+8J+TtjwvdGV4dD4KPC9zdmc+'
                        logger.info("Using Instagram gradient placeholder thumbnail")

                    # Process formats
                    formats = info.get('formats', [])

                    if not formats:
                        raise Exception("No formats available for this video")

                    video_formats = []
                    audio_formats = []

                    # Process video formats
                    video_format_dict = {}
                    for f in formats:
                        # Skip formats without video stream
                        if f.get('vcodec') == 'none':
                            continue

                        height = f.get('height', 0)
                        width = f.get('width', 0)

                        if height == 0 and width == 0:
                            continue

                        # Create quality label
                        quality = f"{height}p" if height else f"{width}w"
                        format_id = f.get('format_id', '')

                        # Check if format has audio
                        has_audio = f.get('acodec') != 'none'

                        # Get file extension
                        ext = f.get('ext', 'mp4')

                        # Get file size
                        filesize = f.get('filesize') or f.get('filesize_approx', 0)

                        # Get fps
                        fps = f.get('fps', 30)

                        # Prefer formats with audio and higher quality
                        priority = (height, has_audio, fps)

                        if quality not in video_format_dict or priority > video_format_dict[quality].get('_priority', (0, False, 0)):
                            video_format_dict[quality] = {
                                'quality': quality,
                                'type': 'video',
                                'format_id': format_id,
                                'ext': ext,
                                'filesize': filesize,
                                'width': width,
                                'height': height,
                                'fps': fps,
                                'has_audio': has_audio,
                                'watermark_free': True,
                                'duration': duration,
                                '_priority': priority
                            }

                    # Sort video formats by quality (height)
                    sorted_video_formats = sorted(
                        video_format_dict.values(),
                        key=lambda x: x.get('height', 0),
                        reverse=True
                    )

                    # Remove priority field before returning
                    for fmt in sorted_video_formats:
                        fmt.pop('_priority', None)
                        video_formats.append(fmt)

                    # Limit to top 8 video formats
                    video_formats = video_formats[:8]

                    # Process audio formats
                    audio_format_dict = {}
                    for f in formats:
                        # Get formats with audio only or extract audio from video formats
                        acodec = f.get('acodec')
                        vcodec = f.get('vcodec')

                        if acodec and acodec != 'none':
                            abr = f.get('abr', 0)

                            # Create quality label for audio
                            if abr:
                                quality = f"{int(abr)}kbps"
                            else:
                                quality = "Audio"

                            format_id = f.get('format_id', '')
                            ext = f.get('ext', 'm4a')

                            # Prefer m4a and mp3
                            if ext not in ['m4a', 'mp3', 'aac', 'opus']:
                                ext = 'm4a'

                            filesize = f.get('filesize') or f.get('filesize_approx', 0)

                            # Prefer higher bitrate
                            if quality not in audio_format_dict or abr > audio_format_dict[quality].get('abr', 0):
                                audio_format_dict[quality] = {
                                    'quality': quality,
                                    'type': 'audio',
                                    'format_id': format_id,
                                    'ext': ext,
                                    'filesize': filesize,
                                    'abr': abr,
                                    'duration': duration,
                                }

                    # Sort audio formats by bitrate
                    sorted_audio_formats = sorted(
                        audio_format_dict.values(),
                        key=lambda x: x.get('abr', 0),
                        reverse=True
                    )

                    audio_formats = sorted_audio_formats[:6]

                    # Ensure we have at least some formats
                    if not video_formats and not audio_formats:
                        # Fallback: create a basic format from best available
                        best_format = info.get('format_id', 'best')
                        video_formats.append({
                            'quality': 'Best',
                            'type': 'video',
                            'format_id': best_format,
                            'ext': info.get('ext', 'mp4'),
                            'filesize': info.get('filesize', 0),
                            'width': info.get('width', 0),
                            'height': info.get('height', 0),
                            'fps': info.get('fps', 30),
                            'has_audio': True,
                            'watermark_free': True,
                            'duration': duration,
                        })

                    return {
                        'title': title,
                        'duration': duration,
                        'view_count': view_count,
                        'like_count': like_count,
                        'comment_count': comment_count,
                        'uploader': uploader,
                        'thumbnail': thumbnail,
                        'description': description,
                        'upload_date': upload_date,
                        'formats': {
                            'video_formats': video_formats,
                            'audio_formats': audio_formats
                        }
                    }

            except Exception as e:
                last_error = str(e)
                error_msg = str(e).lower()

                # Check for specific error types
                if 'private' in error_msg or 'unavailable' in error_msg:
                    raise Exception("This Instagram content is private or unavailable. Please try a public post.")

                if 'login' in error_msg or 'age' in error_msg or 'requires authentication' in error_msg or 'not found' in error_msg:
                    raise Exception("Instagram download failed: This content requires login or the post may be deleted/restricted. Please try a different public Instagram Reel or Post.")

                # Check for rate limiting
                if 'rate limit' in error_msg or 'too many requests' in error_msg or '429' in error_msg:
                    raise Exception("Instagram has temporarily rate-limited our requests. Please wait a few minutes and try again.")

                if attempt == max_attempts - 1:
                    # Last attempt failed
                    raise Exception(f"Failed to fetch Instagram video information after {max_attempts} attempts: {last_error}")

                # Continue to next attempt
                continue

        # If we get here, all yt-dlp attempts failed - try alternative extraction
        logger.warning(f"All yt-dlp attempts failed, trying alternative extraction...")
        alt_result = InstagramDownloader.try_alternative_extraction(url)

        if alt_result and alt_result.get('video_url'):
            logger.info("Alternative extraction succeeded!")
            # Convert alternative result to standard format
            return {
                'title': alt_result.get('title', 'Instagram Video'),
                'duration': 0,  # Duration not available from embed
                'view_count': 0,
                'like_count': 0,
                'comment_count': 0,
                'uploader': 'Instagram User',
                'thumbnail': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iZ3JhZCIgY3g9IjMwJSIgY3k9IjMwJSIgcj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM1MTUyRkY7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iNTAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRDYyOTc2O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGNTdENkU7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L3JhZGlhbEdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNncmFkKSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjYwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCI+8J+TtjwvdGV4dD4KPC9zdmc+',
                'description': '',
                'upload_date': '',
                'formats': {
                    'video_formats': [{
                        'quality': 'Best',
                        'type': 'video',
                        'format_id': 'direct',
                        'ext': 'mp4',
                        'filesize': 0,
                        'width': 0,
                        'height': 0,
                        'fps': 30,
                        'has_audio': True,
                        'watermark_free': True,
                        'duration': 0,
                        'direct_url': alt_result['video_url']  # Direct download URL
                    }],
                    'audio_formats': []
                }
            }

        # All methods failed
        raise Exception(f"Failed to fetch Instagram video information: {last_error}")
