"""
YouTube to MP3 Downloader
Dedicated module for downloading YouTube videos and converting to MP3 audio
NO COOKIES REQUIRED - Uses mobile client API bypass
"""

import yt_dlp
import os
import tempfile
import logging
from flask import jsonify
from urllib.parse import urlparse, parse_qs
import re

logger = logging.getLogger(__name__)


class YouTubeToMP3Downloader:
    """YouTube to MP3 Converter with bot bypass (NO COOKIES)"""

    def __init__(self):
        self.platform = 'youtube'
        self.supported_bitrates = [128, 192, 256, 320]
        logger.info("YouTubeToMP3Downloader initialized successfully")

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

    def get_yt_dlp_opts(self, extract_info_only=True):
        """
        Get yt-dlp options optimized for YouTube with AGGRESSIVE bot bypass
        NO COOKIES REQUIRED - Uses multiple player clients for live servers
        """
        opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'socket_timeout': 60,
            'retries': 10,  # Increased retries for live servers
            'fragment_retries': 10,
            'file_access_retries': 5,
            'extractor_retries': 5,
            'skip_unavailable_fragments': True,
            'ignoreerrors': False,
            'no_color': True,

            # AGGRESSIVE YouTube bot bypass - Multiple player clients for live servers
            'extractor_args': {
                'youtube': {
                    # Try multiple player clients in order - more options = better bypass
                    'player_client': ['ios', 'android', 'web_embedded_player', 'tv_embedded'],
                    'skip': ['webpage', 'configs', 'dash', 'hls'],  # Skip all webpage parsing
                    'player_skip': ['webpage', 'configs'],
                    'innertube_client': 'ios',  # Force iOS client
                }
            },

            # Network options for live server bypass
            'nocheckcertificate': True,
            'geo_bypass': True,
            'source_address': '0.0.0.0',  # Bind to all interfaces

            # iOS YouTube app headers - most reliable for live servers
            'http_headers': {
                'User-Agent': 'com.google.ios.youtube/19.29.1 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X;)',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Origin': 'https://www.youtube.com',
                'X-YouTube-Client-Name': '5',
                'X-YouTube-Client-Version': '19.29.1',
            },
        }

        # If not just extracting info, add download options
        if not extract_info_only:
            opts.update({
                'format': 'bestaudio/best',
                'prefer_ffmpeg': True,
                'keepvideo': False,
                'concurrent_fragment_downloads': 5,  # More concurrent downloads
                'http_chunk_size': 10485760,  # 10MB chunks for better performance
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
                    'error': 'YouTube is temporarily blocking automated access. Please try again in a moment.'
                }), 500
            elif 'Video unavailable' in error_msg:
                return jsonify({
                    'error': 'This YouTube video is unavailable or has been removed.'
                }), 404
            elif 'Private video' in error_msg:
                return jsonify({
                    'error': 'This is a private YouTube video and cannot be downloaded.'
                }), 403
            else:
                return jsonify({
                    'error': f'Failed to process YouTube video: {error_msg}'
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
                error_msg = 'YouTube is blocking automated downloads. Please try again later.'
            elif 'Video unavailable' in error_msg:
                error_msg = 'This YouTube video is unavailable or has been removed.'
            elif 'Private video' in error_msg:
                error_msg = 'This is a private YouTube video and cannot be downloaded.'

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
