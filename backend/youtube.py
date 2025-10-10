import yt_dlp
import time
from flask import jsonify
from utils import get_best_thumbnail, detect_audio_in_format, get_production_download_opts

class YouTubeDownloader:
    def __init__(self):
        self.platform = 'youtube'

    def get_robust_youtube_opts(self, base_opts=None, attempt=0):
        """Enhanced YouTube options for reliable extraction"""
        if base_opts is None:
            base_opts = {}

        user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
        ]

        current_ua = user_agents[attempt % len(user_agents)]

        youtube_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'socket_timeout': 120,
            'retries': 10,
            'fragment_retries': 10,
            'file_access_retries': 5,
            'extractor_retries': 10,
            'skip_unavailable_fragments': True,
            'ignoreerrors': False,
            'no_color': True,
            'user_agent': current_ua,

            # Enhanced format selection for YouTube (simplified - no merging)
            'format': 'best',
            'format_sort': ['res', 'ext:mp4:m4a', 'br', 'asr'],

            'http_chunk_size': 10485760,  # 10MB chunks
            'concurrent_fragment_downloads': 3,
            'writeinfojson': False,
            'writethumbnail': False,
            'writedescription': False,
            'writesubtitles': False,

            # YouTube-specific headers
            'http_headers': {
                'User-Agent': current_ua,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate',
                'Referer': 'https://www.youtube.com/',
            },

            # Additional options
            'geo_bypass': True,
            'age_limit': None,
            'nocheckcertificate': True,
        }

        # Merge production options to prevent blocking
        production_opts = get_production_download_opts()
        youtube_opts.update(production_opts)
        youtube_opts.update(base_opts)
        return youtube_opts

    def get_video_info(self, url):
        """Extract YouTube video information"""
        max_attempts = 3
        last_error = None

        for attempt in range(max_attempts):
            try:
                print(f"YouTube attempt {attempt + 1}/{max_attempts}")

                ydl_opts = self.get_robust_youtube_opts({
                    'noplaylist': True,
                    'extract_flat': False,
                    'no_warnings': False,
                }, attempt)

                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    print(f"Extracting info from URL: {url}")
                    info = ydl.extract_info(url, download=False)

                    if not info:
                        raise Exception('Could not extract YouTube video information')

                    duration = info.get('duration', 0)
                    print(f"YouTube extraction successful - Duration: {duration}s")

                    # Better thumbnail handling
                    thumbnail_url = get_best_thumbnail(info)

                    # Enhanced title handling
                    title = info.get('title', '') or info.get('fulltitle', '') or 'YouTube Video'

                    video_info = {
                        'title': title,
                        'duration': duration,
                        'view_count': info.get('view_count', 0),
                        'uploader': info.get('uploader', '') or info.get('channel', '') or 'Unknown',
                        'uploader_id': info.get('uploader_id', '') or info.get('channel_id', ''),
                        'thumbnail': thumbnail_url,
                        'description': (info.get('description', '')[:300] + '...') if info.get('description', '') else '',
                        'upload_date': info.get('upload_date', ''),
                        'like_count': info.get('like_count', 0),
                        'comment_count': info.get('comment_count', 0),
                        'platform': 'youtube',
                        'formats': []
                    }

                    # Process formats
                    formats = info.get('formats', [])
                    if not formats:
                        raise Exception('No formats available')

                    print(f"Found {len(formats)} formats")

                    # Separate video and audio formats
                    video_with_audio = []
                    video_only = []
                    audio_only = []

                    print(f"\n{'='*60}")
                    print(f"Total formats available: {len(formats)}")
                    print(f"{'='*60}\n")

                    # First pass - show ALL formats
                    print("ALL FORMATS (first 20):")
                    for i, fmt in enumerate(formats[:20]):
                        print(f"{i+1}. ID: {fmt.get('format_id', 'N/A')}, "
                              f"Ext: {fmt.get('ext', 'N/A')}, "
                              f"Height: {fmt.get('height', 'N/A')}p, "
                              f"VCodec: {fmt.get('vcodec', 'N/A')[:15]}, "
                              f"ACodec: {fmt.get('acodec', 'N/A')[:15]}")
                    print(f"{'='*60}\n")

                    for fmt in formats:
                        if not fmt.get('format_id'):
                            continue

                        vcodec = fmt.get('vcodec', 'none')
                        acodec = fmt.get('acodec', 'none')
                        height = fmt.get('height') or 0
                        ext = fmt.get('ext', '')
                        format_id = fmt.get('format_id', '')

                        # Accept more extensions including webm
                        if ext not in ['mp4', 'webm', 'm4a', 'mp3', 'opus', '3gpp']:
                            continue

                        # Video with audio (built-in audio)
                        if vcodec != 'none' and acodec != 'none' and height > 0:
                            print(f"  [+] Added to Video+Audio: {format_id} - {height}p")
                            video_with_audio.append(fmt)
                        # Video only (separate stream)
                        elif vcodec != 'none' and height > 0:
                            print(f"  [+] Added to Video Only: {format_id} - {height}p")
                            video_only.append(fmt)
                        # Audio only
                        elif acodec != 'none' and vcodec == 'none':
                            print(f"  [+] Added to Audio: {format_id} - {fmt.get('abr', 'unknown')}kbps")
                            audio_only.append(fmt)

                    print(f"\n{'='*60}")
                    print(f"Video+Audio count: {len(video_with_audio)}")
                    print(f"Video Only count: {len(video_only)}")
                    print(f"Audio Only count: {len(audio_only)}")
                    print(f"{'='*60}\n")

                    # Process video formats with audio
                    processed_video_with_audio = []
                    seen_qualities = set()

                    for fmt in sorted(video_with_audio, key=lambda x: x.get('height') or 0, reverse=True):
                        height = fmt.get('height') or 0
                        # Accept all qualities from 144p up to 4K (2160p)
                        if height < 144:
                            continue

                        # Skip duplicate qualities, keep only the first (highest quality) of each resolution
                        if height in seen_qualities:
                            continue
                        seen_qualities.add(height)

                        quality = f"{height}p"
                        ext = fmt.get('ext', 'mp4')

                        format_data = {
                            'quality': quality,
                            'type': 'video',
                            'format_id': fmt['format_id'],
                            'ext': ext,
                            'filesize': fmt.get('filesize', 0) or fmt.get('filesize_approx', 0) or 0,
                            'fps': fmt.get('fps', 30),
                            'width': fmt.get('width', 0),
                            'height': height,
                            'has_audio': True,
                            'has_builtin_audio': True,
                            'platform': 'youtube',
                            'duration': duration,
                            'vcodec': fmt.get('vcodec', ''),
                            'acodec': fmt.get('acodec', ''),
                            'protocol': fmt.get('protocol', 'https'),
                        }
                        processed_video_with_audio.append(format_data)
                        print(f"Added video+audio format: {quality}")

                    # Process video-only formats (will be combined with audio)
                    processed_video_only = []
                    seen_video_only = set()

                    for fmt in sorted(video_only, key=lambda x: x.get('height') or 0, reverse=True):
                        height = fmt.get('height') or 0
                        # Accept all qualities from 144p up to 4K (2160p) and beyond
                        if height < 144:
                            continue

                        # Skip duplicate qualities
                        if height in seen_video_only:
                            continue
                        seen_video_only.add(height)

                        quality = f"{height}p"
                        ext = fmt.get('ext', 'mp4')

                        format_data = {
                            'quality': quality,
                            'type': 'video',
                            'format_id': fmt['format_id'],
                            'ext': ext,
                            'filesize': fmt.get('filesize', 0) or fmt.get('filesize_approx', 0) or 0,
                            'fps': fmt.get('fps', 30),
                            'width': fmt.get('width', 0),
                            'height': height,
                            'has_audio': False,
                            'combined_with_audio': True,
                            'platform': 'youtube',
                            'duration': duration,
                            'vcodec': fmt.get('vcodec', ''),
                            'protocol': fmt.get('protocol', 'https'),
                        }
                        processed_video_only.append(format_data)
                        print(f"Added video-only format: {quality}")

                    # Process audio formats
                    processed_audio = []
                    for fmt in sorted(audio_only, key=lambda x: x.get('abr') or 0, reverse=True):
                        abr = fmt.get('abr') or 128
                        quality_level = f"{int(abr)}kbps" if abr else "128kbps"

                        format_data = {
                            'quality': quality_level,
                            'type': 'audio',
                            'format_id': fmt['format_id'],
                            'ext': fmt.get('ext', 'mp3'),
                            'filesize': fmt.get('filesize', 0) or fmt.get('filesize_approx', 0) or 0,
                            'abr': abr,
                            'asr': fmt.get('asr', 44100),
                            'platform': 'youtube',
                            'description': f"Audio ({quality_level})",
                            'acodec': fmt.get('acodec', ''),
                        }
                        processed_audio.append(format_data)

                    # Combine video formats (prioritize video with audio, then video only)
                    combined_video = processed_video_with_audio + processed_video_only

                    video_info['formats'] = {
                        'video_with_audio': processed_video_with_audio[:10],  # Increased to show more qualities
                        'video_only': processed_video_only[:10],  # Increased to show more qualities including 1080p, 1440p, 4K
                        'audio_only': processed_audio[:8]
                    }

                    print(f"\n{'='*60}")
                    print(f"FINAL RESPONSE:")
                    print(f"Video w/ Audio: {len(processed_video_with_audio)}")
                    if processed_video_with_audio:
                        for v in processed_video_with_audio[:8]:
                            print(f"  - {v['quality']} ({v['ext']})")
                    print(f"Video Only: {len(processed_video_only)}")
                    if processed_video_only:
                        for v in processed_video_only[:6]:
                            print(f"  - {v['quality']} ({v['ext']})")
                    print(f"Audio: {len(processed_audio)}")
                    if processed_audio:
                        for a in processed_audio[:8]:
                            print(f"  - {a['quality']} ({a['ext']})")
                    print(f"{'='*60}\n")

                    return jsonify(video_info)

            except yt_dlp.DownloadError as e:
                last_error = e
                error_msg = str(e).lower()
                print(f"YouTube attempt {attempt + 1} failed: {error_msg}")

                if 'private' in error_msg or 'unavailable' in error_msg or 'not found' in error_msg:
                    break

                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue
                else:
                    raise e

            except Exception as e:
                last_error = e
                print(f"YouTube attempt {attempt + 1} exception: {str(e)}")
                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue
                else:
                    raise e

        # Handle final error
        if last_error:
            error_msg = str(last_error)
            if 'private' in error_msg.lower():
                return jsonify({'error': 'This YouTube video is private.'}), 400
            elif 'unavailable' in error_msg.lower():
                return jsonify({'error': 'YouTube video unavailable or deleted.'}), 400
            elif 'age' in error_msg.lower():
                return jsonify({'error': 'This video is age-restricted. Please try another video.'}), 400
            else:
                return jsonify({'error': 'YouTube video could not be processed. Please try again.'}), 400
