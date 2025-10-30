import yt_dlp
import os
import tempfile
import time
from flask import jsonify
from urllib.parse import urlparse, parse_qs
import re
from utils import ProgressHook

class YouTubeMp3Downloader:
    def __init__(self):
        self.platform = 'youtube'
        self.quality_presets = {
            '320': {'bitrate': 320, 'quality': '0'},  # Best quality
            '256': {'bitrate': 256, 'quality': '2'},  # Very good quality
            '192': {'bitrate': 192, 'quality': '3'},  # Good quality
            '128': {'bitrate': 128, 'quality': '5'},  # Standard quality
        }

    def validate_youtube_url(self, url):
        """Validate if URL is a valid YouTube URL"""
        youtube_patterns = [
            r'^(https?://)?(www\.)?(youtube\.com/watch\?v=|youtu\.be/)[\w-]+',
            r'^(https?://)?(www\.)?youtube\.com/shorts/[\w-]+',
            r'^(https?://)?(www\.)?youtube\.com/embed/[\w-]+',
        ]

        for pattern in youtube_patterns:
            if re.match(pattern, url.lower()):
                return True
        return False

    def extract_video_id(self, url):
        """Extract video ID from YouTube URL"""
        patterns = [
            r'(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})',
            r'youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})',
        ]

        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        return None

    def get_yt_opts(self, base_opts=None, target_bitrate=192):
        """Get optimized yt-dlp options for YouTube MP3 conversion"""
        if base_opts is None:
            base_opts = {}

        # Ensure target_bitrate is valid
        if target_bitrate not in [128, 192, 256, 320]:
            target_bitrate = 192

        quality_setting = self.quality_presets.get(str(target_bitrate), self.quality_presets['192'])

        yt_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'socket_timeout': 60,
            'retries': 5,
            'fragment_retries': 5,
            'file_access_retries': 5,
            'extractor_retries': 5,
            'skip_unavailable_fragments': True,
            'ignoreerrors': False,
            'no_color': True,

            # YouTube-specific optimizations
            'format': 'bestaudio/best',
            'prefer_ffmpeg': True,
            'keepvideo': False,

            # Fast extraction
            'concurrent_fragment_downloads': 8,
            'http_chunk_size': 10485760,  # 10MB chunks

            # Audio extraction settings
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': str(target_bitrate),
            }],

            # FFmpeg args for faster processing
            'postprocessor_args': [
                '-threads', '4',  # Use 4 threads for faster encoding
                '-preset', 'ultrafast',  # Fastest encoding preset
            ],

            # Headers
            'http_headers': {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
            },
        }

        yt_opts.update(base_opts)
        return yt_opts

    def get_youtube_info(self, url):
        """Extract YouTube video information for MP3 conversion"""
        try:
            if not self.validate_youtube_url(url):
                return jsonify({'error': 'Invalid YouTube URL. Please provide a valid YouTube video, shorts, or embed URL.'}), 400

            video_id = self.extract_video_id(url)
            if not video_id:
                return jsonify({'error': 'Could not extract video ID from URL'}), 400

            ydl_opts = self.get_yt_opts({
                'noplaylist': True,
                'extract_flat': False,
            })

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)

                if not info:
                    raise Exception('Could not extract video information')

                # Extract relevant information
                title = info.get('title', '') or info.get('fulltitle', '') or 'YouTube Video'
                duration = info.get('duration', 0)
                uploader = info.get('uploader', '') or info.get('channel', '') or 'Unknown'
                thumbnail = info.get('thumbnail', '')
                view_count = info.get('view_count', 0)

                # Get best audio format for format_id
                formats = info.get('formats', [])
                audio_format = None

                # Find best audio-only format
                for fmt in formats:
                    if fmt.get('acodec', 'none') != 'none' and fmt.get('vcodec', 'none') == 'none':
                        audio_format = fmt
                        break

                if not audio_format:
                    # If no audio-only format, find best format with audio
                    for fmt in formats:
                        if fmt.get('acodec', 'none') != 'none':
                            audio_format = fmt
                            break

                if not audio_format and formats:
                    audio_format = formats[0]

                format_id = audio_format.get('format_id', 'bestaudio') if audio_format else 'bestaudio'

                # Create multiple quality options with accurate file size calculations
                audio_formats = []

                if duration > 0:
                    # 320kbps - High Quality
                    filesize_320 = int(duration * 320 * 1000 / 8)
                    audio_formats.append({
                        'quality': '320kbps - Premium Quality',
                        'type': 'audio',
                        'format_id': f"{format_id}_320",
                        'ext': 'mp3',
                        'filesize': filesize_320,
                        'abr': 320,
                        'platform': 'youtube',
                        'description': f"Premium Quality MP3 ({self._format_size(filesize_320)})"
                    })

                    # 256kbps - Very High Quality
                    filesize_256 = int(duration * 256 * 1000 / 8)
                    audio_formats.append({
                        'quality': '256kbps - Very High Quality',
                        'type': 'audio',
                        'format_id': f"{format_id}_256",
                        'ext': 'mp3',
                        'filesize': filesize_256,
                        'abr': 256,
                        'platform': 'youtube',
                        'description': f"Very High Quality MP3 ({self._format_size(filesize_256)})"
                    })

                    # 192kbps - High Quality
                    filesize_192 = int(duration * 192 * 1000 / 8)
                    audio_formats.append({
                        'quality': '192kbps - High Quality',
                        'type': 'audio',
                        'format_id': f"{format_id}_192",
                        'ext': 'mp3',
                        'filesize': filesize_192,
                        'abr': 192,
                        'platform': 'youtube',
                        'description': f"High Quality MP3 ({self._format_size(filesize_192)})"
                    })

                    # 128kbps - Standard Quality
                    filesize_128 = int(duration * 128 * 1000 / 8)
                    audio_formats.append({
                        'quality': '128kbps - Standard Quality',
                        'type': 'audio',
                        'format_id': f"{format_id}_128",
                        'ext': 'mp3',
                        'filesize': filesize_128,
                        'abr': 128,
                        'platform': 'youtube',
                        'description': f"Standard Quality MP3 ({self._format_size(filesize_128)})"
                    })

                    default_filesize = filesize_192
                else:
                    # Fallback estimates
                    audio_formats = [
                        {'quality': '320kbps - Premium Quality', 'type': 'audio', 'format_id': f"{format_id}_320", 'ext': 'mp3', 'filesize': 5000000, 'abr': 320, 'platform': 'youtube', 'description': 'Premium Quality MP3 (~ 5 MB)'},
                        {'quality': '256kbps - Very High Quality', 'type': 'audio', 'format_id': f"{format_id}_256", 'ext': 'mp3', 'filesize': 4000000, 'abr': 256, 'platform': 'youtube', 'description': 'Very High Quality MP3 (~ 4 MB)'},
                        {'quality': '192kbps - High Quality', 'type': 'audio', 'format_id': f"{format_id}_192", 'ext': 'mp3', 'filesize': 3000000, 'abr': 192, 'platform': 'youtube', 'description': 'High Quality MP3 (~ 3 MB)'},
                        {'quality': '128kbps - Standard Quality', 'type': 'audio', 'format_id': f"{format_id}_128", 'ext': 'mp3', 'filesize': 2000000, 'abr': 128, 'platform': 'youtube', 'description': 'Standard Quality MP3 (~ 2 MB)'},
                    ]
                    default_filesize = 3000000

                return jsonify({
                    'title': title,
                    'duration': duration,
                    'filesize': default_filesize,
                    'platform': 'youtube',
                    'type': 'youtube_mp3',
                    'format': 'mp3',
                    'quality': 'Multiple Qualities Available',
                    'thumbnail': thumbnail,
                    'uploader': uploader,
                    'view_count': view_count,
                    'video_id': video_id,
                    'formats': {
                        'audio_formats': audio_formats
                    }
                })

        except Exception as e:
            print(f"YouTube MP3 info extraction error: {str(e)}")
            return jsonify({'error': f'Failed to process YouTube URL: {str(e)}'}), 500

    def download_youtube_mp3(self, url, download_id, download_progress, download_files, target_bitrate=192):
        """Download and convert YouTube video to MP3 with specified bitrate"""
        temp_dir = None
        try:
            download_progress[download_id] = {
                'status': 'starting',
                'percent': 5,
                'platform': 'youtube'
            }

            temp_dir = tempfile.mkdtemp()

            ydl_opts = self.get_yt_opts({
                'progress_hooks': [ProgressHook(download_id, download_progress)],
                'outtmpl': os.path.join(temp_dir, '%(title).100s.%(ext)s'),
            }, target_bitrate=target_bitrate)

            download_progress[download_id] = {
                'status': 'downloading',
                'percent': 10,
                'platform': 'youtube'
            }

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url])

            download_progress[download_id] = {
                'status': 'finalizing',
                'percent': 90,
                'platform': 'youtube'
            }

            # Find downloaded file
            files = [f for f in os.listdir(temp_dir) if os.path.isfile(os.path.join(temp_dir, f)) and f.endswith('.mp3')]
            if files:
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
                else:
                    raise Exception("Downloaded file is empty or corrupted")
            else:
                raise Exception("No MP3 files were downloaded")

        except Exception as e:
            error_msg = f"YouTube MP3 download failed: {str(e)}"
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
