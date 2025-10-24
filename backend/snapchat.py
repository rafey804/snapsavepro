import yt_dlp
import time
from flask import jsonify
from utils import get_best_thumbnail, detect_audio_in_format, get_production_download_opts

class SnapchatDownloader:
    def __init__(self):
        self.platform = 'snapchat'

    def get_robust_snapchat_opts(self, base_opts=None, attempt=0):
        """Advanced Snapchat download options with multiple fallback strategies"""
        if base_opts is None:
            base_opts = {}

        # Multiple user agents for rotation
        user_agents = [
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Linux; Android 12; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        ]

        current_ua = user_agents[attempt % len(user_agents)]

        snapchat_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'socket_timeout': 60,
            'retries': 6,
            'fragment_retries': 6,
            'file_access_retries': 4,
            'extractor_retries': 6,
            'skip_unavailable_fragments': True,
            'ignoreerrors': False,
            'no_color': True,
            'user_agent': current_ua,
            'format_sort': ['res', 'ext:mp4:m4a', 'vcodec:h264'],
            'format_sort_force': True,
            'http_chunk_size': 10485760,  # 10MB chunks for faster downloads
            'concurrent_fragment_downloads': 3,  # Allow concurrent downloads

            # Enhanced headers for Snapchat
            'http_headers': {
                'User-Agent': current_ua,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.snapchat.com/',
                'Origin': 'https://www.snapchat.com',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'DNT': '1',
            },

            # Snapchat-specific extractor arguments
            'extractor_args': {
                'snapchat': {
                    'stories': True,
                    'spotlight': True,
                }
            },

            # Geo and bypass options
            'geo_bypass': True,
            'geo_bypass_country': 'US',

            # Additional compatibility options
            'prefer_insecure': False,
            'nocheckcertificate': False,
        }

        # Merge production options
        production_opts = get_production_download_opts()
        snapchat_opts.update(production_opts)
        snapchat_opts.update(base_opts)
        return snapchat_opts

    def get_video_info(self, url):
        """Extract Snapchat video/story/spotlight information with advanced error handling"""
        max_attempts = 5
        last_error = None

        for attempt in range(max_attempts):
            try:
                print(f"Snapchat extraction attempt {attempt + 1}/{max_attempts}")

                ydl_opts = self.get_robust_snapchat_opts({
                    'noplaylist': True,
                    'extract_flat': False,
                    'verbose': True,  # Enable verbose logging for debugging
                }, attempt)

                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    print(f"Attempting to extract Snapchat URL: {url}")
                    info = ydl.extract_info(url, download=False)
                    print(f"Extraction completed. Info keys: {list(info.keys()) if info else 'None'}")

                    if not info:
                        raise Exception('Could not extract Snapchat video information')

                    duration = info.get('duration', 0)
                    print(f"Snapchat extraction successful - Duration: {duration}s")

                    # Enhanced thumbnail handling
                    thumbnail_url = get_best_thumbnail(info)

                    # Better title handling for Snapchat and extract metadata from title
                    raw_title = info.get('title', '') or info.get('fulltitle', '') or 'Snapchat Video'
                    view_count = info.get('view_count', 0)
                    like_count = info.get('like_count', 0)

                    # Parse Snapchat's title format: "52.8 لاکھ views. 17.6 کھرب shares. Spotlight by username..."
                    import re
                    if raw_title and ('views' in raw_title.lower() or 'shares' in raw_title.lower()):
                        # Extract views (supports formats like "52.8M", "52.8 لاکھ", "1.5K")
                        view_match = re.search(r'([\d.]+)\s*([MKمیںلاکھہزارکروڑکھرب]*)\s*views', raw_title, re.IGNORECASE)
                        if view_match:
                            num, unit = view_match.groups()
                            num = float(num)
                            # Convert to actual numbers
                            if 'M' in unit or 'لاکھ' in unit:
                                view_count = int(num * 100000)  # لاکھ = 100,000 (lakh)
                            elif 'K' in unit or 'ہزار' in unit:
                                view_count = int(num * 1000)
                            elif 'کروڑ' in unit or 'کھرب' in unit:
                                like_count = int(num * 1000)  # This is actually shares, use as likes
                            else:
                                view_count = int(num)

                        # Extract shares (use as like_count)
                        share_match = re.search(r'([\d.]+)\s*([MKمیںلاکھہزارکروڑکھرب]*)\s*shares', raw_title, re.IGNORECASE)
                        if share_match:
                            num, unit = share_match.groups()
                            num = float(num)
                            if 'M' in unit or 'لاکھ' in unit:
                                like_count = int(num * 100000)
                            elif 'K' in unit or 'ہزار' in unit or 'کھرب' in unit:
                                like_count = int(num * 1000)
                            elif 'کروڑ' in unit:
                                like_count = int(num * 10000000)
                            else:
                                like_count = int(num)

                        # Extract actual title after the metadata
                        title_match = re.search(r'(?:Spotlight|Story|Post)\s+by\s+\w+\s+from.*?\|\s*(.+)', raw_title)
                        if title_match:
                            title = title_match.group(1).strip()
                        else:
                            # Fallback: take everything after the last "|"
                            parts = raw_title.split('|')
                            if len(parts) > 1:
                                title = parts[-1].strip()
                            else:
                                title = raw_title
                    else:
                        title = raw_title

                    # Extract uploader from URL or title
                    uploader = info.get('uploader', '') or info.get('creator', '') or info.get('uploader_id', '')
                    if not uploader:
                        # Try to extract from URL: @username
                        url_match = re.search(r'@([\w.-]+)', url)
                        if url_match:
                            uploader = url_match.group(1)

                    if not title or title == 'NA' or len(title) < 3:
                        content_type = 'Spotlight' if 'spotlight' in url.lower() else 'Story' if 'story' in url.lower() else 'Video'
                        title = f"Snapchat {content_type}" + (f" by {uploader}" if uploader else "")

                    # Get description
                    description = info.get('description', '')
                    if not description or len(description) < 10:
                        description = title  # Use title as description if no description available

                    video_info = {
                        'title': title[:200],  # Limit title length
                        'duration': duration,
                        'view_count': view_count,
                        'uploader': uploader or 'Snapchat User',
                        'uploader_id': info.get('uploader_id', uploader),
                        'thumbnail': thumbnail_url,
                        'description': (description[:200] + '...') if len(description) > 200 else description,
                        'upload_date': info.get('upload_date', ''),
                        'like_count': like_count,
                        'comment_count': info.get('comment_count', 0),
                        'platform': 'snapchat',
                        'content_type': 'spotlight' if 'spotlight' in url.lower() else 'story' if 'story' in url.lower() else 'post',
                        'formats': []
                    }

                    # Process formats
                    formats = info.get('formats', [])
                    print(f"Raw formats from yt-dlp: {len(formats) if formats else 0}")
                    if formats:
                        print(f"Sample format: {formats[0] if formats else 'None'}")

                    # Check if we have a direct URL instead of formats
                    if not formats and info.get('url'):
                        print("No formats array, but found direct URL - creating format entry")
                        formats = [{
                            'format_id': 'best',
                            'url': info.get('url'),
                            'ext': info.get('ext', 'mp4'),
                            'height': info.get('height', 720),
                            'width': info.get('width', 1280),
                            'vcodec': info.get('vcodec', 'h264'),
                            'acodec': info.get('acodec', 'aac'),
                            'filesize': info.get('filesize', 0),
                            'fps': info.get('fps', 30),
                        }]

                    if not formats:
                        print("No formats available for this Snapchat content")
                        print(f"Available info keys: {list(info.keys())}")
                        print(f"Info structure: {info}")

                        # Try to get requested_formats which might be available
                        requested_formats = info.get('requested_formats', [])
                        if requested_formats:
                            print(f"Found requested_formats: {len(requested_formats)}")
                            formats = requested_formats
                        else:
                            # Last resort: check if there's an entries field (for playlists/spotlights)
                            entries = info.get('entries', [])
                            if entries and len(entries) > 0:
                                print(f"Found entries: {len(entries)}, extracting first entry")
                                first_entry = entries[0]
                                if isinstance(first_entry, dict) and first_entry.get('url'):
                                    formats = [{
                                        'format_id': 'best',
                                        'url': first_entry.get('url'),
                                        'ext': first_entry.get('ext', 'mp4'),
                                        'height': first_entry.get('height', 720),
                                        'width': first_entry.get('width', 1280),
                                        'vcodec': first_entry.get('vcodec', 'h264'),
                                        'acodec': first_entry.get('acodec', 'aac'),
                                    }]
                                else:
                                    video_info['formats'] = {
                                        'video_formats': [],
                                        'audio_formats': []
                                    }
                                    return jsonify(video_info)
                            else:
                                video_info['formats'] = {
                                    'video_formats': [],
                                    'audio_formats': []
                                }
                                return jsonify(video_info)

                    video_formats = []
                    audio_formats = []

                    # Categorize formats
                    print(f"Processing {len(formats)} formats...")
                    for i, fmt in enumerate(formats):
                        print(f"Format {i}: {fmt.get('format_id', 'no-id')} - {fmt.get('ext', 'no-ext')} - {fmt.get('vcodec', 'none')} - {fmt.get('height', 0)}p")

                        if not fmt.get('format_id'):
                            print(f"  Skipping format {i}: no format_id")
                            continue

                        vcodec = fmt.get('vcodec', 'none')
                        acodec = fmt.get('acodec', 'none')
                        height = fmt.get('height') or 0
                        ext = fmt.get('ext', '')

                        if ext not in ['mp4', 'm4a', 'webm', 'mov']:
                            print(f"  Skipping format {i}: unsupported extension {ext}")
                            continue

                        # For Snapchat, if height is 0/null but ext is video format, assume it's a video
                        # yt-dlp uses "generic" extractor for Snapchat which doesn't set height
                        is_video_ext = ext in ['mp4', 'webm', 'mov']
                        has_video_codec = vcodec != 'none' and vcodec is not None

                        # Accept video formats even if height is unknown (for Snapchat generic extractor)
                        if is_video_ext and (has_video_codec or (vcodec is None and acodec == 'none')):
                            # Assume 720p for Snapchat if height is not provided
                            if height == 0:
                                height = 720
                                fmt['height'] = height
                                fmt['width'] = fmt.get('width') or 1280
                            # For Snapchat, assume video has audio unless explicitly stated otherwise
                            if acodec == 'none' and fmt.get('audio_ext') != 'none':
                                fmt['acodec'] = 'aac'  # Assume AAC audio
                            print(f"  Adding video format: {height}p {ext} (audio: {fmt.get('acodec', 'unknown')})")
                            video_formats.append(fmt)
                        elif acodec != 'none':
                            print(f"  Adding audio format: {ext}")
                            audio_formats.append(fmt)
                        else:
                            print(f"  Skipping format {i}: no video or audio codec")
                    
                    print(f"Final counts - Video: {len(video_formats)}, Audio: {len(audio_formats)}")

                    # Process video formats
                    processed_video = []
                    for fmt in sorted(video_formats, key=lambda x: x.get('height') or 0, reverse=True):
                        height = fmt.get('height') or 0
                        if height < 144:
                            continue

                        quality = f"{height}p"
                        ext = fmt.get('ext', 'mp4')

                        # For Snapchat, check if format has audio
                        # Since acodec might be 'none' but audio_ext is not 'none', check both
                        has_audio = detect_audio_in_format(fmt)
                        if not has_audio and ext == 'mp4':
                            # Snapchat MP4s typically have audio, assume true if not explicitly none
                            has_audio = True

                        # Enhanced quality detection
                        quality_label = quality
                        if height >= 1080:
                            quality_label = f"FHD {quality}"
                        elif height >= 720:
                            quality_label = f"HD {quality}"
                        elif height >= 480:
                            quality_label = f"SD {quality}"
                        
                        # Better file size estimation if not available
                        estimated_size = fmt.get('filesize', 0)
                        if not estimated_size and height > 0:
                            # Rough estimation based on resolution and duration
                            width = fmt.get('width', height * 16 // 9)  # Assume 16:9 if width not available
                            base_size = height * width * duration * 0.1  # Rough calculation
                            estimated_size = int(base_size)

                        format_data = {
                            'quality': quality,
                            'type': 'video',
                            'format_id': fmt['format_id'],
                            'ext': ext,
                            'filesize': estimated_size,
                            'fps': fmt.get('fps', 30),
                            'width': fmt.get('width', 0),
                            'height': height,
                            'has_audio': has_audio,
                            'platform': 'snapchat',
                            'watermark_free': True,
                            'duration': duration,
                            'audio_description': 'With Audio' if has_audio else 'Video Only',
                            'quality_label': quality_label,
                            'bitrate': fmt.get('tbr', 0) or fmt.get('abr', 0),
                            'codec': fmt.get('vcodec', 'h264'),
                            'resolution': f"{fmt.get('width', 0)}x{height}"
                        }
                        processed_video.append(format_data)

                    # Process audio formats
                    processed_audio = []

                    # Direct audio formats
                    for fmt in sorted(audio_formats, key=lambda x: x.get('abr') or 0, reverse=True):
                        abr = fmt.get('abr') or 128
                        quality_level = f"{int(abr)}kbps" if abr else "128kbps"

                        format_data = {
                            'quality': quality_level,
                            'type': 'audio',
                            'format_id': fmt['format_id'],
                            'ext': 'mp3',
                            'filesize': fmt.get('filesize', 0),
                            'abr': abr,
                            'platform': 'snapchat',
                            'description': f"Audio ({quality_level})"
                        }
                        processed_audio.append(format_data)

                    # Audio extraction from video if no direct audio available
                    # For Snapchat, always create audio formats from video since there are no separate audio streams
                    if processed_video and not processed_audio:
                        print("Creating audio formats from video formats...")
                        for fmt in processed_video[:3]:  # Create audio options from top 3 video qualities
                            # Snapchat MP4s always have audio
                            original_filesize = fmt.get('filesize', 0) or 0
                            estimated_audio_size = max(original_filesize // 10, 500000) if original_filesize > 0 else 500000

                            # Create multiple bitrate options
                            bitrates = [192, 128] if len(processed_audio) < 2 else [192]
                            for abr in bitrates:
                                # Create unique format_id for each bitrate to prevent duplicate downloads
                                unique_format_id = f"{fmt['format_id']}_audio_{abr}kbps"
                                audio_format = {
                                    'quality': f"MP3 {abr}kbps",
                                    'type': 'audio',
                                    'format_id': unique_format_id,  # Unique ID per bitrate
                                    'ext': 'mp3',
                                    'filesize': estimated_audio_size,
                                    'abr': abr,
                                    'platform': 'snapchat',
                                    'description': f"Audio extracted ({abr}kbps)",
                                    'source': 'video',
                                    'original_format_id': fmt['format_id']  # Store original for download
                                }
                                processed_audio.append(audio_format)
                                if len(processed_audio) >= 3:  # Limit to 3 audio formats
                                    break
                            if len(processed_audio) >= 3:
                                break
                        print(f"Created {len(processed_audio)} audio formats from video")

                    video_info['formats'] = {
                        'video_formats': processed_video[:8],
                        'audio_formats': processed_audio[:6]
                    }

                    print(f"Snapchat success - Video: {len(processed_video)}, Audio: {len(processed_audio)}")
                    return jsonify(video_info)

            except yt_dlp.DownloadError as e:
                last_error = e
                error_msg = str(e).lower()
                print(f"Snapchat attempt {attempt + 1} failed: {error_msg}")

                if 'private' in error_msg or 'unavailable' in error_msg or 'not found' in error_msg:
                    break

                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue
                else:
                    raise e

            except Exception as e:
                last_error = e
                print(f"Snapchat attempt {attempt + 1} exception: {str(e)}")
                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue
                else:
                    raise e

        # Handle final error with user-friendly messages
        if last_error:
            error_msg = str(last_error).lower()
            if 'private' in error_msg:
                return jsonify({'error': 'This Snapchat content is private or requires login.'}), 400
            elif 'unavailable' in error_msg or 'not found' in error_msg:
                return jsonify({'error': 'Snapchat content unavailable or deleted.'}), 400
            elif 'signature' in error_msg or 'token' in error_msg:
                return jsonify({'error': 'Snapchat verification error. Please try again in a few minutes.'}), 400
            elif 'geo' in error_msg or 'region' in error_msg:
                return jsonify({'error': 'This Snapchat content is not available in your region.'}), 400
            else:
                return jsonify({'error': 'Could not process Snapchat content. Please check the URL and try again.'}), 400

        return jsonify({'error': 'Failed to extract Snapchat content after multiple attempts.'}), 400
