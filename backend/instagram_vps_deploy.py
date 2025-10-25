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

            logger.info(f"[ALT] Trying alternative extraction for shortcode: {shortcode}")

            # Method 1: Try Instagram embed endpoint
            embed_url = f"https://www.instagram.com/p/{shortcode}/embed/"
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://www.instagram.com/',
            }

            logger.info(f"[ALT] Trying embed URL: {embed_url}")
            response = requests.get(embed_url, headers=headers, timeout=15)
            if response.status_code == 200:
                # Try to extract video URL from embed page
                video_match = re.search(r'"video_url":"([^"]+)"', response.text)
                if video_match:
                    video_url = video_match.group(1).replace('\\u0026', '&')
                    logger.info(f"[ALT] ✓ Found video URL via embed!")

                    # Extract basic info from embed page
                    title_match = re.search(r'<title>([^<]+)</title>', response.text)
                    title = title_match.group(1) if title_match else "Instagram Video"

                    return {
                        'method': 'embed',
                        'video_url': video_url,
                        'title': title,
                        'shortcode': shortcode
                    }

            # Method 2: Try different embed format (reel)
            embed_url2 = f"https://www.instagram.com/reel/{shortcode}/embed/"
            logger.info(f"[ALT] Trying reel embed URL: {embed_url2}")
            response2 = requests.get(embed_url2, headers=headers, timeout=15)
            if response2.status_code == 200:
                video_match = re.search(r'"video_url":"([^"]+)"', response2.text)
                if video_match:
                    video_url = video_match.group(1).replace('\\u0026', '&')
                    logger.info(f"[ALT] ✓ Found video URL via reel embed!")
                    return {
                        'method': 'embed',
                        'video_url': video_url,
                        'title': "Instagram Reel",
                        'shortcode': shortcode
                    }

            logger.warning("[ALT] No video URL found in embed pages")
            return None

        except Exception as e:
            logger.error(f"[ALT] Alternative extraction failed: {str(e)}")
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
                'guest': True,
            }
        }

        # On retry attempts, try different extraction strategies
        if attempt > 0:
            opts['extractor_args']['instagram']['rhx_gis'] = None

        if attempt > 1:
            opts['extractor_args']['instagram'].pop('api_hostname', None)

        # Geo-bypass and network options
        opts['geo_bypass'] = True
        opts['geo_bypass_country'] = 'US'

        # Socket timeout
        opts['socket_timeout'] = 30

        # Source address - rotate on retries to avoid IP blocks
        if attempt > 2:
            opts['source_address'] = '0.0.0.0'

        # Format selection for Instagram
        opts['format'] = 'best[ext=mp4]/best'

        # Disable cookies - using guest mode
        opts['cookiesfrombrowser'] = None

        # Additional retry strategy based on attempt
        if attempt > 0:
            opts['sleep_interval'] = 2
            opts['max_sleep_interval'] = 5

        if attempt > 1:
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
        max_attempts = 3  # Reduced to fail faster and try alternative method
        last_error = None

        logger.info(f"[INSTAGRAM] Starting extraction for: {url}")

        for attempt in range(max_attempts):
            try:
                if attempt > 0:
                    wait_time = 2 ** attempt + random.uniform(0, 1)
                    time.sleep(min(wait_time, 5))

                logger.info(f"[INSTAGRAM] Attempt {attempt + 1}/{max_attempts} using yt-dlp")

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

                    logger.info("[INSTAGRAM] yt-dlp extraction successful!")

                    # Extract metadata
                    title = info.get('title', 'Instagram Reel')
                    if title == 'NA' or not title or title.strip() == '':
                        title = f"Instagram Reel by {info.get('uploader', 'Unknown')}"

                    duration = info.get('duration', 0)
                    view_count = info.get('view_count', 0)
                    like_count = info.get('like_count', 0)
                    comment_count = info.get('comment_count', 0)
                    uploader = info.get('uploader', info.get('creator', 'Unknown'))
                    description = info.get('description', '')
                    upload_date = info.get('upload_date', '')

                    # Get thumbnail
                    thumbnail = InstagramDownloader.get_best_thumbnail(info.get('thumbnails', []))
                    if not thumbnail:
                        thumbnail = info.get('thumbnail')
                    if not thumbnail:
                        thumbnail = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWQiIGN4PSIzMCUiIGN5PSIzMCUiIHI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM1MTUyRkY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNENjI5NzY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRjU3RDZFO3N0b3Atb3BhY2l0eToxIiAvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2dyYWQpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iNjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj7wn5O2PC90ZXh0Pjwvc3ZnPg=='

                    # Process formats
                    formats = info.get('formats', [])
                    video_formats = []
                    audio_formats = []

                    # Process video formats
                    video_format_dict = {}
                    for f in formats:
                        if f.get('vcodec') == 'none':
                            continue

                        height = f.get('height', 0)
                        width = f.get('width', 0)

                        if height == 0 and width == 0:
                            continue

                        quality = f"{height}p" if height else f"{width}w"
                        format_id = f.get('format_id', '')
                        has_audio = f.get('acodec') != 'none'
                        ext = f.get('ext', 'mp4')
                        filesize = f.get('filesize') or f.get('filesize_approx', 0)
                        fps = f.get('fps', 30)

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

                    sorted_video_formats = sorted(
                        video_format_dict.values(),
                        key=lambda x: x.get('height', 0),
                        reverse=True
                    )

                    for fmt in sorted_video_formats:
                        fmt.pop('_priority', None)
                        video_formats.append(fmt)

                    video_formats = video_formats[:8]

                    # Process audio formats
                    audio_format_dict = {}
                    for f in formats:
                        acodec = f.get('acodec')
                        if acodec and acodec != 'none':
                            abr = f.get('abr', 0)
                            quality = f"{int(abr)}kbps" if abr else "Audio"
                            format_id = f.get('format_id', '')
                            ext = f.get('ext', 'm4a')
                            if ext not in ['m4a', 'mp3', 'aac', 'opus']:
                                ext = 'm4a'
                            filesize = f.get('filesize') or f.get('filesize_approx', 0)

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

                    sorted_audio_formats = sorted(
                        audio_format_dict.values(),
                        key=lambda x: x.get('abr', 0),
                        reverse=True
                    )

                    audio_formats = sorted_audio_formats[:6]

                    if not video_formats and not audio_formats:
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
                logger.warning(f"[INSTAGRAM] Attempt {attempt + 1} failed: {str(e)[:100]}")

                if 'private' in error_msg or 'unavailable' in error_msg:
                    if attempt == max_attempts - 1:
                        break  # Try alternative method
                    continue

                if 'login' in error_msg or 'age' in error_msg or 'requires authentication' in error_msg or 'not found' in error_msg:
                    if attempt == max_attempts - 1:
                        break  # Try alternative method
                    continue

                if 'rate limit' in error_msg or 'too many requests' in error_msg or '429' in error_msg:
                    if attempt == max_attempts - 1:
                        break
                    time.sleep(10)
                    continue

                if attempt == max_attempts - 1:
                    break

                continue

        # All yt-dlp attempts failed - try alternative extraction
        logger.warning("[INSTAGRAM] All yt-dlp attempts failed, trying alternative extraction...")
        alt_result = InstagramDownloader.try_alternative_extraction(url)

        if alt_result and alt_result.get('video_url'):
            logger.info("[INSTAGRAM] ✓ Alternative extraction succeeded!")
            return {
                'title': alt_result.get('title', 'Instagram Video'),
                'duration': 0,
                'view_count': 0,
                'like_count': 0,
                'comment_count': 0,
                'uploader': 'Instagram User',
                'thumbnail': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWQiIGN4PSIzMCUiIGN5PSIzMCUiIHI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM1MTUyRkY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNENjI5NzY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRjU3RDZFO3N0b3Atb3BhY2l0eToxIiAvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2dyYWQpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iNjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj7wn5O2PC90ZXh0Pjwvc3ZnPg==',
                'description': '',
                'upload_date': '',
                'formats': {
                    'video_formats': [{
                        'quality': 'Best',
                        'type': 'video',
                        'format_id': 'direct',
                        'ext': 'mp4',
                        'filesize': 0,
                        'width': 1080,
                        'height': 1920,
                        'fps': 30,
                        'has_audio': True,
                        'watermark_free': True,
                        'duration': 0,
                        'direct_url': alt_result['video_url']
                    }],
                    'audio_formats': []
                }
            }

        # All methods failed
        logger.error(f"[INSTAGRAM] ✗ All extraction methods failed: {last_error}")
        raise Exception(f"Instagram download failed: This content requires login or the post may be deleted/restricted. Please try a different public Instagram Reel or Post.")
