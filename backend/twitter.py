import yt_dlp
import time
import requests
import re
from flask import jsonify
from utils import get_best_thumbnail, detect_audio_in_format, get_production_download_opts

print("=== TWITTER MODULE LOADED - VERSION 2.0 WITH IMAGE SUPPORT ===")

class TwitterDownloader:
    def __init__(self):
        self.platform = 'twitter'
        print("TwitterDownloader initialized with image extraction support")

    def extract_images_from_url(self, url):
        """Extract images from Twitter post using web scraping"""
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
            # Twitter uses pbs.twimg.com for images
            image_patterns = [
                r'https?://pbs\.twimg\.com/media/[^"\'?]+\.(?:jpg|jpeg|png|webp)(?:\?[^"\']*)?',
                r'https?://pbs\.twimg\.com/media/[^"\'?]+',
            ]

            image_urls = set()
            for pattern in image_patterns:
                matches = re.findall(pattern, html_content)
                for match in matches:
                    # Clean up URL and get original quality
                    clean_url = match.split('?')[0]
                    # Add ?name=orig to get original quality
                    orig_url = f"{clean_url}?name=orig"
                    large_url = f"{clean_url}?name=large"
                    image_urls.add(orig_url)
                    image_urls.add(large_url)

            print(f"Found {len(image_urls)} image URLs in Twitter post")
            return list(image_urls)

        except Exception as e:
            print(f"Error extracting images from Twitter URL: {str(e)}")
            return []

    def get_robust_twitter_opts(self, base_opts=None, attempt=0):
        """Robust Twitter/X download options with multiple fallback strategies"""
        if base_opts is None:
            base_opts = {}

        # Different user agents for rotation
        user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
        ]

        current_ua = user_agents[attempt % len(user_agents)]

        twitter_opts = {
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
            'format_sort': ['res', 'ext:mp4:m4a', 'vcodec:h264'],
            'format_sort_force': True,
            'http_chunk_size': 10485760,  # 10MB chunks
            'concurrent_fragment_downloads': 2,

            # Enhanced headers for Twitter/X
            'http_headers': {
                'User-Agent': current_ua,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://twitter.com/',
                'Origin': 'https://twitter.com',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'DNT': '1',
            },

            # Geo bypass
            'geo_bypass': True,
            'geo_bypass_country': 'US',

            # Additional compatibility options
            'prefer_insecure': False,
            'nocheckcertificate': False,
        }

        # Merge production options
        production_opts = get_production_download_opts()
        twitter_opts.update(production_opts)
        twitter_opts.update(base_opts)
        return twitter_opts

    def get_video_info(self, url):
        """Extract Twitter/X video information with robust error handling"""
        max_attempts = 4
        last_error = None

        for attempt in range(max_attempts):
            try:
                print(f"Twitter extraction attempt {attempt + 1}/{max_attempts}")

                ydl_opts = self.get_robust_twitter_opts({
                    'noplaylist': True,
                    'extract_flat': False,
                }, attempt)

                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(url, download=False)

                    if not info:
                        raise Exception('Could not extract Twitter media information')

                    # Check if this is a photo/image post
                    is_photo_post = False
                    media_type = info.get('_type', '')

                    # Check for images in thumbnails or entries
                    thumbnails = info.get('thumbnails', [])
                    entries = info.get('entries', [])

                    duration = info.get('duration', 0)

                    # If no duration and has thumbnails, likely a photo post
                    if duration == 0 or duration is None:
                        if thumbnails or entries or '/photo/' in url:
                            is_photo_post = True
                            print(f"Twitter photo post detected")

                    if not is_photo_post:
                        print(f"Twitter video extraction successful - Duration: {duration}s")

                    # Better thumbnail handling
                    thumbnail_url = get_best_thumbnail(info)

                    # Enhanced title handling
                    title = info.get('title', '') or info.get('fulltitle', '') or 'Twitter Video'
                    if not title or title == 'NA' or len(title) < 3:
                        uploader = info.get('uploader', '') or info.get('creator', '') or info.get('uploader_id', '')
                        title = f"Twitter Video by {uploader}" if uploader else "Twitter Video"

                    # Get uploader info
                    uploader = info.get('uploader', '') or info.get('creator', '') or info.get('uploader_id', 'Twitter User')
                    uploader_id = info.get('uploader_id', '')

                    # Extract engagement metrics with multiple fallback fields
                    view_count = info.get('view_count') or info.get('views') or 0
                    like_count = info.get('like_count') or info.get('likes') or info.get('favorite_count') or 0
                    retweet_count = info.get('repost_count') or info.get('retweet_count') or info.get('retweets') or 0
                    reply_count = info.get('comment_count') or info.get('reply_count') or info.get('replies') or 0

                    # Log extracted metadata for debugging
                    print(f"Twitter metadata - Views: {view_count}, Likes: {like_count}, Retweets: {retweet_count}, Replies: {reply_count}")

                    video_info = {
                        'title': title[:200],  # Limit title length
                        'duration': duration,
                        'view_count': view_count if view_count else 0,
                        'uploader': uploader,
                        'uploader_id': uploader_id,
                        'thumbnail': thumbnail_url,
                        'description': (info.get('description', '')[:200] + '...') if info.get('description', '') else title,
                        'upload_date': info.get('upload_date', ''),
                        'like_count': like_count if like_count else 0,
                        'repost_count': retweet_count if retweet_count else 0,
                        'comment_count': reply_count if reply_count else 0,
                        'platform': 'twitter',
                        'formats': []
                    }

                    # Handle photo posts separately
                    if is_photo_post:
                        # Extract image URLs from thumbnails
                        image_formats = []

                        # Get all thumbnails/images
                        all_thumbnails = info.get('thumbnails', [])

                        # Sort by resolution (largest first)
                        sorted_thumbnails = sorted(
                            all_thumbnails,
                            key=lambda x: (x.get('width', 0) or 0) * (x.get('height', 0) or 0),
                            reverse=True
                        )

                        # Process image formats
                        for idx, thumb in enumerate(sorted_thumbnails[:10]):  # Max 10 images
                            url = thumb.get('url')
                            if not url:
                                continue

                            width = thumb.get('width', 0)
                            height = thumb.get('height', 0)
                            filesize = thumb.get('filesize', 0)

                            # Skip very small images (likely icons)
                            if width and height and (width < 200 or height < 200):
                                continue

                            quality = f"{width}x{height}" if width and height else "Original"

                            image_format = {
                                'quality': quality,
                                'type': 'image',
                                'format_id': f"image_{idx}",
                                'ext': 'jpg',
                                'filesize': filesize,
                                'width': width,
                                'height': height,
                                'url': url,
                                'platform': 'twitter',
                                'description': f"Image {idx + 1}"
                            }
                            image_formats.append(image_format)

                        if not image_formats:
                            raise Exception('No images found in this Twitter post')

                        video_info['formats'] = {
                            'video_formats': [],
                            'audio_formats': [],
                            'image_formats': image_formats
                        }
                        video_info['content_type'] = 'image'
                        video_info['duration'] = 0

                        print(f"Twitter photo post success - {len(image_formats)} images found")
                        return jsonify(video_info)

                    # Process video formats with better audio detection
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

                        # Quality label
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
                            'platform': 'twitter',
                            'watermark_free': True,
                            'duration': duration,
                            'audio_description': 'With Audio' if has_audio else 'Video Only',
                            'quality_label': quality_label,
                            'bitrate': fmt.get('tbr', 0),
                            'codec': fmt.get('vcodec', 'h264'),
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
                            'platform': 'twitter',
                            'description': f"Audio ({quality_level})"
                        }
                        processed_audio.append(format_data)

                    # Audio extraction from video if no direct audio available
                    if processed_video and not processed_audio:
                        for fmt in processed_video[:2]:  # Top 2 video qualities
                            if fmt.get('has_audio'):
                                original_filesize = fmt.get('filesize', 0) or 0
                                estimated_audio_size = max(original_filesize // 10, 500000) if original_filesize > 0 else 500000

                                # Create unique format_id for each bitrate
                                bitrates = [192, 128] if len(processed_audio) < 2 else [192]
                                for abr in bitrates:
                                    unique_format_id = f"{fmt['format_id']}_audio_{abr}kbps"
                                    audio_format = {
                                        'quality': f"MP3 {abr}kbps",
                                        'type': 'audio',
                                        'format_id': unique_format_id,
                                        'ext': 'mp3',
                                        'filesize': estimated_audio_size,
                                        'abr': abr,
                                        'platform': 'twitter',
                                        'description': f"Audio extracted ({abr}kbps)",
                                        'source': 'video',
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

                    print(f"Twitter success - Video: {len(processed_video)}, Audio: {len(processed_audio)}")
                    return jsonify(video_info)

            except yt_dlp.DownloadError as e:
                print(f"=== CAUGHT DownloadError ===")
                last_error = e
                error_msg = str(e).lower()
                print(f"Twitter attempt {attempt + 1} failed: {error_msg}")
                print(f"Checking for image post... 'not a video' in error: {'not a video' in error_msg}")

                # For "not a video" errors, try to extract images using web scraping
                if 'not a video' in error_msg or 'media #' in error_msg:
                    print("Detected photo post, trying image extraction...")
                    image_urls = self.extract_images_from_url(url)

                    if image_urls:
                        # Create image formats
                        image_formats = []
                        for idx, img_url in enumerate(image_urls[:10]):  # Max 10 images
                            quality = "Original" if "orig" in img_url else "Large"
                            image_format = {
                                'quality': quality,
                                'type': 'image',
                                'format_id': f"image_{idx}",
                                'ext': 'jpg',
                                'filesize': 0,
                                'url': img_url,
                                'platform': 'twitter',
                                'description': f"Image {idx + 1} - {quality}"
                            }
                            image_formats.append(image_format)

                        # Create response for image post
                        image_info = {
                            'title': 'Twitter Photo Post',
                            'duration': 0,
                            'view_count': 0,
                            'uploader': 'Twitter User',
                            'thumbnail': image_urls[0] if image_urls else '',
                            'description': 'Twitter photo/image post',
                            'upload_date': '',
                            'like_count': 0,
                            'repost_count': 0,
                            'comment_count': 0,
                            'platform': 'twitter',
                            'content_type': 'image',
                            'formats': {
                                'video_formats': [],
                                'audio_formats': [],
                                'image_formats': image_formats
                            }
                        }

                        print(f"Twitter photo post success - {len(image_formats)} images found")
                        return jsonify(image_info)

                    # If we still can't extract images, return error
                    return jsonify({'error': 'This Twitter/X post contains images but they could not be extracted. Please try a different post.'}), 400

                if 'private' in error_msg or 'unavailable' in error_msg or 'not found' in error_msg:
                    break

                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue
                else:
                    raise e

            except Exception as e:
                last_error = e
                print(f"Twitter attempt {attempt + 1} exception: {str(e)}")
                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue
                else:
                    raise e

        # Handle final error
        if last_error:
            error_msg = str(last_error).lower()
            if 'private' in error_msg:
                return jsonify({'error': 'This Twitter post is private or protected.'}), 400
            elif 'unavailable' in error_msg or 'not found' in error_msg:
                return jsonify({'error': 'Twitter video unavailable or deleted.'}), 400
            elif 'login' in error_msg or 'authenticate' in error_msg:
                return jsonify({'error': 'This Twitter content requires authentication.'}), 400
            else:
                return jsonify({'error': 'Twitter video could not be processed. Please try again.'}), 400

        return jsonify({'error': 'Failed to extract Twitter video after multiple attempts.'}), 400
