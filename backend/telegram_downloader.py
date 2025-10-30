import os
import re
import logging
import tempfile
import shutil
from telethon import TelegramClient
from telethon.tl.types import MessageMediaPhoto, MessageMediaDocument, MessageMediaWebPage
from flask import jsonify
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

class TelegramDownloader:
    def __init__(self):
        """Initialize Telegram client for public content only"""
        self.api_id = os.getenv('TELEGRAM_API_ID')
        self.api_hash = os.getenv('TELEGRAM_API_HASH')
        self.session_name = 'telegram_session'
        self.client = None

        # Check if credentials are provided
        if not self.api_id or not self.api_hash:
            logger.warning("Telegram API credentials not found in .env file")
            logger.warning("Get credentials from https://my.telegram.org")
            self.enabled = False
        else:
            self.enabled = True
            logger.info("Telegram downloader initialized (public-only mode)")

    async def initialize_client(self):
        """Initialize Telegram client connection"""
        if not self.enabled:
            raise Exception("Telegram API credentials not configured")

        if self.client is None:
            self.client = TelegramClient(
                self.session_name,
                int(self.api_id),
                self.api_hash,
                system_version="4.16.30-vxCUSTOM"
            )
            await self.client.connect()

            # For public-only mode, we don't need to sign in
            if not await self.client.is_user_authorized():
                logger.info("Client not authorized, but can still access public content")

        return self.client

    def validate_telegram_url(self, url):
        """Validate if URL is a valid Telegram link"""
        telegram_patterns = [
            r'https?://t\.me/([a-zA-Z0-9_]+)/(\d+)',
            r'https?://t\.me/c/(\d+)/(\d+)',
            r'https?://telegram\.me/([a-zA-Z0-9_]+)/(\d+)',
        ]

        for pattern in telegram_patterns:
            if re.match(pattern, url):
                return True
        return False

    def parse_telegram_url(self, url):
        """Parse Telegram URL to extract channel and message ID"""
        # Pattern 1: t.me/username/message_id
        match = re.match(r'https?://t\.me/([a-zA-Z0-9_]+)/(\d+)', url)
        if match:
            return {'type': 'public', 'username': match.group(1), 'message_id': int(match.group(2))}

        # Pattern 2: t.me/c/channel_id/message_id (private channels)
        match = re.match(r'https?://t\.me/c/(\d+)/(\d+)', url)
        if match:
            return {'type': 'private', 'channel_id': int(match.group(1)), 'message_id': int(match.group(2))}

        # Pattern 3: telegram.me/username/message_id
        match = re.match(r'https?://telegram\.me/([a-zA-Z0-9_]+)/(\d+)', url)
        if match:
            return {'type': 'public', 'username': match.group(1), 'message_id': int(match.group(2))}

        return None

    async def get_message(self, url):
        """Get message from Telegram"""
        try:
            await self.initialize_client()

            parsed = self.parse_telegram_url(url)
            if not parsed:
                raise Exception("Invalid Telegram URL format")

            if parsed['type'] == 'private':
                raise Exception("Private channel links are not supported in public-only mode")

            # Get message from public channel
            username = parsed['username']
            message_id = parsed['message_id']

            # Get the entity (channel/group)
            entity = await self.client.get_entity(username)

            # Get the specific message
            message = await self.client.get_messages(entity, ids=message_id)

            if not message:
                raise Exception("Message not found or channel is private")

            return message

        except Exception as e:
            logger.error(f"Error getting Telegram message: {str(e)}")
            raise

    def get_video_info(self, url):
        """Get video/media information from Telegram link"""
        try:
            if not self.enabled:
                return jsonify({
                    'error': 'Telegram downloader not configured. Please add TELEGRAM_API_ID and TELEGRAM_API_HASH to .env file'
                }), 400

            if not self.validate_telegram_url(url):
                return jsonify({'error': 'Invalid Telegram URL format'}), 400

            # Run async function
            import asyncio

            # Get or create event loop
            try:
                loop = asyncio.get_event_loop()
            except RuntimeError:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)

            message = loop.run_until_complete(self.get_message(url))

            if not message:
                return jsonify({'error': 'Message not found or is not accessible'}), 404

            # Check if message has media
            if not message.media:
                return jsonify({'error': 'Message does not contain any media'}), 400

            media_info = self.extract_media_info(message)

            if not media_info:
                return jsonify({'error': 'Unsupported media type'}), 400

            return jsonify(media_info), 200

        except Exception as e:
            logger.error(f"Error in get_video_info: {str(e)}")
            return jsonify({'error': f'Failed to fetch Telegram media: {str(e)}'}), 500

    def extract_media_info(self, message):
        """Extract media information from Telegram message"""
        try:
            media = message.media

            # Handle video/document
            if isinstance(media, MessageMediaDocument):
                document = media.document

                # Check if it's a video
                is_video = False
                video_attrs = None

                for attr in document.attributes:
                    if hasattr(attr, 'duration'):  # Video attribute
                        is_video = True
                        video_attrs = attr
                        break

                if is_video:
                    file_size = document.size
                    duration = video_attrs.duration if video_attrs else 0

                    # Get video dimensions if available
                    width = video_attrs.w if hasattr(video_attrs, 'w') else 0
                    height = video_attrs.h if hasattr(video_attrs, 'h') else 0

                    # Get thumbnail if available
                    thumbnail_url = None
                    if document.thumbs:
                        # Thumbnail will be downloaded separately if needed
                        thumbnail_url = "telegram_thumb"

                    return {
                        'platform': 'telegram',
                        'media_type': 'video',
                        'title': message.message or 'Telegram Video',
                        'thumbnail': thumbnail_url,
                        'duration': duration,
                        'formats': [
                            {
                                'format_id': 'telegram-video',
                                'quality': f'{width}x{height}' if width and height else 'Original',
                                'ext': 'mp4',
                                'filesize': file_size,
                                'has_video': True,
                                'has_audio': True
                            }
                        ]
                    }
                else:
                    # It's a document (could be audio, file, etc.)
                    return {
                        'platform': 'telegram',
                        'media_type': 'document',
                        'title': message.message or 'Telegram Document',
                        'formats': [
                            {
                                'format_id': 'telegram-document',
                                'quality': 'Original',
                                'ext': 'file',
                                'filesize': document.size,
                                'has_video': False,
                                'has_audio': False
                            }
                        ]
                    }

            # Handle photo
            elif isinstance(media, MessageMediaPhoto):
                photo = media.photo

                # Get the largest photo size
                largest_size = max(photo.sizes, key=lambda s: s.w * s.h if hasattr(s, 'w') else 0)

                return {
                    'platform': 'telegram',
                    'media_type': 'photo',
                    'title': message.message or 'Telegram Photo',
                    'formats': [
                        {
                            'format_id': 'telegram-photo',
                            'quality': f'{largest_size.w}x{largest_size.h}' if hasattr(largest_size, 'w') else 'Original',
                            'ext': 'jpg',
                            'filesize': getattr(largest_size, 'size', 0),
                            'has_video': False,
                            'has_audio': False
                        }
                    ]
                }

            # Handle web page preview (links with preview)
            elif isinstance(media, MessageMediaWebPage):
                return {
                    'error': 'This message contains only a web preview. Please share the direct media link.'
                }

            else:
                return None

        except Exception as e:
            logger.error(f"Error extracting media info: {str(e)}")
            return None

    async def download_media_async(self, url, download_id, progress_dict, files_dict):
        """Download media from Telegram (async)"""
        temp_dir = None

        try:
            await self.initialize_client()

            # Get message
            message = await self.get_message(url)

            if not message or not message.media:
                raise Exception("No media found in message")

            # Create temp directory
            temp_dir = tempfile.mkdtemp(prefix='telegram_')

            # Update progress
            progress_dict[download_id] = {
                'status': 'downloading',
                'percent': 0,
                'platform': 'telegram'
            }

            # Progress callback
            def progress_callback(current, total):
                percent = int((current / total) * 100)
                progress_dict[download_id] = {
                    'status': 'downloading',
                    'percent': percent,
                    'platform': 'telegram'
                }
                logger.info(f"Telegram download progress: {percent}%")

            # Download the media
            file_path = await self.client.download_media(
                message.media,
                file=temp_dir,
                progress_callback=progress_callback
            )

            if not file_path or not os.path.exists(file_path):
                raise Exception("Download failed - file not created")

            # Get filename
            filename = os.path.basename(file_path)

            # Determine proper extension
            media = message.media
            if isinstance(media, MessageMediaDocument):
                # Check if it's a video
                for attr in media.document.attributes:
                    if hasattr(attr, 'duration'):
                        # It's a video, ensure .mp4 extension
                        if not filename.endswith('.mp4'):
                            new_filename = os.path.splitext(filename)[0] + '.mp4'
                            new_path = os.path.join(temp_dir, new_filename)
                            os.rename(file_path, new_path)
                            file_path = new_path
                            filename = new_filename
                        break
            elif isinstance(media, MessageMediaPhoto):
                # Ensure .jpg extension
                if not filename.endswith('.jpg'):
                    new_filename = os.path.splitext(filename)[0] + '.jpg'
                    new_path = os.path.join(temp_dir, new_filename)
                    os.rename(file_path, new_path)
                    file_path = new_path
                    filename = new_filename

            # Update progress
            progress_dict[download_id] = {
                'status': 'completed',
                'percent': 100,
                'platform': 'telegram'
            }

            # Store file info
            files_dict[download_id] = {
                'filepath': file_path,
                'filename': filename,
                'temp_dir': temp_dir,
                'platform': 'telegram'
            }

            logger.info(f"Telegram download completed: {filename}")
            return True

        except Exception as e:
            logger.error(f"Telegram download error: {str(e)}")

            # Cleanup on error
            if temp_dir and os.path.exists(temp_dir):
                shutil.rmtree(temp_dir, ignore_errors=True)

            progress_dict[download_id] = {
                'status': 'error',
                'percent': 0,
                'error': str(e),
                'platform': 'telegram'
            }

            return False

    def download_media(self, url, download_id, progress_dict, files_dict):
        """Download media from Telegram (sync wrapper)"""
        import asyncio

        try:
            loop = asyncio.get_event_loop()
        except RuntimeError:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)

        return loop.run_until_complete(
            self.download_media_async(url, download_id, progress_dict, files_dict)
        )

    def __del__(self):
        """Cleanup on deletion"""
        if self.client:
            try:
                import asyncio
                loop = asyncio.get_event_loop()
                loop.run_until_complete(self.client.disconnect())
            except:
                pass
