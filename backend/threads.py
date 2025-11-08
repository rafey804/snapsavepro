import json
import time
from typing import Dict
import jmespath
from parsel import Selector
from nested_lookup import nested_lookup
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError
from flask import jsonify
import requests
from urllib.parse import urlparse

class ThreadsDownloader:
    def __init__(self):
        self.platform = 'threads'

    def get_robust_threads_opts(self, base_opts=None):
        """Dummy method for compatibility with download_worker (Threads uses direct downloads)"""
        if base_opts is None:
            base_opts = {}
        return base_opts

    def parse_thread(self, data: Dict) -> Dict:
        """Extract key fields from Threads post JSON"""
        try:
            result = jmespath.search(
                """{
                text: post.caption.text,
                published_on: post.taken_at,
                id: post.id,
                pk: post.pk,
                code: post.code,
                username: post.user.username,
                user_pic: post.user.profile_pic_url,
                user_verified: post.user.is_verified,
                user_pk: post.user.pk,
                user_id: post.user.id,
                has_audio: post.has_audio,
                reply_count: view_replies_cta_string,
                like_count: post.like_count,
                images: post.carousel_media[].image_versions2.candidates[1].url,
                image_count: post.carousel_media_count,
                videos: post.video_versions[].url,
                video_width: post.original_width,
                video_height: post.original_height,
                video_duration: post.video_duration
            }""",
                data,
            )

            # Clean up video URLs - remove duplicates
            result["videos"] = list(set(result["videos"] or []))

            # Parse reply count
            if result["reply_count"] and type(result["reply_count"]) != int:
                try:
                    result["reply_count"] = int(result["reply_count"].split(" ")[0])
                except:
                    result["reply_count"] = 0

            # Build post URL
            if result.get('username') and result.get('code'):
                result["url"] = f"https://www.threads.net/@{result['username']}/post/{result['code']}"

            return result
        except Exception as e:
            print(f"Error parsing thread data: {repr(e)}")
            return {}

    def scrape_thread_data(self, url: str) -> dict:
        """Extract post data from a Threads URL using Playwright"""
        max_attempts = 3
        last_error = None

        for attempt in range(max_attempts):
            try:
                print(f"Threads scraping attempt {attempt + 1}/{max_attempts}")

                with sync_playwright() as pw:
                    # Launch browser in headless mode
                    browser = pw.chromium.launch(headless=True)

                    # Create context with realistic viewport and user agent
                    context = browser.new_context(
                        viewport={"width": 1920, "height": 1080},
                        user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
                    )

                    page = context.new_page()

                    # Navigate to the URL with timeout
                    page.goto(url, wait_until='domcontentloaded', timeout=30000)

                    # Wait for content to load
                    page.wait_for_selector("[data-pressable-container=true]", timeout=15000)

                    # Get page content
                    content = page.content()
                    selector = Selector(content)

                    # Extract hidden JSON datasets
                    hidden_datasets = selector.css('script[type="application/json"][data-sjs]::text').getall()

                    # Parse datasets to find thread data
                    for hidden_dataset in hidden_datasets:
                        if '"ScheduledServerJS"' not in hidden_dataset:
                            continue
                        if "thread_items" not in hidden_dataset:
                            continue

                        data = json.loads(hidden_dataset)
                        thread_items = nested_lookup("thread_items", data)

                        if not thread_items:
                            continue

                        # Parse all threads (main thread + replies)
                        threads = [self.parse_thread(t) for thread in thread_items for t in thread]

                        # Close browser
                        browser.close()

                        if threads and len(threads) > 0:
                            print(f"DEBUG: Found {len(threads)} threads")
                            if threads[0]:
                                print(f"DEBUG: Main thread videos: {threads[0].get('videos', 'NO VIDEOS KEY')}")
                                print(f"DEBUG: Main thread keys: {list(threads[0].keys())}")
                            return {
                                "thread": threads[0],  # Main thread
                                "replies": threads[1:],  # Replies
                            }

                    browser.close()
                    raise ValueError("Could not find thread data in page")

            except PlaywrightTimeoutError as e:
                last_error = e
                print(f"Threads scraping attempt {attempt + 1} timeout: {str(e)}")
                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue

            except Exception as e:
                last_error = e
                print(f"Threads scraping attempt {attempt + 1} error: {str(e)}")
                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue

        # All attempts failed
        raise Exception(f"Failed to scrape Threads data after {max_attempts} attempts: {str(last_error)}")

    def get_video_info(self, url, return_json=True):
        """Extract Threads video information using web scraping

        Args:
            url: Threads post URL
            return_json: If True, return Flask jsonify response. If False, return dict (for use in download worker)
        """
        try:
            print(f"Starting Threads video extraction for: {url}")

            # Scrape thread data using Playwright
            thread_data = self.scrape_thread_data(url)

            if not thread_data or 'thread' not in thread_data:
                error_msg = 'Could not extract video information from Threads post'
                if return_json:
                    return jsonify({'error': error_msg}), 400
                else:
                    raise Exception(error_msg)

            main_thread = thread_data['thread']

            # Extract video URLs
            video_urls = main_thread.get('videos', [])
            print(f"DEBUG: video_urls = {video_urls}")
            print(f"DEBUG: video_urls type = {type(video_urls)}")
            print(f"DEBUG: video_urls length = {len(video_urls) if video_urls else 0}")

            if not video_urls or len(video_urls) == 0:
                print(f"DEBUG: No videos found in thread data")
                error_msg = 'No video found in this Threads post. This post may contain only images or text.'
                if return_json:
                    return jsonify({'error': error_msg}), 400
                else:
                    raise Exception(error_msg)

            # Get the best quality video URL (first one is usually highest quality)
            best_video_url = video_urls[0]

            # Extract metadata
            title = main_thread.get('text', '')[:100] or f"@{main_thread.get('username', 'Unknown')} - Threads Video"
            username = main_thread.get('username', 'Unknown')
            like_count = main_thread.get('like_count', 0) or 0
            reply_count = main_thread.get('reply_count', 0) or 0
            thumbnail_url = main_thread.get('user_pic', '') or ''
            video_duration = main_thread.get('video_duration', 0) or 0
            video_width = main_thread.get('video_width', 0) or 720
            video_height = main_thread.get('video_height', 0) or 1280

            # Try to get actual video file size
            video_filesize = 0
            try:
                response = requests.head(best_video_url, timeout=5)
                if 'content-length' in response.headers:
                    video_filesize = int(response.headers['content-length'])
            except:
                # Estimate filesize based on duration and quality
                video_filesize = int(video_duration * 200000) if video_duration > 0 else 5000000

            # Build video info response
            video_info = {
                'title': title,
                'duration': video_duration,
                'view_count': 0,  # Threads doesn't expose view count
                'uploader': username,
                'uploader_id': username,
                'thumbnail': thumbnail_url,
                'description': title[:200],
                'upload_date': '',
                'like_count': like_count,
                'comment_count': reply_count,
                'platform': 'threads',
                'formats': {
                    'video_formats': [],
                    'audio_formats': []
                }
            }

            # Add video formats
            # Threads typically serves a single video URL, so we'll create format entries
            # based on estimated qualities
            video_formats = []

            # Determine quality based on dimensions
            if video_height >= 1080:
                quality_label = "1080p"
            elif video_height >= 720:
                quality_label = "720p"
            elif video_height >= 480:
                quality_label = "480p"
            else:
                quality_label = f"{video_height}p"

            # Main video format (highest quality available)
            video_formats.append({
                'quality': quality_label,
                'type': 'video',
                'format_id': 'threads-video-1',
                'ext': 'mp4',
                'filesize': video_filesize,
                'fps': 30,
                'width': video_width,
                'height': video_height,
                'has_audio': True,
                'platform': 'threads',
                'duration': video_duration,
                'audio_description': 'With Audio',
                'direct_url': best_video_url  # Include direct URL for download
            })

            # Add audio format (extracted from video)
            audio_filesize = int(video_filesize * 0.1) if video_filesize > 0 else 500000
            audio_formats = [{
                'quality': '192kbps Audio',
                'type': 'audio',
                'format_id': 'threads-audio-1',
                'ext': 'mp3',
                'filesize': audio_filesize,
                'abr': 192,
                'platform': 'threads',
                'description': f"Audio extracted from {quality_label} video",
                'direct_url': best_video_url  # Use video URL, backend will extract audio
            }]

            video_info['formats']['video_formats'] = video_formats
            video_info['formats']['audio_formats'] = audio_formats

            print(f"Threads extraction successful - Video: {len(video_formats)}, Audio: {len(audio_formats)}")
            try:
                print(f"Video URL: {best_video_url[:50]}...")
            except:
                print("Video URL: [contains special characters]")

            # Return either jsonify response or raw dict based on parameter
            if return_json:
                return jsonify(video_info)
            else:
                return video_info

        except Exception as e:
            error_message = "Failed to fetch Threads video"
            error_str = str(e).lower()

            if 'timeout' in error_str:
                error_message = "Request timed out. The Threads post may be loading slowly or unavailable."
            elif 'could not find thread data' in error_str:
                error_message = "Could not extract video data from Threads post. The post may be private or deleted."
            elif 'no video found' in error_str:
                error_message = "This Threads post does not contain any video. It may contain only images or text."
            elif 'private' in error_str:
                error_message = "This Threads post is private and cannot be downloaded"
            elif 'unavailable' in error_str or 'not found' in error_str:
                error_message = "This Threads post is unavailable or has been deleted"
            else:
                error_message = f"Failed to process Threads video: {repr(e)}"

            try:
                print(f"Threads download failed: {error_message}")
            except:
                print("Threads download failed: [error contains special characters]")

            # Return error based on parameter
            if return_json:
                return jsonify({'error': error_message}), 400
            else:
                raise Exception(error_message)
