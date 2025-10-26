import yt_dlp
import re
import logging
import os

logger = logging.getLogger(__name__)

class ShortsDownloader:
    def get_robust_shorts_opts(self, base_opts=None, attempt=0):
        """Robust YouTube Shorts download options"""
        if base_opts is None:
            base_opts = {}

        shorts_opts = {
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
            'format_sort': ['res', 'ext:mp4:m4a'],
            'format_sort_force': True,
            'prefer_free_formats': False,
            'http_headers': {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-us,en;q=0.5',
                'Sec-Fetch-Mode': 'navigate'
            },
            'overwrites': True,
            'continuedl': True,
            'noprogress': False,
            'noplaylist': True,
            'age_limit': None,
            'geo_bypass': True,
            'nocheckcertificate': True,
        }

        # Merge with base_opts
        shorts_opts.update(base_opts)
        return shorts_opts

    @staticmethod
    def extract_video_id(url):
        """Extract video ID from YouTube Shorts URL"""
        patterns = [
            r'(?:https?://)?(?:www\.)?youtube\.com/shorts/([A-Za-z0-9_-]{11})',
            r'(?:https?://)?(?:www\.)?youtube\.com/watch\?v=([A-Za-z0-9_-]{11})',
            r'(?:https?://)?(?:www\.)?youtu\.be/([A-Za-z0-9_-]{11})',
        ]

        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        return None

    @staticmethod
    def get_video_info(url):
        """
        Extract YouTube Shorts video information using yt-dlp
        """
        try:
            video_id = ShortsDownloader.extract_video_id(url)
            if not video_id:
                raise Exception("Invalid YouTube Shorts URL. Please provide a valid YouTube Shorts link.")

            logger.info(f"Processing YouTube Shorts video ID: {video_id}")

            ydl_opts = {
                'quiet': True,
                'no_warnings': True,
                'extract_flat': False,
                'socket_timeout': 30,
            }

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)

            if not info:
                raise Exception("Could not retrieve video information")

            # Extract video formats
            formats = info.get('formats', [])
            video_formats = []
            audio_formats = []

            # Process video formats
            for fmt in formats:
                format_id = fmt.get('format_id', '')
                ext = fmt.get('ext', 'mp4')
                vcodec = fmt.get('vcodec', 'none')
                acodec = fmt.get('acodec', 'none')
                filesize = fmt.get('filesize') or fmt.get('filesize_approx', 0)
                width = fmt.get('width', 0)
                height = fmt.get('height', 0)
                fps = fmt.get('fps', 30)
                tbr = fmt.get('tbr', 0)

                # Video formats (has video codec)
                if vcodec and vcodec != 'none' and height > 0:
                    quality_label = f"{height}p"
                    if fps > 30:
                        quality_label += f"{fps}"

                    has_audio = acodec and acodec != 'none'

                    video_formats.append({
                        'quality': quality_label,
                        'type': 'video',
                        'format_id': format_id,
                        'ext': ext,
                        'filesize': filesize,
                        'width': width,
                        'height': height,
                        'fps': fps,
                        'has_audio': has_audio,
                        'watermark_free': True,
                    })

                # Audio formats (has audio codec, no video)
                elif acodec and acodec != 'none' and (not vcodec or vcodec == 'none'):
                    abr = fmt.get('abr', 0)
                    quality_label = f"{int(abr)}kbps" if abr else "Audio"

                    audio_formats.append({
                        'quality': quality_label,
                        'type': 'audio',
                        'format_id': format_id,
                        'ext': ext,
                        'filesize': filesize,
                        'abr': abr,
                    })

            # Sort video formats by height (descending)
            video_formats.sort(key=lambda x: (x.get('height', 0), x.get('fps', 0)), reverse=True)

            # Sort audio formats by bitrate (descending)
            audio_formats.sort(key=lambda x: x.get('abr', 0), reverse=True)

            # Remove duplicates
            seen_video = set()
            unique_video_formats = []
            for fmt in video_formats:
                key = (fmt['quality'], fmt['has_audio'])
                if key not in seen_video:
                    seen_video.add(key)
                    unique_video_formats.append(fmt)

            seen_audio = set()
            unique_audio_formats = []
            for fmt in audio_formats:
                key = fmt['quality']
                if key not in seen_audio:
                    seen_audio.add(key)
                    unique_audio_formats.append(fmt)

            # Get thumbnail
            thumbnail = info.get('thumbnail', '')
            thumbnails = info.get('thumbnails', [])
            if thumbnails:
                # Get highest quality thumbnail
                best_thumbnail = max(thumbnails, key=lambda t: (t.get('width', 0) * t.get('height', 0)))
                thumbnail = best_thumbnail.get('url', thumbnail)

            logger.info(f"Successfully extracted YouTube Shorts: {info.get('title', '')[:50]}")

            return {
                'title': info.get('title', 'YouTube Short'),
                'thumbnail': thumbnail,
                'duration': info.get('duration', 0),
                'uploader': info.get('uploader', info.get('channel', 'Unknown')),
                'view_count': info.get('view_count', 0),
                'like_count': info.get('like_count', 0),
                'comment_count': info.get('comment_count', 0),
                'description': info.get('description', '')[:500],
                'upload_date': info.get('upload_date', ''),
                'formats': {
                    'video_formats': unique_video_formats[:10],  # Limit to top 10
                    'audio_formats': unique_audio_formats[:5],   # Limit to top 5
                }
            }

        except Exception as e:
            logger.error(f"YouTube Shorts download error: {str(e)}")
            raise Exception(f"YouTube Shorts download failed: {str(e)}")

    @staticmethod
    def download_video(url, format_id='best', output_path='downloads'):
        """
        Download YouTube Shorts video
        """
        try:
            video_info = ShortsDownloader.get_video_info(url)

            os.makedirs(output_path, exist_ok=True)

            safe_title = re.sub(r'[^\w\s-]', '', video_info['title'])[:50]
            filename = f"{safe_title}.mp4"
            output_file = os.path.join(output_path, filename)

            ydl_opts = {
                'format': f'{format_id}/best',
                'outtmpl': output_file,
                'quiet': True,
                'no_warnings': True,
            }

            logger.info(f"Downloading YouTube Short to: {output_file}")

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url])

            logger.info(f"Successfully downloaded: {output_file}")
            return output_file

        except Exception as e:
            logger.error(f"Download failed: {str(e)}")
            raise Exception(f"Download failed: {str(e)}")
