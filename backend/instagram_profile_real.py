"""
Real Instagram Profile Picture Downloader using Instaloader
"""

import logging
import instaloader
from typing import Dict, Optional
from urllib.parse import quote

logger = logging.getLogger(__name__)


class RealInstagramProfileDownloader:
    """Real Instagram Profile Picture Downloader using Instaloader"""

    def __init__(self):
        """Initialize Instagram profile downloader with Instaloader"""
        self.loader = instaloader.Instaloader(
            download_pictures=False,
            download_videos=False,
            download_video_thumbnails=False,
            download_geotags=False,
            download_comments=False,
            save_metadata=False,
            compress_json=False,
            post_metadata_txt_pattern='',
            quiet=True
        )
        logger.info("RealInstagramProfileDownloader initialized with Instaloader")

    def get_profile_info(self, username: str) -> Dict:
        """
        Get Instagram profile information including real profile picture URL

        Args:
            username: Instagram username

        Returns:
            Dictionary with profile information
        """
        try:
            # Clean username
            username = username.strip().replace('@', '').lower()

            logger.info(f"Fetching real Instagram profile for: {username}")

            # Load profile from Instagram
            profile = instaloader.Profile.from_username(self.loader.context, username)

            # Get profile picture URL (HD version)
            profile_pic_url = profile.profile_pic_url
            profile_pic_url_hd = profile.profile_pic_url  # Instaloader provides HD by default

            logger.info(f"Successfully fetched Instagram profile for {username}")
            logger.info(f"Profile pic URL: {profile_pic_url[:100]}...")
            logger.info(f"Followers: {profile.followers}, Following: {profile.followees}")

            result = {
                'username': profile.username,
                'platform': 'instagram',
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

            logger.info(f"Returning profile data: username={result['username']}, followers={result['followers']}")
            return result

        except instaloader.exceptions.ProfileNotExistsException as e:
            logger.error(f"Instagram profile not found: {username} - {e}")
            return self._get_fallback_data(username, "Profile not found")
        except instaloader.exceptions.ConnectionException as e:
            logger.error(f"Instagram connection error for {username}: {e}")
            return self._get_fallback_data(username, "Connection error - Instagram may be blocking requests")
        except instaloader.exceptions.QueryReturnedNotFoundException as e:
            logger.error(f"Instagram query error for {username}: {e}")
            return self._get_fallback_data(username, "Profile not found or private")
        except Exception as e:
            logger.error(f"Unexpected error fetching Instagram profile {username}: {type(e).__name__} - {e}", exc_info=True)
            return self._get_fallback_data(username, f"Error: {str(e)}")

    def _get_fallback_data(self, username: str, error_message: str = "") -> Dict:
        """Get fallback profile data when Instagram scraping fails"""
        logger.info(f"Using fallback data for {username}: {error_message}")

        return {
            'username': username,
            'platform': 'instagram',
            'profile_pic_url': f'https://ui-avatars.com/api/?name={quote(username)}&size=400&background=C13584&color=fff&bold=true',
            'profile_pic_url_hd': f'https://ui-avatars.com/api/?name={quote(username)}&size=1080&background=C13584&color=fff&bold=true',
            'full_name': username.replace('_', ' ').replace('.', ' ').title(),
            'bio': f'Instagram user @{username}' if not error_message else error_message,
            'followers': 0,
            'following': 0,
            'posts_count': 0,
            'is_verified': False,
            'is_private': False,
        }

    def get_profile_picture_url(self, username: str) -> str:
        """
        Get just the profile picture URL

        Args:
            username: Instagram username

        Returns:
            Profile picture URL
        """
        profile_info = self.get_profile_info(username)
        return profile_info.get('profile_pic_url_hd', profile_info.get('profile_pic_url', ''))
