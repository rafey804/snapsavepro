import yt_dlp
import time
import re
import requests
import sys
import subprocess
import tempfile
import os
from bs4 import BeautifulSoup
from flask import jsonify
from utils import get_best_thumbnail, detect_audio_in_format, get_production_download_opts

class LinkedInDownloader:
    def __init__(self):
        self.platform = 'linkedin'

    @staticmethod
    def probe_video_url(video_url):
        """Probe video URL to get actual resolution using ffprobe"""
        try:
            # Use ffprobe to get video metadata
            cmd = [
                'ffprobe',
                '-v', 'quiet',
                '-print_format', 'json',
                '-show_streams',
                '-select_streams', 'v:0',  # First video stream
                video_url
            ]

            result = subprocess.run(cmd, capture_output=True, text=True, timeout=15)

            if result.returncode == 0:
                import json
                data = json.loads(result.stdout)

                if 'streams' in data and len(data['streams']) > 0:
                    stream = data['streams'][0]
                    height = stream.get('height', 0)
                    width = stream.get('width', 0)

                    sys.stderr.write(f"[LinkedIn] Probed video: {width}x{height}\n")
                    sys.stderr.flush()

                    return {'width': width, 'height': height}
        except Exception as e:
            sys.stderr.write(f"[LinkedIn] Probe error: {str(e)}\n")
            sys.stderr.flush()

        return None

    @staticmethod
    def extract_from_webpage(url):
        """Extract video/image from LinkedIn webpage using web scraping"""
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://www.linkedin.com/',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
            }

            response = requests.get(url, headers=headers, timeout=15)
            response.raise_for_status()
            html_content = response.text

            soup = BeautifulSoup(html_content, 'html.parser')

            # Try to find video URL
            video_url = None

            # Method 1: Look for video tags
            video_tags = soup.find_all('video')
            for video_tag in video_tags:
                src = video_tag.get('src')
                if src and 'http' in src:
                    video_url = src
                    break

            # Method 2: Look for og:video meta tag
            if not video_url:
                og_video = soup.find('meta', property='og:video')
                if og_video:
                    video_url = og_video.get('content')

            # Method 3: Search in script tags for video URLs
            if not video_url:
                scripts = soup.find_all('script')
                for script in scripts:
                    if script.string:
                        # Look for video URLs in JSON data - multiple patterns
                        patterns = [
                            r'https://[^"\']+dms-playlist\.mp4[^"\']*',  # LinkedIn video playlist
                            r'https://[^"\']+\.mp4[^"\']*',  # Any .mp4
                            r'"progressiveUrl":"([^"]+)"',  # Progressive video URL
                            r'"downloadUrl":"([^"]+\.mp4[^"]*)"',  # Download URL
                        ]

                        for pattern in patterns:
                            video_matches = re.findall(pattern, script.string)
                            if video_matches:
                                video_url = video_matches[0]
                                # Clean up escaped characters
                                video_url = video_url.replace('\\/', '/').replace('\\u002F', '/')
                                print(f"[LinkedIn] Found video URL via pattern: {pattern[:50]}...")
                                break

                        if video_url:
                            break

            # Try to find image URL
            image_url = None

            # Look for og:image
            og_image = soup.find('meta', property='og:image')
            if og_image:
                image_url = og_image.get('content')

            # Look for title
            title = "LinkedIn Content"
            og_title = soup.find('meta', property='og:title')
            if og_title:
                title = og_title.get('content', title)

            # Look for description
            description = ""
            og_desc = soup.find('meta', property='og:description')
            if og_desc:
                description = og_desc.get('content', '')

            return {
                'video_url': video_url,
                'image_url': image_url,
                'title': title,
                'description': description,
            }

        except Exception as e:
            print(f"Web scraping error: {str(e)}")
            return None

    def get_robust_linkedin_opts(self, base_opts=None, attempt=0):
        """Ultra-robust LinkedIn options for video extraction"""
        if base_opts is None:
            base_opts = {}

        # Different user agents for different attempts
        user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15'
        ]

        current_ua = user_agents[attempt % len(user_agents)]

        linkedin_opts = {
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
            'http_chunk_size': 5242880,
            'concurrent_fragment_downloads': 1,

            # Enhanced headers for LinkedIn
            'http_headers': {
                'User-Agent': current_ua,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.linkedin.com/',
                'Origin': 'https://www.linkedin.com',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Cache-Control': 'max-age=0',
            },

            # Additional options for better compatibility
            'geo_bypass': True,
            'geo_bypass_country': 'US',
            'nocheckcertificate': True,
        }

        # Merge production options to prevent blocking
        production_opts = get_production_download_opts()
        linkedin_opts.update(production_opts)
        linkedin_opts.update(base_opts)
        return linkedin_opts

    def get_video_info(self, url):
        """Extract LinkedIn video information - Try yt-dlp FIRST, then web scraping"""

        # PRIORITY 1: Try yt-dlp (best for videos with stats)
        sys.stderr.write(f"[LinkedIn] Method 1: Trying yt-dlp extraction...\n")
        sys.stderr.flush()
        max_attempts = 2  # Quick tries

        for attempt in range(max_attempts):
            try:
                sys.stderr.write(f"[LinkedIn yt-dlp] Attempt {attempt + 1}/{max_attempts}\n")
                sys.stderr.flush()

                ydl_opts = self.get_robust_linkedin_opts({
                    'noplaylist': True,
                    'extract_flat': False,
                }, attempt)

                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(url, download=False)

                    if info and info.get('formats'):
                        sys.stderr.write(f"[LinkedIn] yt-dlp SUCCESS! Processing formats...\n")
                        sys.stderr.flush()

                        duration = info.get('duration', 0)
                        thumbnail_url = get_best_thumbnail(info)

                        title = info.get('title', '') or info.get('fulltitle', '') or 'LinkedIn Video'
                        if not title or title == 'NA':
                            uploader = info.get('uploader', '') or info.get('creator', '') or info.get('uploader_id', '')
                            title = f"{uploader} - LinkedIn Video" if uploader else "LinkedIn Video"

                        video_info = {
                            'title': title,
                            'duration': duration,
                            'view_count': info.get('view_count', 0),
                            'uploader': info.get('uploader', '') or info.get('creator', '') or info.get('uploader_id', 'LinkedIn User'),
                            'thumbnail': thumbnail_url,
                            'description': (info.get('description', '')[:200] + '...') if info.get('description', '') else '',
                            'upload_date': info.get('upload_date', ''),
                            'like_count': info.get('like_count', 0),
                            'comment_count': info.get('comment_count', 0),
                            'platform': 'linkedin',
                            'content_type': 'video'
                        }

                        # Process formats
                        formats = info.get('formats', [])
                        sys.stderr.write(f"[LinkedIn] Found {len(formats)} total formats from yt-dlp\n")
                        sys.stderr.flush()

                        video_formats = []
                        audio_formats = []

                        for fmt in formats:
                            if not fmt.get('format_id'):
                                continue

                            vcodec = fmt.get('vcodec', 'none')
                            acodec = fmt.get('acodec', 'none')
                            height = fmt.get('height') or 0
                            width = fmt.get('width') or 0
                            ext = fmt.get('ext', '')
                            tbr = fmt.get('tbr', 0)  # Total bitrate
                            filesize = fmt.get('filesize', 0)

                            # Check if format has URL
                            has_url = bool(fmt.get('url'))
                            sys.stderr.write(f"[LinkedIn] Format: {fmt.get('format_id')} - ext:{ext}, vcodec:{vcodec}, acodec:{acodec}, height:{height}, width:{width}, tbr:{tbr}, filesize:{filesize}, has_url:{has_url}\n")
                            sys.stderr.flush()

                            # Accept more video extensions for LinkedIn
                            if ext and ext not in ['mp4', 'm4a', 'webm', 'mov', 'avi', 'flv', 'mkv', 'ts', 'm3u8']:
                                sys.stderr.write(f"[LinkedIn] Skipping format due to extension: {ext}\n")
                                sys.stderr.flush()
                                continue

                            # For LinkedIn: Accept formats with URLs even if codec info is missing
                            # LinkedIn often doesn't provide codec details upfront
                            if vcodec != 'none' and height > 0:
                                video_formats.append(fmt)
                            elif acodec != 'none':
                                audio_formats.append(fmt)
                            elif ext == 'mp4' and has_url:
                                # LinkedIn MP4 format without codec info - treat as video
                                sys.stderr.write(f"[LinkedIn] Accepting MP4 format without codec info (has URL)\n")
                                sys.stderr.flush()
                                video_formats.append(fmt)

                        # Process video formats
                        processed_video = []
                        for idx, fmt in enumerate(sorted(video_formats, key=lambda x: x.get('height') or 0, reverse=True)):
                            height = fmt.get('height') or 0

                            # For LinkedIn formats without height, probe the actual video
                            if height == 0:
                                format_id_str = str(fmt.get('format_id', idx))
                                tbr = fmt.get('tbr', 0) or 0
                                filesize = fmt.get('filesize', 0) or 0
                                width = fmt.get('width', 0) or 0

                                # Try to probe actual video URL to get real resolution
                                video_url = fmt.get('url')
                                if video_url and idx == 0:  # Only probe first format to save time
                                    sys.stderr.write(f"[LinkedIn] Probing video URL for format {format_id_str}...\n")
                                    sys.stderr.flush()
                                    probe_result = self.probe_video_url(video_url)
                                    if probe_result:
                                        width = probe_result.get('width', 0)
                                        height = probe_result.get('height', 0)
                                        sys.stderr.write(f"[LinkedIn] Probe SUCCESS: {width}x{height}\n")
                                        sys.stderr.flush()

                                # Check if probe gave us height
                                if height > 0:
                                    quality = f"{height}p"
                                    sys.stderr.write(f"[LinkedIn] Using probed height: {quality}\n")
                                    sys.stderr.flush()
                                # If still no height after probe, estimate quality from bitrate (kbps)
                                elif tbr > 0:
                                    if tbr >= 3000:  # High bitrate = 1080p or higher
                                        quality = '1080p'
                                        height = 1080
                                    elif tbr >= 1500:  # Medium-high bitrate = 720p
                                        quality = '720p'
                                        height = 720
                                    elif tbr >= 800:  # Medium bitrate = 480p
                                        quality = '480p'
                                        height = 480
                                    else:  # Low bitrate = 360p
                                        quality = '360p'
                                        height = 360
                                    sys.stderr.write(f"[LinkedIn] Format {format_id_str} - Estimated quality from bitrate {tbr}kbps: {quality}\n")
                                # Try to estimate from width
                                elif width > 0:
                                    if width >= 1920:
                                        quality = '1080p'
                                        height = 1080
                                    elif width >= 1280:
                                        quality = '720p'
                                        height = 720
                                    elif width >= 854:
                                        quality = '480p'
                                        height = 480
                                    else:
                                        quality = '360p'
                                        height = 360
                                    sys.stderr.write(f"[LinkedIn] Format {format_id_str} - Estimated quality from width {width}: {quality}\n")
                                # Fallback: use format_id or filesize
                                else:
                                    if format_id_str == '0' or (filesize > 0 and idx == 0):
                                        quality = '720p (HD)'
                                        height = 720
                                    elif format_id_str == '1' or (filesize > 0 and idx == 1):
                                        quality = '480p (SD)'
                                        height = 480
                                    else:
                                        quality = f'360p (Quality {idx + 1})'
                                        height = 360
                                    sys.stderr.write(f"[LinkedIn] Format {format_id_str} - Using default quality estimate: {quality}\n")

                                sys.stderr.flush()
                            elif height < 144:
                                continue
                            else:
                                quality = f"{height}p"

                            ext = fmt.get('ext', 'mp4')
                            has_audio = detect_audio_in_format(fmt)

                            format_data = {
                                'quality': quality,
                                'type': 'video',
                                'format_id': fmt['format_id'],
                                'ext': ext,
                                'filesize': fmt.get('filesize', 0),
                                'fps': fmt.get('fps', 30),
                                'width': fmt.get('width', 0),
                                'height': height,
                                'has_audio': has_audio,
                                'platform': 'linkedin',
                                'duration': duration,
                                'audio_description': 'With Audio' if has_audio else 'Video Only'
                            }
                            processed_video.append(format_data)

                        # Process audio formats
                        processed_audio = []
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
                                'platform': 'linkedin',
                                'description': f"Audio ({quality_level})"
                            }
                            processed_audio.append(format_data)

                        # Add audio extraction from video if no audio formats
                        if processed_video and not processed_audio:
                            for fmt in processed_video[:2]:
                                if fmt.get('has_audio'):
                                    original_filesize = fmt.get('filesize', 0) or 0
                                    estimated_audio_size = max(original_filesize // 10, 500000) if original_filesize > 0 else 500000

                                    audio_format = {
                                        'quality': f"{fmt['quality']} Audio",
                                        'type': 'audio',
                                        'format_id': fmt['format_id'],
                                        'ext': 'mp3',
                                        'filesize': estimated_audio_size,
                                        'abr': 192,
                                        'platform': 'linkedin',
                                        'description': f"Audio extracted from {fmt['quality']} video",
                                        'source': 'video'
                                    }
                                    processed_audio.append(audio_format)

                        video_info['formats'] = {
                            'video_formats': processed_video[:8],
                            'audio_formats': processed_audio[:6],
                            'image_formats': []
                        }

                        sys.stderr.write(f"[LinkedIn] yt-dlp SUCCESS - Video: {len(processed_video)}, Audio: {len(processed_audio)}\n")
                        sys.stderr.flush()
                        return jsonify(video_info)

            except Exception as e:
                sys.stderr.write(f"[LinkedIn yt-dlp] Attempt {attempt + 1} failed: {str(e)}\n")
                sys.stderr.flush()
                if attempt < max_attempts - 1:
                    time.sleep(1)
                    continue

        # PRIORITY 2: Fallback to web scraping (for images/simple posts)
        sys.stderr.write(f"[LinkedIn] Method 2: Trying web scraping fallback...\n")
        sys.stderr.flush()
        scraped_data = self.extract_from_webpage(url)

        if scraped_data and (scraped_data.get('video_url') or scraped_data.get('image_url')):
            sys.stderr.write(f"[LinkedIn] Web scraping found content!\n")
            sys.stderr.write(f"[LinkedIn] Video URL: {scraped_data.get('video_url', 'None')}\n")
            sys.stderr.write(f"[LinkedIn] Image URL: {scraped_data.get('image_url', 'None')}\n")
            sys.stderr.flush()

            video_formats = []
            audio_formats = []
            image_formats = []
            content_type = 'image'

            if scraped_data.get('video_url'):
                content_type = 'video'
                video_formats.append({
                    'quality': 'Original',
                    'type': 'video',
                    'format_id': 'scraped_video',
                    'ext': 'mp4',
                    'filesize': 0,
                    'platform': 'linkedin',
                    'has_audio': True,
                    'duration': 0,
                    'direct_url': scraped_data['video_url'],
                    'audio_description': 'With Audio'
                })

                audio_formats.append({
                    'quality': 'Original Audio',
                    'type': 'audio',
                    'format_id': 'scraped_video',
                    'ext': 'mp3',
                    'filesize': 0,
                    'abr': 192,
                    'platform': 'linkedin',
                    'description': 'Audio extracted from video',
                    'source': 'video'
                })

            elif scraped_data.get('image_url'):
                content_type = 'image'
                image_formats.append({
                    'quality': 'Original',
                    'type': 'image',
                    'format_id': 'scraped_image',
                    'url': scraped_data['image_url'],
                    'ext': 'jpg',
                    'filesize': 0,
                    'platform': 'linkedin',
                    'description': 'LinkedIn Image'
                })

            return jsonify({
                'title': scraped_data.get('title', 'LinkedIn Content'),
                'duration': 0,
                'view_count': 0,
                'uploader': 'LinkedIn User',
                'thumbnail': scraped_data.get('image_url', ''),
                'description': scraped_data.get('description', ''),
                'upload_date': '',
                'like_count': 0,
                'comment_count': 0,
                'platform': 'linkedin',
                'content_type': content_type,
                'formats': {
                    'video_formats': video_formats,
                    'audio_formats': audio_formats,
                    'image_formats': image_formats
                }
            })

        # FINAL: Both methods failed
        return jsonify({'error': 'LinkedIn video could not be processed. Please ensure the post contains a video and is publicly accessible.'}), 400
