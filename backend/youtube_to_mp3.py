"""
YouTube to MP3 Downloader - ADVANCED VERSION
Dedicated module for downloading YouTube videos and converting to MP3 audio
NO COOKIES REQUIRED - Uses advanced bot bypass with throttling & rotation
"""

import yt_dlp
import os
import tempfile
import logging
import time
import random
from flask import jsonify
from urllib.parse import urlparse, parse_qs
import re

logger = logging.getLogger(__name__)

# Advanced User Agent rotation for live servers
USER_AGENTS = [
    'com.google.ios.youtube/19.29.1 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X;)',
    'com.google.ios.youtube/19.28.3 (iPhone15,3; U; CPU iOS 17_4_1 like Mac OS X;)',
    'com.google.ios.youtube/19.27.6 (iPhone14,5; U; CPU iOS 17_3_2 like Mac OS X;)',
    'com.google.android.youtube/19.29.37 (Linux; U; Android 14; en_US)',
    'com.google.android.youtube/19.28.35 (Linux; U; Android 13; en_US)',
    'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Mobile Safari/537.36',
]


class YouTubeToMP3Downloader:
    """YouTube to MP3 Converter with bot bypass (NO COOKIES)"""

    def __init__(self):
        self.platform = 'youtube'
        self.supported_bitrates = [128, 192, 256, 320]
        self.last_request_time = 0
        self.min_request_delay = 2  # Minimum 2 seconds between requests
        logger.info("YouTubeToMP3Downloader initialized successfully (ADVANCED MODE)")

    def validate_youtube_url(self, url):
        """Validate if URL is a YouTube URL"""
        try:
            youtube_patterns = [
                r'^(https?://)?(www\.)?(youtube\.com/watch\?v=|youtu\.be/)[\w-]+',
                r'^(https?://)?(www\.)?youtube\.com/shorts/[\w-]+',
                r'^(https?://)?(www\.)?youtube\.com/embed/[\w-]+',
                r'^(https?://)?(m\.)?youtube\.com/watch\?v=[\w-]+',
            ]

            url_lower = url.lower()
            for pattern in youtube_patterns:
                if re.search(pattern, url_lower):
                    return True

            # Also check for youtu.be short URLs
            if 'youtu.be' in url_lower or 'youtube.com' in url_lower:
                return True

            return False

        except Exception as e:
            logger.error(f"URL validation error: {e}")
            return False

    def extract_video_id(self, url):
        """Extract video ID from YouTube URL"""
        try:
            # For youtu.be URLs
            if 'youtu.be' in url:
                return url.split('youtu.be/')[-1].split('?')[0].split('&')[0]

            # For youtube.com/watch URLs
            if 'youtube.com/watch' in url:
                parsed = urlparse(url)
                params = parse_qs(parsed.query)
                if 'v' in params:
                    return params['v'][0]

            # For youtube.com/shorts URLs
            if 'youtube.com/shorts/' in url:
                return url.split('/shorts/')[-1].split('?')[0].split('&')[0]

            # For youtube.com/embed URLs
            if 'youtube.com/embed/' in url:
                return url.split('/embed/')[-1].split('?')[0].split('&')[0]

            return None

        except Exception as e:
            logger.error(f"Video ID extraction error: {e}")
            return None

    def _throttle_request(self):
        """Add random delay between requests to avoid rate limiting"""
        current_time = time.time()
        time_since_last_request = current_time - self.last_request_time

        if time_since_last_request < self.min_request_delay:
            sleep_time = self.min_request_delay - time_since_last_request
            # Add random jitter (0.5 to 1.5 seconds)
            sleep_time += random.uniform(0.5, 1.5)
            logger.info(f"Throttling request: sleeping for {sleep_time:.2f}s")
            time.sleep(sleep_time)

        self.last_request_time = time.time()

    def _get_random_user_agent(self):
        """Get random user agent from pool"""
        return random.choice(USER_AGENTS)

    def get_yt_dlp_opts(self, extract_info_only=True):
        """
        ULTIMATE BYPASS with COOKIES from browser - Solves ALL YouTube blocking
        Automatically extracts cookies from Chrome/Firefox/Edge browsers
        """
        # Throttle requests
        self._throttle_request()

        # Get random user agent
        user_agent = self._get_random_user_agent()
        logger.info(f"Using COOKIES bypass with UA: {user_agent[:50]}...")

        opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'socket_timeout': 120,
            'retries': 20,
            'fragment_retries': 20,
            'file_access_retries': 15,
            'extractor_retries': 15,
            'skip_unavailable_fragments': True,
            'ignoreerrors': False,
            'no_color': True,

            # NO COOKIES - Safer for production servers
            # Using android_testsuite which is the most powerful client without cookies
            'extractor_args': {
                'youtube': {
                    'player_client': ['android_testsuite', 'android_embedded', 'android', 'mweb'],
                    'skip': ['webpage', 'configs', 'dash', 'hls'],
                    'player_skip': ['js', 'configs', 'webpage'],
                }
            },

            # Force embedded mode
            'format': 'bestaudio/best',

            # Network options - most permissive
            'nocheckcertificate': True,
            'geo_bypass': True,
            'source_address': '0.0.0.0',
            'force_generic_extractor': False,

            # Aggressive sleep to avoid rate limits
            'sleep_interval': 2,
            'max_sleep_interval': 5,
            'sleep_interval_requests': 2,
            'sleep_interval_subtitles': 2,

            # Chrome browser headers (most realistic with cookies)
            'http_headers': {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.youtube.com/',
                'Origin': 'https://www.youtube.com',
            },
        }

        # Download-specific options
        if not extract_info_only:
            opts.update({
                'prefer_ffmpeg': True,
                'keepvideo': False,
                'concurrent_fragment_downloads': 1,  # Single thread to avoid detection
                'http_chunk_size': 10485760,
                'throttledratelimit': None,
            })

        return opts

    def get_youtube_info(self, url):
        """
        Get YouTube video information and available audio qualities
        Returns info compatible with frontend expectations
        """
        try:
            # Validate YouTube URL
            if not self.validate_youtube_url(url):
                return jsonify({
                    'error': 'Invalid YouTube URL. Please provide a valid YouTube video, short, or embed link.'
                }), 400

            logger.info(f"Processing YouTube URL: {url}")

            # Extract video info using yt-dlp with bot bypass
            ydl_opts = self.get_yt_dlp_opts(extract_info_only=True)

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)

                if not info:
                    raise Exception('Could not extract video information from YouTube')

                # Extract relevant information
                title = info.get('title', '') or info.get('fulltitle', '') or 'YouTube Video'
                duration = info.get('duration', 0)
                uploader = info.get('uploader', '') or info.get('channel', '') or 'Unknown'
                thumbnail = info.get('thumbnail', '')
                view_count = info.get('view_count', 0)
                video_id = self.extract_video_id(url) or info.get('id', '')

                logger.info(f"YouTube video info extracted: {title} ({duration}s)")

                # Calculate file sizes for different bitrates based on duration
                audio_formats = []

                if duration > 0:
                    # 320kbps - High Quality
                    filesize_320 = int(duration * 320 * 1000 / 8)
                    audio_formats.append({
                        'quality': '320kbps High Quality',
                        'type': 'audio',
                        'format_id': f'youtube_audio_320_{video_id}',
                        'ext': 'mp3',
                        'filesize': filesize_320,
                        'abr': 320,
                        'platform': 'youtube',
                        'description': f'High Quality MP3 320kbps ({self._format_size(filesize_320)})'
                    })

                    # 256kbps - Very Good Quality
                    filesize_256 = int(duration * 256 * 1000 / 8)
                    audio_formats.append({
                        'quality': '256kbps Very Good Quality',
                        'type': 'audio',
                        'format_id': f'youtube_audio_256_{video_id}',
                        'ext': 'mp3',
                        'filesize': filesize_256,
                        'abr': 256,
                        'platform': 'youtube',
                        'description': f'Very Good Quality MP3 256kbps ({self._format_size(filesize_256)})'
                    })

                    # 192kbps - Standard Quality
                    filesize_192 = int(duration * 192 * 1000 / 8)
                    audio_formats.append({
                        'quality': '192kbps Standard Quality',
                        'type': 'audio',
                        'format_id': f'youtube_audio_192_{video_id}',
                        'ext': 'mp3',
                        'filesize': filesize_192,
                        'abr': 192,
                        'platform': 'youtube',
                        'description': f'Standard Quality MP3 192kbps ({self._format_size(filesize_192)})'
                    })

                    # 128kbps - Good Quality
                    filesize_128 = int(duration * 128 * 1000 / 8)
                    audio_formats.append({
                        'quality': '128kbps Good Quality',
                        'type': 'audio',
                        'format_id': f'youtube_audio_128_{video_id}',
                        'ext': 'mp3',
                        'filesize': filesize_128,
                        'abr': 128,
                        'platform': 'youtube',
                        'description': f'Good Quality MP3 128kbps ({self._format_size(filesize_128)})'
                    })

                    default_filesize = filesize_192
                else:
                    # Fallback estimates if duration is unknown
                    logger.warning("Duration unknown, using estimated file sizes")

                    audio_formats = [
                        {
                            'quality': '320kbps High Quality',
                            'type': 'audio',
                            'format_id': f'youtube_audio_320_{video_id}',
                            'ext': 'mp3',
                            'filesize': 5000000,
                            'abr': 320,
                            'platform': 'youtube',
                            'description': 'High Quality MP3 320kbps (Est. 5.0 MB)'
                        },
                        {
                            'quality': '256kbps Very Good Quality',
                            'type': 'audio',
                            'format_id': f'youtube_audio_256_{video_id}',
                            'ext': 'mp3',
                            'filesize': 4000000,
                            'abr': 256,
                            'platform': 'youtube',
                            'description': 'Very Good Quality MP3 256kbps (Est. 4.0 MB)'
                        },
                        {
                            'quality': '192kbps Standard Quality',
                            'type': 'audio',
                            'format_id': f'youtube_audio_192_{video_id}',
                            'ext': 'mp3',
                            'filesize': 3000000,
                            'abr': 192,
                            'platform': 'youtube',
                            'description': 'Standard Quality MP3 192kbps (Est. 3.0 MB)'
                        },
                        {
                            'quality': '128kbps Good Quality',
                            'type': 'audio',
                            'format_id': f'youtube_audio_128_{video_id}',
                            'ext': 'mp3',
                            'filesize': 2000000,
                            'abr': 128,
                            'platform': 'youtube',
                            'description': 'Good Quality MP3 128kbps (Est. 2.0 MB)'
                        }
                    ]
                    default_filesize = 3000000

                # Return response matching frontend expectations
                return jsonify({
                    'title': title,
                    'duration': duration,
                    'filesize': default_filesize,
                    'platform': 'youtube',
                    'type': 'youtube_audio',
                    'format': 'mp3',
                    'quality': 'Multiple Qualities Available',
                    'thumbnail': thumbnail,
                    'uploader': uploader,
                    'view_count': view_count,
                    'formats': {
                        'audio_formats': audio_formats
                    }
                })

        except yt_dlp.utils.DownloadError as e:
            error_msg = str(e)
            logger.error(f"yt-dlp error: {error_msg}")

            # Check for specific YouTube errors
            if 'Sign in to confirm' in error_msg or 'bot' in error_msg.lower():
                return jsonify({
                    'error': 'YouTube detected automated access. Please wait 30-60 seconds and try again. The advanced bypass is active but YouTube may temporarily block your server IP.'
                }), 500
            elif 'Video unavailable' in error_msg:
                return jsonify({
                    'error': 'This YouTube video is unavailable or has been removed.'
                }), 404
            elif 'Private video' in error_msg:
                return jsonify({
                    'error': 'This is a private YouTube video and cannot be downloaded.'
                }), 403
            elif 'HTTP Error 429' in error_msg:
                return jsonify({
                    'error': 'YouTube rate limit reached. Please wait 2-3 minutes before trying again.'
                }), 429
            else:
                return jsonify({
                    'error': f'YouTube error: Please try again in a few moments. Advanced bypass is active.'
                }), 500

        except Exception as e:
            logger.error(f"YouTube info extraction error: {str(e)}")
            return jsonify({
                'error': f'Failed to process YouTube URL: {str(e)}'
            }), 500

    def download_youtube_audio(self, url, download_id, download_progress, download_files, target_bitrate=192):
        """
        Download YouTube video and convert to MP3 with specified bitrate
        Uses mobile client API to bypass bot detection
        """
        temp_dir = None
        try:
            # Validate bitrate
            if target_bitrate not in self.supported_bitrates:
                target_bitrate = 192

            logger.info(f"Starting YouTube MP3 download: {url} at {target_bitrate}kbps")

            download_progress[download_id] = {
                'status': 'starting',
                'percent': 5,
                'platform': 'youtube'
            }

            temp_dir = tempfile.mkdtemp()

            # yt-dlp options with bot bypass and audio extraction
            ydl_opts = self.get_yt_dlp_opts(extract_info_only=False)
            ydl_opts.update({
                'outtmpl': os.path.join(temp_dir, '%(title).100s.%(ext)s'),
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': str(target_bitrate),
                }],
            })

            download_progress[download_id] = {
                'status': 'downloading',
                'percent': 10,
                'platform': 'youtube'
            }

            # Download and convert to MP3
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                video_title = info.get('title', 'audio')

            download_progress[download_id] = {
                'status': 'finalizing',
                'percent': 90,
                'platform': 'youtube'
            }

            # Find downloaded MP3 file
            files = [f for f in os.listdir(temp_dir) if f.endswith('.mp3') and os.path.isfile(os.path.join(temp_dir, f))]

            if not files:
                raise Exception("No MP3 file was created. Conversion may have failed.")

            # Get the largest file (should be the audio file)
            largest_file = max(files, key=lambda f: os.path.getsize(os.path.join(temp_dir, f)))
            filepath = os.path.join(temp_dir, largest_file)

            if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
                file_size = os.path.getsize(filepath)

                download_files[download_id] = {
                    'filepath': filepath,
                    'filename': largest_file,
                    'temp_dir': temp_dir,
                    'filesize': file_size,
                    'expected_format': 'mp3',
                    'platform': 'youtube'
                }

                download_progress[download_id] = {
                    'status': 'completed',
                    'percent': 100,
                    'filename': largest_file,
                    'filepath': filepath,
                    'filesize': file_size,
                    'platform': 'youtube'
                }

                logger.info(f"YouTube MP3 download completed: {largest_file} ({file_size} bytes)")
            else:
                raise Exception("Downloaded MP3 file is empty or corrupted")

        except yt_dlp.utils.DownloadError as e:
            error_msg = str(e)
            logger.error(f"YouTube download error: {error_msg}")

            if 'Sign in to confirm' in error_msg or 'bot' in error_msg.lower():
                error_msg = 'YouTube detected automation. Wait 30-60 seconds and try again. Advanced bypass is active.'
            elif 'Video unavailable' in error_msg:
                error_msg = 'This YouTube video is unavailable or has been removed.'
            elif 'Private video' in error_msg:
                error_msg = 'This is a private YouTube video and cannot be downloaded.'
            elif 'HTTP Error 429' in error_msg:
                error_msg = 'Rate limit reached. Please wait 2-3 minutes before trying again.'

            download_progress[download_id] = {
                'status': 'error',
                'percent': 0,
                'error': error_msg,
                'platform': 'youtube'
            }

            if temp_dir and os.path.exists(temp_dir):
                import shutil
                shutil.rmtree(temp_dir, ignore_errors=True)

        except Exception as e:
            error_msg = f"YouTube MP3 download failed: {str(e)}"
            logger.error(error_msg)

            download_progress[download_id] = {
                'status': 'error',
                'percent': 0,
                'error': error_msg,
                'platform': 'youtube'
            }

            if temp_dir and os.path.exists(temp_dir):
                import shutil
                shutil.rmtree(temp_dir, ignore_errors=True)

    def _format_size(self, bytes):
        """Format file size in human readable format"""
        if not bytes or bytes == 0:
            return 'Unknown size'

        try:
            bytes = int(bytes)

            for unit in ['B', 'KB', 'MB', 'GB']:
                if bytes < 1024.0:
                    return f"{bytes:.1f} {unit}"
                bytes /= 1024.0
            return f"{bytes:.1f} TB"
        except (ValueError, TypeError):
            return 'Unknown size'
