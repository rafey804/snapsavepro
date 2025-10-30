"""
Instagram Profile Picture Downloader
Uses instaloader library to fetch REAL Instagram profile data
"""

import logging
import instaloader
from typing import Dict, Optional
from urllib.parse import quote

logger = logging.getLogger(__name__)


class InstagramProfileDownloader:
    """Instagram Profile Picture Downloader using Instaloader"""

    def __init__(self):
        """Initialize Instagram profile downloader with Instaloader"""
        try:
            # Initialize Instaloader with optimized settings
            self.loader = instaloader.Instaloader(
                download_pictures=False,
                download_videos=False,
                download_video_thumbnails=False,
                download_geotags=False,
                download_comments=False,
                save_metadata=False,
                compress_json=False,
                post_metadata_txt_pattern='',
                quiet=True,
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            )
            self.use_instaloader = True
            logger.info("InstagramProfileDownloader initialized with Instaloader")
        except Exception as e:
            logger.error(f"Failed to initialize Instaloader: {e}")
            self.use_instaloader = False
            logger.info("InstagramProfileDownloader initialized without Instaloader")

    def get_profile_info(self, username: str) -> Dict:
        """
        Get Instagram profile information including REAL profile picture URL

        Args:
            username: Instagram username (without @)

        Returns:
            Dictionary with complete profile information
        """
        try:
            # Clean username - remove @ symbol and whitespace
            username = username.strip().replace('@', '').lower()

            if not username:
                return self._get_fallback_data("unknown", "No username provided")

            logger.info(f"Fetching Instagram profile for: {username}")

            if self.use_instaloader:
                # Use Instaloader to get REAL Instagram data
                return self._fetch_with_instaloader(username)
            else:
                return self._get_fallback_data(username, "Instaloader not available")

        except Exception as e:
            logger.error(f"Error fetching Instagram profile for {username}: {e}")
            return self._get_fallback_data(username, str(e))

    def _fetch_with_instaloader(self, username: str) -> Dict:
        """
        Fetch Instagram profile using Instaloader library
        This fetches REAL data directly from Instagram
        """
        try:
            logger.info(f"Using Instaloader to fetch profile: {username}")

            # Load profile from Instagram using Instaloader
            profile = instaloader.Profile.from_username(self.loader.context, username)

            # Get the REAL profile picture URL (HD version)
            profile_pic_url = profile.profile_pic_url

            # Instaloader provides the highest quality available
            profile_pic_url_hd = profile.profile_pic_url

            # Build complete profile data
            profile_data = {
                'username': profile.username,
                'profile_pic_url': profile_pic_url,
                'profile_pic_url_hd': profile_pic_url_hd,
                'full_name': profile.full_name or profile.username,
                'bio': profile.biography or '',
                'followers': profile.followers,
                'following': profile.followees,
                'posts_count': profile.mediacount,
                'is_verified': profile.is_verified,
                'is_private': profile.is_private,
            }

            logger.info(f"✓ Successfully fetched REAL Instagram data for {username}")
            logger.info(f"  - Full Name: {profile_data['full_name']}")
            logger.info(f"  - Followers: {profile_data['followers']:,}")
            logger.info(f"  - Following: {profile_data['following']:,}")
            logger.info(f"  - Posts: {profile_data['posts_count']:,}")
            logger.info(f"  - Verified: {profile_data['is_verified']}")
            logger.info(f"  - Private: {profile_data['is_private']}")
            logger.info(f"  - Profile Pic: {profile_pic_url[:80]}...")

            return profile_data

        except instaloader.exceptions.ProfileNotExistsException:
            logger.warning(f"Instagram profile does not exist: {username}")
            return self._get_fallback_data(username, "Profile not found")

        except instaloader.exceptions.ConnectionException as e:
            logger.error(f"Instagram connection error: {e}")
            return self._get_fallback_data(username, "Connection error - Instagram may be rate limiting")

        except instaloader.exceptions.QueryReturnedNotFoundException:
            logger.warning(f"Instagram profile not found or is private: {username}")
            return self._get_fallback_data(username, "Profile not found or private")

        except instaloader.exceptions.TooManyRequestsException:
            logger.error(f"Instagram rate limit exceeded for {username}")
            return self._get_fallback_data(username, "Too many requests - please try again later")

        except Exception as e:
            logger.error(f"Unexpected error with Instaloader for {username}: {type(e).__name__} - {e}")
            return self._get_fallback_data(username, f"Error: {str(e)}")

    def _get_fallback_data(self, username: str, error_message: str = "") -> Dict:
        """
        Get fallback profile data when Instagram fetching fails
        Uses UI Avatars as placeholder
        """
        logger.warning(f"Using fallback data for {username}: {error_message}")

        # Generate a colored avatar based on username
        avatar_url = f'https://ui-avatars.com/api/?name={quote(username)}&size=400&background=C13584&color=fff&bold=true&format=png'
        avatar_url_hd = f'https://ui-avatars.com/api/?name={quote(username)}&size=1080&background=C13584&color=fff&bold=true&format=png'

        return {
            'username': username,
            'profile_pic_url': avatar_url,
            'profile_pic_url_hd': avatar_url_hd,
            'full_name': username.replace('_', ' ').replace('.', ' ').title(),
            'bio': error_message if error_message else f'Instagram user @{username}',
            'followers': 0,
            'following': 0,
            'posts_count': 0,
            'is_verified': False,
            'is_private': False,
            'error': error_message if error_message else None,  # Add error field for frontend
        }

    def get_profile_picture_url(self, username: str) -> str:
        """
        Get just the profile picture URL (HD version)

        Args:
            username: Instagram username

        Returns:
            HD profile picture URL
        """
        profile_info = self.get_profile_info(username)
        return profile_info.get('profile_pic_url_hd', profile_info.get('profile_pic_url', ''))
