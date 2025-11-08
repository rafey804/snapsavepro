import yt_dlp
import requests
import os
import tempfile
import time
from flask import jsonify
from urllib.parse import urlparse
import mimetypes
from utils import ProgressHook
import re

class AudioDownloader:
    def __init__(self):
        self.platform = 'audio'
        self.supported_audio_formats = ['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.flac', '.wma']
        self.supported_video_platforms = [
            'youtube.com', 'youtu.be', 'soundcloud.com', 'vimeo.com', 
            'dailymotion.com', 'twitch.tv', 'mixcloud.com'
        ]
    
    def validate_audio_url(self, url):
        """Validate if URL is a direct audio link or supported platform"""
        try:
            parsed_url = urlparse(url.lower())
            
            # Check for direct audio file extensions
            path = parsed_url.path.lower()
            if any(path.endswith(ext) for ext in self.supported_audio_formats):
                return {'type': 'direct', 'format': 'audio'}
            
            # Check for supported video platforms (for audio extraction)
            domain = parsed_url.netloc.replace('www.', '')
            if any(platform in domain for platform in self.supported_video_platforms):
                return {'type': 'platform', 'format': 'video_to_audio'}
            
            # Check if it's a generic media URL
            if parsed_url.scheme in ['http', 'https']:
                return {'type': 'generic', 'format': 'unknown'}
            
            return None
            
        except Exception as e:
            print(f"URL validation error: {e}")
            return None
    
    def get_audio_opts(self, base_opts=None, target_bitrate=192):
        """Get yt-dlp options optimized for audio extraction (NO COOKIES)"""
        if base_opts is None:
            base_opts = {}

        # Ensure target_bitrate is valid
        if target_bitrate not in [128, 192, 256, 320]:
            target_bitrate = 192

        audio_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'socket_timeout': 60,
            'retries': 5,
            'fragment_retries': 5,
            'file_access_retries': 3,
            'extractor_retries': 3,
            'skip_unavailable_fragments': True,
            'ignoreerrors': False,
            'no_color': True,
            'format': 'bestaudio/best',
            'prefer_ffmpeg': True,
            'keepvideo': False,

            # YouTube bot bypass using mobile clients (NO COOKIES NEEDED)
            'extractor_args': {
                'youtube': {
                    'player_client': ['ios', 'android'],
                    'skip': ['webpage', 'configs'],
                }
            },

            # Network options
            'nocheckcertificate': True,
            'geo_bypass': True,

            # Audio extraction settings with custom bitrate
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': str(target_bitrate),
            }],

            # iOS YouTube app headers
            'http_headers': {
                'User-Agent': 'com.google.ios.youtube/19.29.1 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X;)',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
            },

            # Performance
            'concurrent_fragment_downloads': 3,
        }

        audio_opts.update(base_opts)
        return audio_opts
    
    def get_direct_audio_info(self, url):
        """Get information about direct audio URL"""
        try:
            # Make HEAD request to get file info
            response = requests.head(url, timeout=10, allow_redirects=True)
            
            if response.status_code == 200:
                content_type = response.headers.get('content-type', '')
                content_length = response.headers.get('content-length', '0')
                
                # Extract filename from URL
                parsed_url = urlparse(url)
                filename = os.path.basename(parsed_url.path) or 'audio_file'
                
                # Ensure .mp3 extension
                if not any(filename.lower().endswith(ext) for ext in self.supported_audio_formats):
                    filename += '.mp3'
                
                return {
                    'title': filename.replace('.mp3', '').replace('_', ' ').title(),
                    'filename': filename,
                    'filesize': int(content_length) if content_length.isdigit() else 0,
                    'content_type': content_type,
                    'direct_url': url,
                    'platform': 'direct_link',
                    'duration': 0,  # Unknown for direct links
                    'format': 'mp3'
                }
            else:
                raise Exception(f"Unable to access audio file (HTTP {response.status_code})")
                
        except Exception as e:
            raise Exception(f"Failed to get audio info: {str(e)}")
    
    def get_platform_audio_info(self, url):
        """Extract audio information from supported platforms"""
        try:
            ydl_opts = self.get_audio_opts({
                'noplaylist': True,
                'extract_flat': False,
            })
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                
                if not info:
                    raise Exception('Could not extract audio information')
                
                # Extract relevant information
                title = info.get('title', '') or info.get('fulltitle', '') or 'Audio Track'
                duration = info.get('duration', 0)
                uploader = info.get('uploader', '') or info.get('creator', '') or 'Unknown'
                
                # Calculate estimated file sizes based on duration
                if duration > 0:
                    # More accurate file size calculation
                    # Formula: (bitrate * duration) / 8 = bytes
                    base_size_192 = int(duration * 192 * 1000 / 8)  # 192kbps in bytes
                else:
                    # Fallback estimates if duration is unknown
                    base_size_192 = 3000000  # 3MB default estimate
                
                # Get best audio format info for format_id
                formats = info.get('formats', [])
                audio_format = None
                
                for fmt in formats:
                    if fmt.get('acodec', 'none') != 'none':
                        audio_format = fmt
                        break
                
                if not audio_format and formats:
                    # Use best format and extract audio
                    audio_format = formats[0]
                
                return {
                    'title': title,
                    'duration': duration,
                    'uploader': uploader,
                    'base_filesize': base_size_192,
                    'platform': self._get_platform_name(url),
                    'format': 'mp3',
                    'thumbnail': info.get('thumbnail', ''),
                    'view_count': info.get('view_count', 0),
                    'format_id': audio_format.get('format_id', 'best') if audio_format else 'best'
                }
                
        except Exception as e:
            raise Exception(f"Failed to extract audio info: {str(e)}")
    
    def _get_platform_name(self, url):
        """Get platform name from URL"""
        domain = urlparse(url).netloc.lower().replace('www.', '')
        if 'youtube.com' in domain or 'youtu.be' in domain:
            return 'youtube'
        elif 'soundcloud.com' in domain:
            return 'soundcloud'
        elif 'vimeo.com' in domain:
            return 'vimeo'
        elif 'dailymotion.com' in domain:
            return 'dailymotion'
        elif 'twitch.tv' in domain:
            return 'twitch'
        elif 'mixcloud.com' in domain:
            return 'mixcloud'
        else:
            return 'unknown'
    
    def get_audio_info(self, url):
        """Main method to get audio information from URL"""
        try:
            url_validation = self.validate_audio_url(url)
            
            if not url_validation:
                return jsonify({
                    'error': 'Invalid URL. Please provide a direct audio link or supported platform URL (YouTube, SoundCloud, etc.)'
                }), 400
            
            if url_validation['type'] == 'direct':
                audio_info = self.get_direct_audio_info(url)
                
                return jsonify({
                    'title': audio_info['title'],
                    'duration': audio_info['duration'],
                    'filesize': audio_info['filesize'],
                    'platform': 'direct_link',
                    'type': 'direct_audio',
                    'format': 'mp3',
                    'quality': 'Original',
                    'direct_url': url,
                    'thumbnail': '',
                    'uploader': 'Direct Link',
                    'formats': {
                        'audio_formats': [{
                            'quality': 'Original Quality',
                            'type': 'audio',
                            'format_id': 'direct',
                            'ext': 'mp3',
                            'filesize': audio_info['filesize'],
                            'direct_url': url,
                            'platform': 'direct_link',
                            'description': f"Direct MP3 download ({self._format_size(audio_info['filesize'])})"
                        }]
                    }
                })
            
            elif url_validation['type'] == 'platform':
                audio_info = self.get_platform_audio_info(url)
                
                # Create multiple quality options with proper file size calculations
                audio_formats = []
                duration = audio_info['duration']
                base_filesize = audio_info['base_filesize']
                
                # If we have duration, calculate accurate file sizes
                if duration > 0:
                    print(f"Debug: Duration found: {duration} seconds")
                    
                    # 320kbps - High Quality
                    filesize_320 = int(duration * 320 * 1000 / 8)  # More accurate calculation
                    print(f"Debug: 320kbps filesize calculated: {filesize_320} bytes = {self._format_size(filesize_320)}")
                    
                    audio_formats.append({
                        'quality': '320kbps High Quality',
                        'type': 'audio',
                        'format_id': f"{audio_info['format_id']}_320",
                        'ext': 'mp3',
                        'filesize': filesize_320,
                        'abr': 320,
                        'platform': audio_info['platform'],
                        'description': f"High Quality MP3 320kbps ({self._format_size(filesize_320)})"
                    })
                    
                    # 192kbps - Standard Quality  
                    filesize_192 = int(duration * 192 * 1000 / 8)
                    print(f"Debug: 192kbps filesize calculated: {filesize_192} bytes = {self._format_size(filesize_192)}")
                    
                    audio_formats.append({
                        'quality': '192kbps Standard Quality',
                        'type': 'audio',
                        'format_id': f"{audio_info['format_id']}_192",
                        'ext': 'mp3',
                        'filesize': filesize_192,
                        'abr': 192,
                        'platform': audio_info['platform'],
                        'description': f"Standard Quality MP3 192kbps ({self._format_size(filesize_192)})"
                    })
                    
                    # 128kbps - Good Quality
                    filesize_128 = int(duration * 128 * 1000 / 8)
                    print(f"Debug: 128kbps filesize calculated: {filesize_128} bytes = {self._format_size(filesize_128)}")
                    
                    audio_formats.append({
                        'quality': '128kbps Good Quality',
                        'type': 'audio',
                        'format_id': f"{audio_info['format_id']}_128",
                        'ext': 'mp3',
                        'filesize': filesize_128,
                        'abr': 128,
                        'platform': audio_info['platform'],
                        'description': f"Good Quality MP3 128kbps ({self._format_size(filesize_128)})"
                    })
                    
                    default_filesize = filesize_192
                else:
                    # Fallback if duration is unknown - use estimated sizes
                    print("Warning: Duration unknown, using estimated file sizes")
                    
                    # 320kbps - High Quality (estimated)
                    filesize_320 = 5000000  # 5MB estimate
                    audio_formats.append({
                        'quality': '320kbps High Quality',
                        'type': 'audio',
                        'format_id': f"{audio_info['format_id']}_320",
                        'ext': 'mp3',
                        'filesize': filesize_320,
                        'abr': 320,
                        'platform': audio_info['platform'],
                        'description': f"High Quality MP3 320kbps ({self._format_size(filesize_320)})"
                    })
                    
                    # 192kbps - Standard Quality (estimated)
                    filesize_192 = 3000000  # 3MB estimate
                    audio_formats.append({
                        'quality': '192kbps Standard Quality',
                        'type': 'audio',
                        'format_id': f"{audio_info['format_id']}_192",
                        'ext': 'mp3',
                        'filesize': filesize_192,
                        'abr': 192,
                        'platform': audio_info['platform'],
                        'description': f"Standard Quality MP3 192kbps ({self._format_size(filesize_192)})"
                    })
                    
                    # 128kbps - Good Quality (estimated)
                    filesize_128 = 2000000  # 2MB estimate
                    audio_formats.append({
                        'quality': '128kbps Good Quality',
                        'type': 'audio',
                        'format_id': f"{audio_info['format_id']}_128",
                        'ext': 'mp3',
                        'filesize': filesize_128,
                        'abr': 128,
                        'platform': audio_info['platform'],
                        'description': f"Good Quality MP3 128kbps ({self._format_size(filesize_128)})"
                    })
                    
                    default_filesize = filesize_192
                
                return jsonify({
                    'title': audio_info['title'],
                    'duration': audio_info['duration'],
                    'filesize': default_filesize,
                    'platform': audio_info['platform'],
                    'type': 'platform_audio',
                    'format': 'mp3',
                    'quality': 'Multiple Qualities Available',
                    'thumbnail': audio_info['thumbnail'],
                    'uploader': audio_info['uploader'],
                    'view_count': audio_info.get('view_count', 0),
                    'formats': {
                        'audio_formats': audio_formats
                    }
                })
            
            else:
                # Try to handle as generic URL
                try:
                    audio_info = self.get_platform_audio_info(url)
                    return jsonify({
                        'title': audio_info['title'],
                        'duration': audio_info['duration'],
                        'filesize': audio_info['filesize'],
                        'platform': 'generic',
                        'type': 'extracted_audio',
                        'format': 'mp3',
                        'quality': audio_info['quality'],
                        'thumbnail': audio_info['thumbnail'],
                        'uploader': audio_info['uploader'],
                        'formats': {
                            'audio_formats': [{
                                'quality': f"{audio_info['quality']} MP3",
                                'type': 'audio',
                                'format_id': audio_info['format_id'],
                                'ext': 'mp3',
                                'filesize': audio_info['filesize'],
                                'abr': 192,
                                'platform': 'generic',
                                'description': f"Extracted MP3 ({self._format_size(audio_info['filesize'])})"
                            }]
                        }
                    })
                except:
                    return jsonify({
                        'error': 'Unable to extract audio from this URL. Please check the link and try again.'
                    }), 400
                
        except Exception as e:
            print(f"Audio info extraction error: {str(e)}")
            return jsonify({'error': f'Failed to process audio URL: {str(e)}'}), 500
    
    def _format_size(self, bytes):
        """Format file size in human readable format"""
        if not bytes or bytes == 0:
            return 'Unknown size'
        
        try:
            bytes = int(bytes)  # Ensure it's an integer
            
            for unit in ['B', 'KB', 'MB', 'GB']:
                if bytes < 1024.0:
                    return f"{bytes:.1f} {unit}"
                bytes /= 1024.0
            return f"{bytes:.1f} TB"
        except (ValueError, TypeError):
            return 'Unknown size'
    
    def download_direct_audio(self, url, download_id, download_progress, download_files):
        """Download direct audio file"""
        temp_dir = None
        try:
            download_progress[download_id] = {
                'status': 'starting',
                'percent': 5,
                'platform': 'direct_link'
            }
            
            temp_dir = tempfile.mkdtemp()
            
            # Get filename from URL
            parsed_url = urlparse(url)
            filename = os.path.basename(parsed_url.path) or 'audio_file.mp3'
            if not filename.endswith('.mp3'):
                filename += '.mp3'
            
            filepath = os.path.join(temp_dir, filename)
            
            download_progress[download_id] = {
                'status': 'downloading',
                'percent': 10,
                'platform': 'direct_link'
            }
            
            # Download file with progress
            response = requests.get(url, stream=True, timeout=30)
            response.raise_for_status()
            
            total_size = int(response.headers.get('content-length', 0))
            downloaded_size = 0
            
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
                        downloaded_size += len(chunk)
                        
                        if total_size > 0:
                            percent = min(int((downloaded_size / total_size) * 80) + 10, 90)
                            download_progress[download_id] = {
                                'status': 'downloading',
                                'percent': percent,
                                'downloaded_bytes': downloaded_size,
                                'total_bytes': total_size,
                                'platform': 'direct_link'
                            }
            
            download_progress[download_id] = {
                'status': 'finalizing',
                'percent': 95,
                'platform': 'direct_link'
            }
            
            if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
                file_size = os.path.getsize(filepath)
                
                download_files[download_id] = {
                    'filepath': filepath,
                    'filename': filename,
                    'temp_dir': temp_dir,
                    'filesize': file_size,
                    'expected_format': 'mp3',
                    'platform': 'direct_link'
                }
                
                download_progress[download_id] = {
                    'status': 'completed',
                    'percent': 100,
                    'filename': filename,
                    'filepath': filepath,
                    'filesize': file_size,
                    'platform': 'direct_link'
                }
            else:
                raise Exception("Downloaded file is empty or corrupted")
                
        except Exception as e:
            error_msg = f"Direct audio download failed: {str(e)}"
            download_progress[download_id] = {
                'status': 'error',
                'percent': 0,
                'error': error_msg,
                'platform': 'direct_link'
            }
            
            if temp_dir and os.path.exists(temp_dir):
                import shutil
                shutil.rmtree(temp_dir, ignore_errors=True)
    
    def download_platform_audio(self, url, download_id, download_progress, download_files, target_bitrate=192):
        """Download and extract audio from platform URL with specified bitrate"""
        temp_dir = None
        try:
            download_progress[download_id] = {
                'status': 'starting',
                'percent': 5,
                'platform': self._get_platform_name(url)
            }

            temp_dir = tempfile.mkdtemp()

            ydl_opts = self.get_audio_opts({
                'progress_hooks': [ProgressHook(download_id)],
                'outtmpl': os.path.join(temp_dir, '%(title).100s.%(ext)s'),
            }, target_bitrate=target_bitrate)
            
            download_progress[download_id] = {
                'status': 'downloading',
                'percent': 10,
                'platform': self._get_platform_name(url)
            }
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url])
            
            download_progress[download_id] = {
                'status': 'finalizing',
                'percent': 90,
                'platform': self._get_platform_name(url)
            }
            
            # Find downloaded file
            files = [f for f in os.listdir(temp_dir) if os.path.isfile(os.path.join(temp_dir, f))]
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
                        'platform': self._get_platform_name(url)
                    }
                    
                    download_progress[download_id] = {
                        'status': 'completed',
                        'percent': 100,
                        'filename': largest_file,
                        'filepath': filepath,
                        'filesize': file_size,
                        'platform': self._get_platform_name(url)
                    }
                else:
                    raise Exception("Downloaded file is empty or corrupted")
            else:
                raise Exception("No files were downloaded")
                
        except Exception as e:
            error_msg = f"Platform audio download failed: {str(e)}"
            download_progress[download_id] = {
                'status': 'error',
                'percent': 0,
                'error': error_msg,
                'platform': self._get_platform_name(url)
            }
            
            if temp_dir and os.path.exists(temp_dir):
                import shutil
                shutil.rmtree(temp_dir, ignore_errors=True)