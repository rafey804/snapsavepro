import os
import logging
import tempfile
import subprocess
from pathlib import Path
from typing import Dict, Any, Optional
import uuid
import yt_dlp

logger = logging.getLogger(__name__)


class VideoToMP3Converter:
    """
    Advanced Video to MP3 Converter
    Supports multiple video formats and converts them to high-quality MP3 audio
    """

    def __init__(self):
        """Initialize the Video to MP3 converter"""
        self.supported_video_formats = [
            'mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm',
            '3gp', 'mpg', 'mpeg', 'm4v', 'f4v', 'ts'
        ]
        self.supported_audio_bitrates = [128, 192, 256, 320]
        self.temp_dir = tempfile.gettempdir()
        logger.info("VideoToMP3Converter initialized successfully")

    def validate_video_file(self, filepath: str) -> Dict[str, Any]:
        """
        Validate if the uploaded file is a valid video

        Args:
            filepath: Path to the video file

        Returns:
            dict: Validation result with status and message
        """
        try:
            if not os.path.exists(filepath):
                return {
                    'valid': False,
                    'error': 'File not found'
                }

            # Check file size (max 500MB)
            file_size = os.path.getsize(filepath)
            max_size = 500 * 1024 * 1024  # 500MB

            if file_size > max_size:
                return {
                    'valid': False,
                    'error': f'File too large. Maximum size is 500MB'
                }

            if file_size == 0:
                return {
                    'valid': False,
                    'error': 'File is empty'
                }

            # Check file extension
            file_ext = Path(filepath).suffix.lower().replace('.', '')

            if file_ext not in self.supported_video_formats:
                return {
                    'valid': False,
                    'error': f'Unsupported format. Supported formats: {", ".join(self.supported_video_formats)}'
                }

            return {
                'valid': True,
                'file_size': file_size,
                'format': file_ext,
                'message': 'Video file is valid'
            }

        except Exception as e:
            logger.error(f"Error validating video file: {e}")
            return {
                'valid': False,
                'error': f'Validation error: {str(e)}'
            }

    def get_video_info(self, filepath: str) -> Optional[Dict[str, Any]]:
        """
        Extract video information using ffprobe

        Args:
            filepath: Path to the video file

        Returns:
            dict: Video information including duration, codec, bitrate
        """
        try:
            # Use ffprobe to get video information
            cmd = [
                'ffprobe',
                '-v', 'quiet',
                '-print_format', 'json',
                '-show_format',
                '-show_streams',
                filepath
            ]

            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=30
            )

            if result.returncode != 0:
                logger.warning(f"ffprobe failed, using basic info")
                return None

            import json
            info = json.loads(result.stdout)

            # Extract relevant information
            duration = float(info.get('format', {}).get('duration', 0))
            format_name = info.get('format', {}).get('format_name', 'unknown')

            # Get audio stream info if available
            audio_stream = None
            for stream in info.get('streams', []):
                if stream.get('codec_type') == 'audio':
                    audio_stream = stream
                    break

            return {
                'duration': duration,
                'format': format_name,
                'audio_codec': audio_stream.get('codec_name') if audio_stream else 'unknown',
                'sample_rate': audio_stream.get('sample_rate') if audio_stream else 'unknown'
            }

        except FileNotFoundError:
            logger.warning("ffprobe not found, skipping detailed video info")
            return None
        except Exception as e:
            logger.error(f"Error getting video info: {e}")
            return None

    def convert_video_to_mp3(
        self,
        input_path: str,
        output_path: str,
        bitrate: int = 320,
        progress_callback: Optional[callable] = None
    ) -> Dict[str, Any]:
        """
        Convert video file to MP3 using ffmpeg (Optimized for speed)

        Args:
            input_path: Path to input video file
            output_path: Path to output MP3 file
            bitrate: Audio bitrate (default 320 for high quality)
            progress_callback: Optional callback for progress updates

        Returns:
            dict: Conversion result with status and file path
        """
        try:
            # Validate bitrate
            if bitrate not in self.supported_audio_bitrates:
                bitrate = 320  # Default to 320kbps high quality

            if progress_callback:
                progress_callback(20, 'Starting conversion...')

            # Optimized ffmpeg command for fast conversion
            cmd = [
                'ffmpeg',
                '-i', input_path,
                '-vn',  # No video
                '-acodec', 'libmp3lame',  # MP3 codec
                '-b:a', f'{bitrate}k',  # Audio bitrate
                '-ar', '44100',  # Sample rate
                '-ac', '2',  # Stereo
                '-threads', '0',  # Use all available CPU threads
                '-y',  # Overwrite output file
                output_path
            ]

            logger.info(f"Fast converting video to MP3: {bitrate}kbps")

            if progress_callback:
                progress_callback(40, 'Converting audio...')

            # Run conversion with optimized settings
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=120  # 2 minute timeout
            )

            if result.returncode != 0:
                logger.error(f"ffmpeg error: {result.stderr}")
                return {
                    'success': False,
                    'error': 'Conversion failed'
                }

            if progress_callback:
                progress_callback(80, 'Finalizing...')

            # Verify output file
            if not os.path.exists(output_path):
                return {
                    'success': False,
                    'error': 'Output file not created'
                }

            output_size = os.path.getsize(output_path)
            if output_size == 0:
                return {
                    'success': False,
                    'error': 'Output file is empty'
                }

            if progress_callback:
                progress_callback(100, 'Conversion complete!')

            return {
                'success': True,
                'output_path': output_path,
                'output_size': output_size,
                'bitrate': bitrate,
                'message': 'Conversion successful'
            }

        except FileNotFoundError:
            logger.error("ffmpeg not found. Please install ffmpeg.")
            return {
                'success': False,
                'error': 'ffmpeg not installed. Please install ffmpeg to use this feature.'
            }
        except subprocess.TimeoutExpired:
            logger.error("Conversion timeout")
            return {
                'success': False,
                'error': 'Conversion timeout - file may be too large'
            }
        except Exception as e:
            logger.error(f"Conversion error: {e}")
            return {
                'success': False,
                'error': f'Conversion failed: {str(e)}'
            }

    def process_uploaded_video(
        self,
        file_path: str,
        original_filename: str,
        bitrate: int = 320,
        progress_callback: Optional[callable] = None
    ) -> Dict[str, Any]:
        """
        Process uploaded video file and convert to MP3 (Optimized for speed)

        Args:
            file_path: Path to uploaded video file
            original_filename: Original filename
            bitrate: Desired audio bitrate (default 320kbps)
            progress_callback: Progress callback function

        Returns:
            dict: Processing result with output file info
        """
        try:
            if progress_callback:
                progress_callback(10, 'Preparing conversion...')

            # Quick validation - just check file exists and has size
            if not os.path.exists(file_path):
                return {
                    'success': False,
                    'error': 'File not found'
                }

            file_size = os.path.getsize(file_path)
            if file_size == 0:
                return {
                    'success': False,
                    'error': 'File is empty'
                }

            # Skip detailed validation for speed - proceed directly to conversion

            # Generate output filename with unique ID
            base_name = Path(original_filename).stem
            unique_id = uuid.uuid4().hex[:8]  # Use first 8 chars of UUID
            output_filename = f"{base_name}_{unique_id}.mp3"
            output_path = os.path.join(self.temp_dir, output_filename)

            # Convert video to MP3 (fast conversion)
            conversion_result = self.convert_video_to_mp3(
                file_path,
                output_path,
                bitrate,
                progress_callback
            )

            if not conversion_result['success']:
                return conversion_result

            return {
                'success': True,
                'output_path': output_path,
                'output_filename': output_filename,
                'output_size': conversion_result['output_size'],
                'bitrate': bitrate,
                'message': 'Video successfully converted to MP3'
            }

        except Exception as e:
            logger.error(f"Error processing uploaded video: {e}")
            return {
                'success': False,
                'error': f'Processing failed: {str(e)}'
            }

    def convert_url_to_mp3(
        self,
        url: str,
        bitrate: int = 192,
        progress_callback: Optional[callable] = None
    ) -> Dict[str, Any]:
        """
        Download video from URL and convert to MP3 (Optimized for YouTube with bot bypass)

        Args:
            url: Video URL (YouTube, etc.)
            bitrate: Desired audio bitrate
            progress_callback: Progress callback function

        Returns:
            dict: Conversion result with output file info
        """
        try:
            if progress_callback:
                progress_callback(5, 'Fetching video information...')

            # Create temporary directory for download
            temp_download_dir = tempfile.mkdtemp()

            # COOKIES ENABLED yt-dlp options for YouTube
            ydl_opts = {
                # Format - prefer best quality audio
                'format': 'bestaudio/best',
                'outtmpl': os.path.join(temp_download_dir, '%(title)s.%(ext)s'),

                # Quiet mode
                'quiet': True,
                'no_warnings': True,
                'extract_flat': False,

                # NO COOKIES - Safer for production servers
                # YouTube bot bypass without cookies
                'extractor_args': {
                    'youtube': {
                        'player_client': ['android_testsuite', 'android_embedded', 'android', 'mweb'],
                        'skip': ['webpage', 'configs', 'dash', 'hls'],
                        'player_skip': ['js', 'configs', 'webpage'],
                    }
                },

                # Network options for live servers
                'nocheckcertificate': True,
                'geo_bypass': True,
                'source_address': '0.0.0.0',

                # Chrome browser headers
                'http_headers': {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Referer': 'https://www.youtube.com/',
                    'Origin': 'https://www.youtube.com',
                },

                # Extract audio directly (faster than downloading video then converting)
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': str(bitrate),
                }],

                # Aggressive retry options for live servers
                'retries': 10,
                'fragment_retries': 10,
                'file_access_retries': 5,
                'extractor_retries': 5,
                'skip_unavailable_fragments': True,
                'ignoreerrors': False,

                # Performance options
                'keepvideo': False,
                'writethumbnail': False,
                'prefer_ffmpeg': True,
                'concurrent_fragment_downloads': 5,
                'http_chunk_size': 10485760,
            }

            if progress_callback:
                progress_callback(15, 'Downloading and converting audio...')

            # Download and extract audio
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                video_title = info.get('title', 'audio')

                # The file is already converted to MP3 by postprocessor
                # Find the MP3 file in temp directory
                import glob
                mp3_files = glob.glob(os.path.join(temp_download_dir, '*.mp3'))

                if not mp3_files:
                    # Fallback: look for any audio file
                    audio_files = glob.glob(os.path.join(temp_download_dir, '*'))
                    if audio_files:
                        downloaded_file = audio_files[0]
                    else:
                        raise Exception("No audio file found after download")
                else:
                    downloaded_file = mp3_files[0]

            if not os.path.exists(downloaded_file):
                return {
                    'success': False,
                    'error': 'Failed to download audio'
                }

            if progress_callback:
                progress_callback(80, 'Finalizing MP3 file...')

            # Check if file is already MP3 (converted by yt-dlp)
            file_ext = os.path.splitext(downloaded_file)[1].lower()

            # Generate output filename with unique ID
            unique_id = uuid.uuid4().hex[:8]
            # Sanitize video title for filename
            safe_title = "".join(c for c in video_title if c.isalnum() or c in (' ', '-', '_')).strip()
            safe_title = safe_title[:50]  # Limit length
            output_filename = f"{safe_title}_{unique_id}.mp3"
            output_path = os.path.join(self.temp_dir, output_filename)

            if file_ext == '.mp3':
                # Already MP3, just move/rename it
                import shutil
                shutil.move(downloaded_file, output_path)
                output_size = os.path.getsize(output_path)

                # Clean up temp directory
                try:
                    os.rmdir(temp_download_dir)
                except:
                    pass

                if progress_callback:
                    progress_callback(100, 'Conversion complete!')

                return {
                    'success': True,
                    'output_path': output_path,
                    'output_filename': output_filename,
                    'output_size': output_size,
                    'bitrate': bitrate,
                    'video_title': video_title,
                    'message': 'Audio successfully downloaded and converted to MP3'
                }
            else:
                # Need to convert to MP3
                if progress_callback:
                    progress_callback(60, 'Converting to MP3...')

                conversion_result = self.convert_video_to_mp3(
                    downloaded_file,
                    output_path,
                    bitrate,
                    lambda p, m: progress_callback(60 + (p * 0.3), m) if progress_callback else None
                )

                # Clean up downloaded file and temp directory
                try:
                    os.remove(downloaded_file)
                    os.rmdir(temp_download_dir)
                except:
                    pass

                if not conversion_result['success']:
                    return conversion_result

                return {
                    'success': True,
                    'output_path': output_path,
                    'output_filename': output_filename,
                    'output_size': conversion_result['output_size'],
                    'bitrate': bitrate,
                    'video_title': video_title,
                    'message': 'Video URL successfully converted to MP3'
                }

        except yt_dlp.utils.DownloadError as e:
            error_msg = str(e)
            logger.error(f"yt-dlp download error: {error_msg}")

            # Check for specific YouTube errors
            if 'Sign in to confirm' in error_msg or 'bot' in error_msg.lower():
                return {
                    'success': False,
                    'error': 'YouTube is blocking automated downloads. Please try again later or use a different video.'
                }
            elif 'Video unavailable' in error_msg:
                return {
                    'success': False,
                    'error': 'This video is unavailable or has been removed.'
                }
            elif 'Private video' in error_msg:
                return {
                    'success': False,
                    'error': 'This video is private and cannot be downloaded.'
                }
            else:
                return {
                    'success': False,
                    'error': f'Failed to process YouTube URL: {error_msg}'
                }

        except Exception as e:
            logger.error(f"Error converting URL to MP3: {e}")
            return {
                'success': False,
                'error': f'URL conversion failed: {str(e)}'
            }
