from instagrapi import Client
from instagrapi.exceptions import LoginRequired, ClientError
import re
import logging
import os
import time

logger = logging.getLogger(__name__)

class InstagramDownloader:
    # Instagram login credentials (your account)
    INSTAGRAM_USERNAME = os.getenv('INSTAGRAM_USERNAME', 'flip.filex')
    INSTAGRAM_PASSWORD = os.getenv('INSTAGRAM_PASSWORD', 'Malik30277$$$')
    SESSION_FILE = 'instagram_session.json'

    # Reuse client instance for better performance
    _client = None
    _last_login_time = 0
    _login_timeout = 3600  # Re-login after 1 hour

    @classmethod
    def get_client(cls):
        """Get or create Instagram client with login"""
        current_time = time.time()

        # Create new client or re-login if timeout
        if cls._client is None or (current_time - cls._last_login_time) > cls._login_timeout:
            try:
                logger.info("Initializing Instagram client...")
                cls._client = Client()

                # Try to load existing session first
                if os.path.exists(cls.SESSION_FILE):
                    try:
                        logger.info("Loading saved Instagram session...")
                        cls._client.load_settings(cls.SESSION_FILE)
                        cls._client.login(cls.INSTAGRAM_USERNAME, cls.INSTAGRAM_PASSWORD)
                        logger.info("Successfully loaded Instagram session")
                    except Exception as e:
                        logger.warning(f"Failed to load session: {str(e)}, logging in fresh...")
                        cls._client = Client()
                        cls._client.login(cls.INSTAGRAM_USERNAME, cls.INSTAGRAM_PASSWORD)
                        cls._client.dump_settings(cls.SESSION_FILE)
                        logger.info("Saved new Instagram session")
                else:
                    logger.info("Logging into Instagram for the first time...")
                    cls._client.login(cls.INSTAGRAM_USERNAME, cls.INSTAGRAM_PASSWORD)
                    cls._client.dump_settings(cls.SESSION_FILE)
                    logger.info("Successfully logged in and saved session")

                cls._last_login_time = current_time

            except Exception as e:
                logger.error(f"Instagram login failed: {str(e)}")
                raise Exception("Instagram authentication failed. Please check credentials.")

        return cls._client

    @staticmethod
    def extract_shortcode(url):
        """Extract shortcode from Instagram URL"""
        patterns = [
            r'instagram\.com/(?:p|reel|reels|tv)/([A-Za-z0-9_-]+)',
            r'instagr\.am/(?:p|reel)/([A-Za-z0-9_-]+)',
        ]
        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        return None

    @staticmethod
    def get_video_info(url):
        """
        Extract Instagram video/reel information using instagrapi
        """
        try:
            # Extract shortcode
            shortcode = InstagramDownloader.extract_shortcode(url)
            if not shortcode:
                raise Exception("Invalid Instagram URL. Please provide a valid Instagram post/reel URL.")

            logger.info(f"Processing Instagram shortcode: {shortcode}")

            # Get authenticated client
            client = InstagramDownloader.get_client()

            # Get media PK from URL
            media_pk = client.media_pk_from_url(url)
            logger.info(f"Got media PK: {media_pk}")

            # Get raw media info using private API
            try:
                result = client.private_request(f"media/{media_pk}/info/")
                media_data = result.get('items', [{}])[0]
            except Exception as e:
                logger.error(f"Failed to get media info: {str(e)}")
                raise Exception("Could not retrieve Instagram post information.")

            # Check if it's a video
            media_type = media_data.get('media_type')
            if media_type != 2:  # 2 = Video/Reel
                raise Exception("This Instagram post is not a video. Please provide a video or reel URL.")

            # Extract video URL
            video_versions = media_data.get('video_versions', [])
            if not video_versions:
                raise Exception("Could not extract video URL from Instagram post.")

            video_url = video_versions[0].get('url')
            if not video_url:
                raise Exception("Could not extract video URL from Instagram post.")

            # Get thumbnail
            image_versions = media_data.get('image_versions2', {}).get('candidates', [])
            thumbnail_url = image_versions[0].get('url') if image_versions else None

            # Get caption/title
            caption_obj = media_data.get('caption', {})
            caption = caption_obj.get('text', '') if caption_obj else ''
            title = caption[:100] + "..." if len(caption) > 100 else (caption if caption else "Instagram Video")

            # Get stats
            likes = media_data.get('like_count', 0)
            views = media_data.get('play_count', 0) or media_data.get('view_count', 0)
            comments = media_data.get('comment_count', 0)

            # Get uploader
            user_data = media_data.get('user', {})
            uploader = user_data.get('username', 'Unknown')

            logger.info(f"Successfully extracted Instagram video: {title[:50]}")

            return {
                'title': title,
                'thumbnail': thumbnail_url,
                'duration': None,  # Instagram API doesn't provide duration
                'uploader': uploader,
                'view_count': views,
                'like_count': likes,
                'comment_count': comments,
                'formats': {
                    'video_formats': [
                        {
                            'quality': 'Best Available',
                            'format_id': 'best',
                            'ext': 'mp4',
                            'direct_url': video_url,
                            'filesize': None,
                            'resolution': 'HD',
                        }
                    ],
                    'audio_formats': []
                }
            }

        except LoginRequired as e:
            logger.error(f"Instagram login required: {str(e)}")
            raise Exception("Instagram authentication failed. Please try again later.")

        except ClientError as e:
            logger.error(f"Instagram client error: {str(e)}")
            raise Exception("Instagram download failed. The post may be private or deleted.")

        except Exception as e:
            logger.error(f"Instagram download error: {str(e)}")
            raise Exception(f"Instagram download failed: {str(e)}")

    @staticmethod
    def download_video(url, format_id='best', output_path='downloads'):
        """
        Download Instagram video
        """
        try:
            # Get video info first
            video_info = InstagramDownloader.get_video_info(url)

            # Find the video format
            video_formats = video_info['formats']['video_formats']
            if not video_formats:
                raise Exception("No video formats available")

            # Get direct URL
            direct_url = video_formats[0]['direct_url']

            # Create output directory
            os.makedirs(output_path, exist_ok=True)

            # Generate filename
            safe_title = re.sub(r'[^\w\s-]', '', video_info['title'])[:50]
            filename = f"{safe_title}.mp4"
            output_file = os.path.join(output_path, filename)

            logger.info(f"Downloading Instagram video to: {output_file}")

            # Download using requests
            import requests
            response = requests.get(direct_url, stream=True, timeout=30)
            response.raise_for_status()

            with open(output_file, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)

            logger.info(f"Successfully downloaded: {output_file}")
            return output_file

        except Exception as e:
            logger.error(f"Download failed: {str(e)}")
            raise Exception(f"Download failed: {str(e)}")
