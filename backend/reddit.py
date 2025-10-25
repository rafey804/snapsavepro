import yt_dlp
import time
import requests
import re
from flask import jsonify
from utils import get_best_thumbnail, detect_audio_in_format, get_production_download_opts

print("=== REDDIT MODULE LOADED - WITH VIDEO, IMAGE & POST SUPPORT ===")

class RedditDownloader:
    def __init__(self):
        self.platform = 'reddit'
        print("RedditDownloader initialized with video, image and post extraction support")

    def extract_images_from_url(self, url):
        """Extract images from Reddit post using web scraping"""
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
            }

            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            html_content = response.text

            # Extract image URLs from HTML using regex patterns
            # Reddit uses i.redd.it and preview.redd.it for images
            image_patterns = [
                r'https?://i\.redd\.it/[^"\'?\s]+\.(?:jpg|jpeg|png|webp|gif)',
                r'https?://preview\.redd\.it/[^"\'?\s]+\.(?:jpg|jpeg|png|webp|gif)',
                r'https?://external-preview\.redd\.it/[^"\'?\s]+\.(?:jpg|jpeg|png|webp)',
            ]

            image_urls = set()
            for pattern in image_patterns:
                matches = re.findall(pattern, html_content)
                for match in matches:
                    # Clean up URL
                    clean_url = match.split('?')[0]
                    image_urls.add(clean_url)

            print(f"Found {len(image_urls)} image URLs in Reddit post")
            return list(image_urls)

        except Exception as e:
            print(f"Error extracting images from Reddit URL: {str(e)}")
            return []

    def get_robust_reddit_opts(self, base_opts=None, attempt=0):
        """Robust Reddit download options with multiple fallback strategies"""
        if base_opts is None:
            base_opts = {}

        # Different user agents for rotation
        user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        ]

        current_ua = user_agents[attempt % len(user_agents)]

        reddit_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'socket_timeout': 60,
            'retries': 3,
            'fragment_retries': 3,
            'file_access_retries': 2,
            'extractor_retries': 3,
            'skip_unavailable_fragments': True,
            'ignoreerrors': False,
            'no_color': True,
            'user_agent': current_ua,
            'format_sort': ['res', 'ext:mp4:m4a', 'vcodec:h264'],
            'format_sort_force': True,
            'http_chunk_size': 10485760,  # 10MB chunks
            'concurrent_fragment_downloads': 1,
            'sleep_interval': 2,
            'max_sleep_interval': 5,
            'sleep_interval_requests': 1,

            # Enhanced headers for Reddit with rate limit bypass
            'http_headers': {
                'User-Agent': current_ua,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.reddit.com/',
                'Origin': 'https://www.reddit.com',
                'DNT': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Cache-Control': 'max-age=0',
            },

            # Geo bypass
            'geo_bypass': True,
            'geo_bypass_country': 'US',
        }

        # Merge production options
        production_opts = get_production_download_opts()
        reddit_opts.update(production_opts)
        reddit_opts.update(base_opts)
        return reddit_opts

    def get_video_info(self, url):
        """Extract Reddit video/image information with robust error handling"""
        max_attempts = 2  # Reduced attempts to speed up fallback
        last_error = None

        # First, try direct image scraping (faster and avoids rate limits)
        print(f"[Reddit] Starting extraction for: {url}")
        print("[Reddit] Attempting direct image extraction...")

        try:
            image_urls = self.extract_images_from_url(url)
            print(f"[Reddit] Scraping found {len(image_urls)} images")

            if image_urls:
                print(f"[Reddit] Success! Building response with {len(image_urls)} images")
                image_formats = []
                for idx, img_url in enumerate(image_urls[:10]):
                    image_format = {
                        'quality': 'Original',
                        'type': 'image',
                        'format_id': f"image_{idx}",
                        'ext': 'jpg',
                        'filesize': 0,
                        'url': img_url,
                        'platform': 'reddit',
                        'description': f"Image {idx + 1}"
                    }
                    image_formats.append(image_format)

                image_info = {
                    'title': 'Reddit Post',
                    'duration': 0,
                    'view_count': 0,
                    'uploader': 'Reddit User',
                    'thumbnail': image_urls[0] if image_urls else '',
                    'description': 'Reddit post content',
                    'upload_date': '',
                    'like_count': 0,
                    'comment_count': 0,
                    'platform': 'reddit',
                    'content_type': 'image',
                    'formats': {
                        'video_formats': [],
                        'audio_formats': [],
                        'image_formats': image_formats
                    }
                }
                print(f"[Reddit] Returning image response with {len(image_formats)} formats")
                return jsonify(image_info)
        except Exception as scraping_error:
            print(f"[Reddit] Image scraping failed: {str(scraping_error)}")

        # If no images found via scraping, try yt-dlp for videos
        for attempt in range(max_attempts):
            try:
                print(f"Reddit yt-dlp attempt {attempt + 1}/{max_attempts}")

                ydl_opts = self.get_robust_reddit_opts({
                    'noplaylist': True,
                    'extract_flat': False,
                }, attempt)

                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(url, download=False)

                    if not info:
                        raise Exception('Could not extract Reddit media information')

                    # Check if this is an image post
                    is_image_post = False
                    duration = info.get('duration', 0)

                    # If no duration, likely an image post
                    if duration == 0 or duration is None:
                        is_image_post = True
                        print(f"Reddit image post detected")
                    else:
                        print(f"Reddit video extraction successful - Duration: {duration}s")

                    # Better thumbnail handling
                    thumbnail_url = get_best_thumbnail(info)

                    # Enhanced title handling
                    title = info.get('title', '') or info.get('fulltitle', '') or 'Reddit Post'
                    if not title or title == 'NA' or len(title) < 3:
                        uploader = info.get('uploader', '') or info.get('creator', '')
                        title = f"Reddit Post by {uploader}" if uploader else "Reddit Post"

                    # Get uploader info
                    uploader = info.get('uploader', '') or info.get('creator', '') or info.get('uploader_id', 'Reddit User')
                    uploader_id = info.get('uploader_id', '')

                    # Extract engagement metrics
                    view_count = info.get('view_count') or info.get('views') or 0
                    like_count = info.get('like_count') or info.get('likes') or info.get('upvote_ratio', 0)
                    comment_count = info.get('comment_count') or info.get('comments') or 0

                    # Log extracted metadata
                    print(f"Reddit metadata - Views: {view_count}, Likes: {like_count}, Comments: {comment_count}")

                    video_info = {
                        'title': title[:200],
                        'duration': duration if not is_image_post else 0,
                        'view_count': view_count if view_count else 0,
                        'uploader': uploader,
                        'uploader_id': uploader_id,
                        'thumbnail': thumbnail_url,
                        'description': (info.get('description', '')[:200] + '...') if info.get('description', '') else title,
                        'upload_date': info.get('upload_date', ''),
                        'like_count': like_count if like_count else 0,
                        'comment_count': comment_count if comment_count else 0,
                        'platform': 'reddit',
                        'formats': []
                    }

                    # Handle image posts
                    if is_image_post:
                        print("Attempting to extract images from Reddit post...")
                        image_urls = self.extract_images_from_url(url)

                        if image_urls:
                            image_formats = []
                            for idx, img_url in enumerate(image_urls[:10]):
                                image_format = {
                                    'quality': 'Original',
                                    'type': 'image',
                                    'format_id': f"image_{idx}",
                                    'ext': 'jpg',
                                    'filesize': 0,
                                    'url': img_url,
                                    'platform': 'reddit',
                                    'description': f"Image {idx + 1}"
                                }
                                image_formats.append(image_format)

                            video_info['formats'] = {
                                'video_formats': [],
                                'audio_formats': [],
                                'image_formats': image_formats
                            }
                            video_info['content_type'] = 'image'

                            print(f"Reddit image post success - {len(image_formats)} images found")
                            return jsonify(video_info)

                    # Process video formats
                    video_info['content_type'] = 'video'
                    formats = info.get('formats', [])
                    if not formats:
                        raise Exception('No formats available')

                    video_formats = []
                    audio_formats = []

                    for fmt in formats:
                        if not fmt.get('format_id'):
                            continue

                        vcodec = fmt.get('vcodec', 'none')
                        acodec = fmt.get('acodec', 'none')
                        height = fmt.get('height') or 0
                        ext = fmt.get('ext', '')

                        if ext not in ['mp4', 'm4a', 'webm', 'mov']:
                            continue

                        if vcodec != 'none' and height > 0:
                            video_formats.append(fmt)
                        elif acodec != 'none':
                            audio_formats.append(fmt)

                    # Process video formats
                    processed_video = []
                    for fmt in sorted(video_formats, key=lambda x: x.get('height') or 0, reverse=True):
                        height = fmt.get('height') or 0
                        if height < 144:
                            continue

                        quality = f"{height}p"
                        ext = fmt.get('ext', 'mp4')
                        has_audio = detect_audio_in_format(fmt)

                        quality_label = quality
                        if height >= 1080:
                            quality_label = f"FHD {quality}"
                        elif height >= 720:
                            quality_label = f"HD {quality}"
                        elif height >= 480:
                            quality_label = f"SD {quality}"

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
                            'platform': 'reddit',
                            'duration': duration,
                            'quality_label': quality_label,
                        }
                        processed_video.append(format_data)

                    # Process audio formats
                    processed_audio = []

                    # Audio extraction from video if no direct audio
                    if processed_video and not processed_audio:
                        for fmt in processed_video[:2]:
                            if fmt.get('has_audio'):
                                bitrates = [192, 128]
                                for abr in bitrates:
                                    unique_format_id = f"{fmt['format_id']}_audio_{abr}kbps"
                                    audio_format = {
                                        'quality': f"MP3 {abr}kbps",
                                        'type': 'audio',
                                        'format_id': unique_format_id,
                                        'ext': 'mp3',
                                        'filesize': (fmt.get('filesize') or 0) // 10 if fmt.get('filesize') else 0,
                                        'abr': abr,
                                        'platform': 'reddit',
                                        'description': f"Audio extracted ({abr}kbps)",
                                        'original_format_id': fmt['format_id']
                                    }
                                    processed_audio.append(audio_format)
                                    if len(processed_audio) >= 3:
                                        break
                            if len(processed_audio) >= 3:
                                break

                    video_info['formats'] = {
                        'video_formats': processed_video[:8],
                        'audio_formats': processed_audio[:6]
                    }

                    print(f"Reddit success - Video: {len(processed_video)}, Audio: {len(processed_audio)}")
                    return jsonify(video_info)

            except yt_dlp.DownloadError as e:
                print(f"=== CAUGHT Reddit DownloadError ===")
                last_error = e
                error_msg = str(e).lower()
                print(f"Reddit attempt {attempt + 1} failed: {error_msg}")

                # Handle 429 rate limit - immediately fall back to scraping
                if '429' in error_msg or 'too many requests' in error_msg or 'rate limit' in error_msg:
                    print("Reddit rate limit detected (429) - falling back to image scraping...")
                    image_urls = self.extract_images_from_url(url)

                    if image_urls:
                        image_formats = []
                        for idx, img_url in enumerate(image_urls[:10]):
                            image_format = {
                                'quality': 'Original',
                                'type': 'image',
                                'format_id': f"image_{idx}",
                                'ext': 'jpg',
                                'filesize': 0,
                                'url': img_url,
                                'platform': 'reddit',
                                'description': f"Image {idx + 1}"
                            }
                            image_formats.append(image_format)

                        image_info = {
                            'title': 'Reddit Post',
                            'duration': 0,
                            'view_count': 0,
                            'uploader': 'Reddit User',
                            'thumbnail': image_urls[0] if image_urls else '',
                            'description': 'Reddit content',
                            'upload_date': '',
                            'like_count': 0,
                            'comment_count': 0,
                            'platform': 'reddit',
                            'content_type': 'image',
                            'formats': {
                                'video_formats': [],
                                'audio_formats': [],
                                'image_formats': image_formats
                            }
                        }
                        print(f"Reddit fallback success - {len(image_formats)} images extracted")
                        return jsonify(image_info)

                # Try to extract images if video fails
                if 'no video' in error_msg or 'no formats' in error_msg:
                    print("Attempting image extraction from Reddit post...")
                    image_urls = self.extract_images_from_url(url)

                    if image_urls:
                        image_formats = []
                        for idx, img_url in enumerate(image_urls[:10]):
                            image_format = {
                                'quality': 'Original',
                                'type': 'image',
                                'format_id': f"image_{idx}",
                                'ext': 'jpg',
                                'filesize': 0,
                                'url': img_url,
                                'platform': 'reddit',
                                'description': f"Image {idx + 1}"
                            }
                            image_formats.append(image_format)

                        image_info = {
                            'title': 'Reddit Image Post',
                            'duration': 0,
                            'view_count': 0,
                            'uploader': 'Reddit User',
                            'thumbnail': image_urls[0] if image_urls else '',
                            'description': 'Reddit image post',
                            'upload_date': '',
                            'like_count': 0,
                            'comment_count': 0,
                            'platform': 'reddit',
                            'content_type': 'image',
                            'formats': {
                                'video_formats': [],
                                'audio_formats': [],
                                'image_formats': image_formats
                            }
                        }

                        print(f"Reddit image post success - {len(image_formats)} images found")
                        return jsonify(image_info)

                if 'private' in error_msg or 'removed' in error_msg:
                    return jsonify({'error': 'This Reddit post is private, deleted or removed.'}), 400

                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue
                else:
                    raise e

            except Exception as e:
                last_error = e
                print(f"Reddit attempt {attempt + 1} exception: {str(e)}")
                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue
                else:
                    raise e

        # Handle final error
        if last_error:
            error_msg = str(last_error).lower()
            if 'private' in error_msg or 'removed' in error_msg:
                return jsonify({'error': 'This Reddit post is private, deleted or removed.'}), 400
            else:
                return jsonify({'error': 'Reddit post could not be processed. Please try again.'}), 400

        return jsonify({'error': 'Failed to extract Reddit content after multiple attempts.'}), 400
