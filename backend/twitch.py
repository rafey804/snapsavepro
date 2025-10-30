import yt_dlp
import time
from flask import jsonify
from utils import get_best_thumbnail, detect_audio_in_format, get_production_download_opts

class TwitchDownloader:
    def __init__(self):
        self.platform = 'twitch'

    def get_robust_twitch_opts(self, base_opts=None, attempt=0):
        """Robust Twitch options for clip and VOD downloads"""
        if base_opts is None:
            base_opts = {}

        user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        ]

        current_ua = user_agents[attempt % len(user_agents)]

        twitch_opts = {
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
            'http_chunk_size': 10485760,  # 10MB chunks
            'concurrent_fragment_downloads': 3,

            # Enhanced headers for Twitch
            'http_headers': {
                'User-Agent': current_ua,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.twitch.tv/',
                'Origin': 'https://www.twitch.tv',
                'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko',  # Public Twitch client ID
            },

            # Additional options for better compatibility
            'geo_bypass': True,
            'nocheckcertificate': True,
        }

        # Merge with base options
        twitch_opts.update(base_opts)
        return twitch_opts

    def get_video_info(self, url):
        """Get Twitch clip/video information with multiple retry attempts"""
        max_attempts = 4
        last_error = None

        for attempt in range(max_attempts):
            try:
                # Wait between retries
                if attempt > 0:
                    time.sleep(2 * attempt)

                opts = self.get_robust_twitch_opts(attempt=attempt)

                with yt_dlp.YoutubeDL(opts) as ydl:
                    info = ydl.extract_info(url, download=False)

                    if not info:
                        raise Exception("Failed to extract video information")

                    import sys
                    sys.stdout.flush()
                    sys.stderr.flush()

                    # Get all available formats
                    formats = info.get('formats', [])

                    if not formats:
                        raise Exception("No formats available for this video")

                    print(f"DEBUG: Found {len(formats)} raw formats from yt-dlp")

                    # Process formats for better presentation
                    processed_formats = []
                    seen_qualities = set()

                    for fmt in formats:
                        # Get codec info
                        vcodec = fmt.get('vcodec')
                        acodec = fmt.get('acodec')

                        # For Twitch clips, yt-dlp returns None (not 'none' string) for codecs
                        # But formats still have height/width/fps info, so check for those
                        has_video_info = fmt.get('height') or fmt.get('width') or fmt.get('fps')

                        # Skip only if we have no codec info AND no video dimensions
                        if not has_video_info and (vcodec is None or vcodec == 'none') and (acodec is None or acodec == 'none'):
                            print(f"Skipping format {fmt.get('format_id')}: no valid codecs or dimensions")
                            continue

                        # Determine if it's video or audio format
                        # If we have video dimensions, it's a video format even if codec is None
                        if has_video_info:
                            is_video = True
                            is_audio = False
                            # Set default codecs for Twitch when None
                            if vcodec is None or vcodec == 'none':
                                vcodec = 'h264'
                            if acodec is None or acodec == 'none':
                                acodec = 'aac'
                        else:
                            is_video = vcodec and vcodec not in ('none', None)
                            is_audio = acodec and acodec not in ('none', None)

                        # Get quality information
                        height = fmt.get('height', 0)
                        fps = fmt.get('fps', 0)

                        # Create quality label
                        if is_video and height:
                            quality = f"{height}p{fps}" if fps else f"{height}p"
                        elif is_audio:
                            quality = "Audio Only"
                        else:
                            quality = fmt.get('format_note', 'Unknown')

                        # Skip duplicate qualities
                        quality_key = f"{quality}_{vcodec}_{acodec}"
                        if quality_key in seen_qualities:
                            continue
                        seen_qualities.add(quality_key)

                        # Calculate file size estimate
                        filesize = fmt.get('filesize') or fmt.get('filesize_approx', 0)

                        processed_format = {
                            'format_id': fmt.get('format_id'),
                            'ext': fmt.get('ext', 'mp4'),
                            'quality': quality,
                            'filesize': filesize,
                            'vcodec': vcodec if vcodec != 'none' else None,
                            'acodec': acodec if acodec != 'none' else None,
                            'resolution': f"{fmt.get('width', 0)}x{height}" if height else None,
                            'fps': fps if fps else None,
                            'video_bitrate': fmt.get('vbr'),
                            'audio_bitrate': fmt.get('abr'),
                        }

                        processed_formats.append(processed_format)

                    # Sort formats: video first (by resolution desc), then audio
                    def format_sort_key(fmt):
                        if fmt.get('vcodec'):
                            # Video formats - sort by height descending
                            height = 0
                            if fmt.get('resolution'):
                                try:
                                    height = int(fmt['resolution'].split('x')[1])
                                except:
                                    pass
                            return (0, -height)  # 0 for video, negative height for desc sort
                        else:
                            # Audio formats
                            return (1, 0)  # 1 for audio

                    processed_formats.sort(key=format_sort_key)

                    print(f"DEBUG: Processed {len(processed_formats)} formats after filtering")
                    for fmt in processed_formats[:5]:  # Print first 5 formats
                        print(f"  - Quality: {fmt['quality']}, vcodec: {fmt['vcodec']}, acodec: {fmt['acodec']}")

                    # Get thumbnail
                    thumbnail = get_best_thumbnail(info)

                    # Prepare response
                    video_info = {
                        'title': info.get('title', 'Twitch Clip'),
                        'thumbnail': thumbnail,
                        'duration': info.get('duration', 0),
                        'uploader': info.get('uploader') or info.get('creator') or info.get('channel') or 'Unknown',
                        'view_count': info.get('view_count'),
                        'like_count': info.get('like_count'),
                        'upload_date': info.get('upload_date'),
                        'description': info.get('description', ''),
                        'formats': processed_formats,
                        'platform': 'twitch'
                    }

                    return jsonify(video_info), 200

            except Exception as e:
                last_error = str(e)
                print(f"Twitch download attempt {attempt + 1} failed: {last_error}")

                if attempt == max_attempts - 1:
                    # Last attempt failed
                    error_message = f"Failed to fetch Twitch clip after {max_attempts} attempts"
                    if "Video unavailable" in last_error or "Private video" in last_error:
                        error_message = "This Twitch clip is unavailable or private"
                    elif "not available" in last_error.lower():
                        error_message = "This Twitch clip is not available in your region"

                    return jsonify({'error': error_message}), 400

        return jsonify({'error': 'Failed to process Twitch clip'}), 500
