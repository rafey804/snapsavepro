import yt_dlp
import re
from typing import Dict, Any, List
import requests
from bs4 import BeautifulSoup

class PinterestDownloader:
    def __init__(self):
        print("=== PINTEREST MODULE LOADED - WITH VIDEO & IMAGE SUPPORT ===")

        self.ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'socket_timeout': 30,
            'http_headers': {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Referer': 'https://www.pinterest.com/',
                'Origin': 'https://www.pinterest.com',
            },
            'extractor_args': {
                'pinterest': {
                    'api_key': None,
                }
            }
        }

    def extract_pinterest_id(self, url: str) -> str:
        """Extract Pinterest pin ID from URL"""
        patterns = [
            r'pin/(\d+)',
            r'/pin/([a-zA-Z0-9_-]+)',
        ]

        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        return None

    def scrape_pinterest_content(self, url: str) -> Dict[str, Any]:
        """Scrape Pinterest content using BeautifulSoup"""
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Referer': 'https://www.pinterest.com/',
                'Cookie': '_pinterest_sess=TWc9PSZHamJOeGJUcVQ4eFhvQ3ZJY3NmZ0lCOUh5',
            }

            response = requests.get(url, headers=headers, timeout=15, allow_redirects=True)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, 'html.parser')

            # Try to find video URL from script tags (Pinterest stores video URLs in JSON)
            video_url = None
            import json

            # Method 1: Look for video URLs in script tags
            scripts = soup.find_all('script', type='application/ld+json')
            for script in scripts:
                try:
                    data = json.loads(script.string)
                    if isinstance(data, dict) and 'video' in data:
                        video_url = data['video'].get('contentUrl') or data['video'].get('url')
                        if video_url:
                            break
                except:
                    pass

            # Method 2: Look for video tags
            if not video_url:
                video_tags = soup.find_all('video')
                if video_tags:
                    for video in video_tags:
                        source = video.find('source')
                        if source and source.get('src'):
                            video_url = source.get('src')
                            break
                        # Check video tag src directly
                        if video.get('src'):
                            video_url = video.get('src')
                            break

            # Method 3: Look for og:video meta tag
            if not video_url:
                og_video = soup.find('meta', property='og:video')
                if og_video:
                    video_url = og_video.get('content')

                # Also check og:video:secure_url
                if not video_url:
                    og_video_secure = soup.find('meta', property='og:video:secure_url')
                    if og_video_secure:
                        video_url = og_video_secure.get('content')

            # Try to find image
            image_url = None
            og_image = soup.find('meta', property='og:image')
            if og_image:
                image_url = og_image.get('content')

            # Try to find title
            title = "Pinterest Content"
            og_title = soup.find('meta', property='og:title')
            if og_title:
                title = og_title.get('content', title)

            # Try to find description
            description = ""
            og_desc = soup.find('meta', property='og:description')
            if og_desc:
                description = og_desc.get('content', description)

            return {
                'video_url': video_url,
                'image_url': image_url,
                'title': title,
                'description': description,
            }

        except Exception as e:
            print(f"Pinterest scraping error: {e}")
            return None

    def get_video_info(self, url: str) -> Dict[str, Any]:
        """Get Pinterest video/image information"""
        try:
            print(f"\n{'='*50}")
            print(f"Pinterest extraction starting for: {url}")

            # Try yt-dlp first
            try:
                with yt_dlp.YoutubeDL(self.ydl_opts) as ydl:
                    info = ydl.extract_info(url, download=False)

                    if info:
                        return self._format_yt_dlp_response(info)
            except Exception as e:
                print(f"yt-dlp extraction failed: {e}")

            # Fallback to web scraping
            scraped_data = self.scrape_pinterest_content(url)
            if scraped_data:
                return self._format_scraped_response(scraped_data, url)

            raise Exception("Could not extract Pinterest content. The pin may be private or deleted.")

        except Exception as e:
            print(f"Pinterest extraction error: {e}")
            raise Exception(f"Failed to extract Pinterest content: {str(e)}")

    def _format_yt_dlp_response(self, info: Dict) -> Dict[str, Any]:
        """Format yt-dlp response"""
        title = info.get('title', 'Pinterest Content')
        description = info.get('description', '')
        thumbnail = info.get('thumbnail', '')
        duration = info.get('duration', 0)

        # Determine content type
        has_video = False
        formats = info.get('formats', [])
        for fmt in formats:
            if fmt.get('vcodec') != 'none':
                has_video = True
                break

        content_type = 'video' if has_video else 'image'

        video_formats = []
        image_formats = []

        if has_video:
            # Extract video formats
            seen_formats = set()
            for fmt in formats:
                if fmt.get('vcodec') != 'none' and fmt.get('url'):
                    format_id = fmt.get('format_id', 'unknown')
                    if format_id in seen_formats:
                        continue
                    seen_formats.add(format_id)

                    height = fmt.get('height', 0)
                    width = fmt.get('width', 0)
                    quality = f"{height}p" if height else "Unknown"

                    video_formats.append({
                        'format_id': format_id,
                        'url': fmt.get('url'),
                        'quality': quality,
                        'ext': fmt.get('ext', 'mp4'),
                        'filesize': fmt.get('filesize') or 0,
                        'has_audio': fmt.get('acodec') != 'none',
                        'width': width,
                        'height': height,
                    })

            # Sort by quality
            video_formats.sort(key=lambda x: x['height'], reverse=True)
        else:
            # Extract image
            if thumbnail:
                image_formats.append({
                    'format_id': 'image_original',
                    'url': thumbnail,
                    'quality': 'Original',
                    'description': 'Original Image',
                    'type': 'image',
                    'ext': 'jpg',
                    'filesize': 0,
                })

        print(f"Pinterest success - Videos: {len(video_formats)}, Images: {len(image_formats)}")

        return {
            'success': True,
            'title': title,
            'description': description,
            'thumbnail': thumbnail,
            'duration': duration,
            'content_type': content_type,
            'formats': {
                'video_formats': video_formats,
                'image_formats': image_formats,
            }
        }

    def _format_scraped_response(self, data: Dict, url: str) -> Dict[str, Any]:
        """Format scraped response"""
        video_formats = []
        image_formats = []

        content_type = 'video' if data.get('video_url') else 'image'

        if data.get('video_url'):
            video_formats.append({
                'format_id': 'video_hd',
                'url': data['video_url'],
                'quality': 'HD',
                'ext': 'mp4',
                'filesize': 0,
                'has_audio': True,
                'width': 0,
                'height': 0,
            })

        if data.get('image_url'):
            image_formats.append({
                'format_id': 'image_original',
                'url': data['image_url'],
                'quality': 'Original',
                'description': 'Original Image',
                'type': 'image',
                'ext': 'jpg',
                'filesize': 0,
            })

        print(f"Pinterest scraped - Videos: {len(video_formats)}, Images: {len(image_formats)}")

        return {
            'success': True,
            'title': data.get('title', 'Pinterest Content'),
            'description': data.get('description', ''),
            'thumbnail': data.get('image_url', ''),
            'duration': 0,
            'content_type': content_type,
            'formats': {
                'video_formats': video_formats,
                'image_formats': image_formats,
            }
        }

# Initialize and test
print("PinterestDownloader initialized with video and image extraction support")
