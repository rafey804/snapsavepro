"""
Universal Profile Picture Downloader
Supports: Instagram, Facebook, Twitter, TikTok, YouTube, LinkedIn, WhatsApp, Telegram
"""

import logging
import requests
import re
from typing import Dict, Optional
from urllib.parse import quote, urlparse
import json

logger = logging.getLogger(__name__)

# Import Instagram downloader
try:
    from instagram_profile import InstagramProfileDownloader
    USE_INSTAGRAM_DOWNLOADER = True
    logger.info("Using Instagram profile downloader with Instaloader")
except ImportError as e:
    USE_INSTAGRAM_DOWNLOADER = False
    logger.warning(f"Instagram downloader not available: {e}")


class ProfilePictureDownloader:
    """Universal Profile Picture Downloader for all social media platforms"""

    def __init__(self):
        """Initialize the profile picture downloader"""
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        })

        # Initialize Instagram downloader if available
        if USE_INSTAGRAM_DOWNLOADER:
            self.instagram_downloader = InstagramProfileDownloader()
            logger.info("ProfilePictureDownloader initialized with Instagram support (Instaloader)")
        else:
            self.instagram_downloader = None
            logger.info("ProfilePictureDownloader initialized without Instagram support")

        logger.info("ProfilePictureDownloader initialized for all platforms")

    def get_profile_picture(self, username: str, platform: str) -> Dict:
        """
        Get profile picture from any platform

        Args:
            username: Username on the platform
            platform: Platform name (instagram, facebook, twitter, tiktok, etc.)

        Returns:
            Dictionary with profile information
        """
        try:
            username = username.strip().replace('@', '').lower()
            platform = platform.lower()

            logger.info(f"Fetching profile picture for {username} from {platform}")

            # Route to appropriate platform handler
            if platform == 'instagram':
                return self._get_instagram_profile(username)
            elif platform == 'facebook':
                return self._get_facebook_profile(username)
            elif platform in ['twitter', 'x']:
                return self._get_twitter_profile(username)
            elif platform == 'tiktok':
                return self._get_tiktok_profile(username)
            elif platform == 'youtube':
                return self._get_youtube_profile(username)
            elif platform == 'linkedin':
                return self._get_linkedin_profile(username)
            elif platform == 'whatsapp':
                return self._get_whatsapp_profile(username)
            elif platform == 'telegram':
                return self._get_telegram_profile(username)
            else:
                return self._get_fallback_profile(username, platform)

        except Exception as e:
            logger.error(f"Error fetching profile picture: {e}")
            return self._get_fallback_profile(username, platform)

    def _get_instagram_profile(self, username: str) -> Dict:
        """Get Instagram profile picture"""
        try:
            # Use real Instagram downloader if available
            if self.instagram_downloader:
                logger.info(f"Using real Instagram downloader for {username}")
                profile_data = self.instagram_downloader.get_profile_info(username)
                # Ensure platform field is set correctly
                profile_data['platform'] = 'instagram'
                return profile_data

            # Fallback to HTML scraping if real downloader not available
            logger.info(f"Using fallback HTML scraping for {username}")
            profile_url = f"https://www.instagram.com/{username}/"
            response = self.session.get(profile_url, timeout=10)
            response.raise_for_status()

            # Extract profile data from HTML
            profile_data = self._extract_instagram_data(response.text, username)

            if profile_data:
                return profile_data

            return self._get_fallback_profile(username, 'instagram')

        except Exception as e:
            logger.error(f"Instagram profile fetch error: {e}")
            return self._get_fallback_profile(username, 'instagram')

    def _extract_instagram_data(self, html: str, username: str) -> Optional[Dict]:
        """Extract Instagram profile data from HTML"""
        try:
            # Extract JSON data from Instagram page
            pic_pattern = r'"profile_pic_url":"([^"]+)"'
            pic_hd_pattern = r'"profile_pic_url_hd":"([^"]+)"'
            full_name_pattern = r'"full_name":"([^"]*)"'
            bio_pattern = r'"biography":"([^"]*)"'
            followers_pattern = r'"edge_followed_by":{"count":(\d+)}'
            following_pattern = r'"edge_follow":{"count":(\d+)}'
            posts_pattern = r'"edge_owner_to_timeline_media":{"count":(\d+)}'
            verified_pattern = r'"is_verified":(true|false)'
            private_pattern = r'"is_private":(true|false)'

            pic_match = re.search(pic_pattern, html)
            pic_hd_match = re.search(pic_hd_pattern, html)
            full_name_match = re.search(full_name_pattern, html)
            bio_match = re.search(bio_pattern, html)
            followers_match = re.search(followers_pattern, html)
            following_match = re.search(following_pattern, html)
            posts_match = re.search(posts_pattern, html)
            verified_match = re.search(verified_pattern, html)
            private_match = re.search(private_pattern, html)

            if pic_match:
                profile_pic_url = pic_match.group(1).replace('\\u0026', '&')
                profile_pic_url_hd = pic_hd_match.group(1).replace('\\u0026', '&') if pic_hd_match else profile_pic_url

                return {
                    'username': username,
                    'platform': 'instagram',
                    'profile_pic_url': profile_pic_url,
                    'profile_pic_url_hd': profile_pic_url_hd,
                    'full_name': full_name_match.group(1) if full_name_match else username,
                    'bio': bio_match.group(1).replace('\\n', '\n') if bio_match else '',
                    'followers': int(followers_match.group(1)) if followers_match else 0,
                    'following': int(following_match.group(1)) if following_match else 0,
                    'posts_count': int(posts_match.group(1)) if posts_match else 0,
                    'is_verified': verified_match.group(1) == 'true' if verified_match else False,
                    'is_private': private_match.group(1) == 'true' if private_match else False,
                }

            return None

        except Exception as e:
            logger.error(f"Error extracting Instagram data: {e}")
            return None

    def _get_facebook_user_id(self, username: str) -> str:
        """Convert Facebook username to numeric ID using vanity URL resolver"""
        try:
            # Try to resolve vanity username to numeric ID
            # Method 1: Use Facebook's public redirect behavior
            vanity_url = f"https://www.facebook.com/{username}"
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            }

            response = requests.get(vanity_url, headers=headers, timeout=10, allow_redirects=True)

            # Method 2: Check if the final URL contains a numeric ID
            if 'profile.php?id=' in response.url:
                id_match = re.search(r'id=(\d+)', response.url)
                if id_match:
                    numeric_id = id_match.group(1)
                    logger.info(f"Resolved {username} to numeric ID: {numeric_id}")
                    return numeric_id

            # Method 3: Search for numeric ID in the page source
            if response.status_code == 200:
                html = response.text

                # Pattern 1: entity_id in page data (must be at least 10 digits, skip 0)
                entity_pattern = r'"entity_id":"(\d{10,})"'
                match = re.search(entity_pattern, html)
                if match and match.group(1) != '0':
                    numeric_id = match.group(1)
                    logger.info(f"Found entity_id for {username}: {numeric_id}")
                    return numeric_id

                # Pattern 2: profile_owner in page data (more reliable for profiles)
                owner_pattern = r'"profile_owner":\{"__typename":"User","id":"(\d{10,})"'
                match = re.search(owner_pattern, html)
                if match and match.group(1) != '0':
                    numeric_id = match.group(1)
                    logger.info(f"Found profile_owner ID for {username}: {numeric_id}")
                    return numeric_id

                # Pattern 3: userID in page data (must be at least 10 digits)
                user_pattern = r'"userID":"(\d{10,})"'
                match = re.search(user_pattern, html)
                if match and match.group(1) != '0':
                    numeric_id = match.group(1)
                    logger.info(f"Found userID for {username}: {numeric_id}")
                    return numeric_id

                # Pattern 4: Look for actorID (alternative name for user ID)
                actor_pattern = r'"actorID":"(\d{10,})"'
                match = re.search(actor_pattern, html)
                if match and match.group(1) != '0':
                    numeric_id = match.group(1)
                    logger.info(f"Found actorID for {username}: {numeric_id}")
                    return numeric_id

                # Pattern 5: Legacy profile_id (with validation)
                profile_pattern = r'"profile_id":(\d{10,})[,}]'
                match = re.search(profile_pattern, html)
                if match and match.group(1) != '0':
                    numeric_id = match.group(1)
                    logger.info(f"Found profile_id for {username}: {numeric_id}")
                    return numeric_id

            logger.warning(f"Could not resolve {username} to numeric ID, will use username directly")
            return username

        except Exception as e:
            logger.error(f"Error resolving Facebook ID for {username}: {e}")
            return username

    def _get_facebook_profile(self, username: str) -> Dict:
        """Get Facebook profile picture - supports both usernames and numeric IDs"""
        try:
            logger.info(f"Attempting to fetch Facebook profile for {username}")

            # Determine if it's a numeric ID or username
            # Extract numeric ID if format is like "profile.php?id=100087732244499"
            profile_id = None
            if 'id=' in username:
                # Extract numeric ID from profile.php?id=...
                id_match = re.search(r'id=(\d+)', username)
                if id_match:
                    profile_id = id_match.group(1)
                    logger.info(f"Extracted numeric ID: {profile_id}")
            elif username.isdigit():
                # Direct numeric ID
                profile_id = username
                logger.info(f"Using numeric ID: {profile_id}")
            else:
                # Try to resolve username to numeric ID (critical for dot usernames)
                logger.info(f"Attempting to resolve username '{username}' to numeric ID...")
                resolved_id = self._get_facebook_user_id(username)
                if resolved_id != username and resolved_id.isdigit():
                    profile_id = resolved_id
                    logger.info(f"Successfully resolved to numeric ID: {profile_id}")

            # Build URLs to try - use mobile site (mbasic) which is easier to scrape
            urls_to_try = []
            if profile_id:
                # For numeric IDs, use profile.php?id= format
                urls_to_try.append(f"https://mbasic.facebook.com/profile.php?id={profile_id}")
                urls_to_try.append(f"https://www.facebook.com/profile.php?id={profile_id}")
                # Also try Graph API with numeric ID
                graph_id = profile_id
            else:
                # For usernames, use direct profile URL on mobile and desktop
                urls_to_try.append(f"https://mbasic.facebook.com/{username}")
                urls_to_try.append(f"https://www.facebook.com/{username}")
                graph_id = username

            # Headers to mimic a real browser
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Referer': 'https://www.facebook.com/',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
            }

            profile_pic_url = None
            full_name = None

            # Try scraping Facebook page
            for url in urls_to_try:
                try:
                    logger.info(f"Trying URL: {url}")
                    response = requests.get(url, headers=headers, timeout=15, allow_redirects=True)

                    if response.status_code == 200:
                        html = response.text

                        # Try multiple regex patterns to find profile picture
                        patterns = [
                            # Pattern 1: mbasic profile picture link
                            r'href="(/photo\.php\?fbid=[^"]+)"',
                            # Pattern 2: Direct fbcdn image in mbasic
                            r'<img[^>]+src="(https://[^"]*fbcdn[^"]+\.jpg[^"]*)"',
                            # Pattern 3: og:image meta tag (most reliable)
                            r'<meta\s+property="og:image"\s+content="([^"]+)"',
                            # Pattern 4: profile picture in JSON-LD
                            r'"image":\s*"(https://[^"]*fbcdn[^"]+)"',
                            # Pattern 5: profile_picture in page data
                            r'"profile_picture":\s*{\s*"uri":\s*"([^"]+)"',
                            # Pattern 6: Direct image URL pattern
                            r'(https://scontent[^"]*fbcdn\.net/v/[^"]+)',
                            # Pattern 7: Another og:image variant
                            r'property="og:image"\s+content="([^"]+)"',
                            # Pattern 8: Mobile Facebook image
                            r'<a[^>]+href="/photo\.php[^>]+>\s*<img[^>]+src="([^"]+)"',
                        ]

                        for pattern in patterns:
                            match = re.search(pattern, html)
                            if match:
                                profile_pic_url = match.group(1)

                                # If it's a relative URL (starts with /), we need to follow it to get the actual image
                                if profile_pic_url.startswith('/'):
                                    photo_url = f"https://mbasic.facebook.com{profile_pic_url}"
                                    try:
                                        photo_response = requests.get(photo_url, headers=headers, timeout=15)
                                        if photo_response.status_code == 200:
                                            # Look for the actual image in the photo page
                                            img_patterns = [
                                                r'<img[^>]+src="(https://[^"]*fbcdn[^"]+\.jpg[^"]*)"[^>]+alt',
                                                r'href="(https://[^"]*fbcdn[^"]+\.jpg[^"]*)"',
                                            ]
                                            for img_pattern in img_patterns:
                                                img_match = re.search(img_pattern, photo_response.text)
                                                if img_match:
                                                    profile_pic_url = img_match.group(1)
                                                    break
                                    except Exception as e:
                                        logger.warning(f"Error fetching photo page: {e}")

                                # Unescape HTML entities
                                profile_pic_url = profile_pic_url.replace('&amp;', '&')
                                logger.info(f"Found profile picture using pattern: {pattern[:50]}...")

                                # Make sure we have a valid image URL
                                if 'fbcdn' in profile_pic_url or profile_pic_url.startswith('http'):
                                    break
                                else:
                                    profile_pic_url = None

                        # Try to extract full name
                        name_patterns = [
                            r'<title>([^<|]+)',
                            r'<meta\s+property="og:title"\s+content="([^"]+)"',
                            r'"name":\s*"([^"]+)"',
                        ]

                        for pattern in name_patterns:
                            match = re.search(pattern, html)
                            if match:
                                full_name = match.group(1).strip()
                                # Remove " | Facebook" or similar suffixes
                                full_name = re.sub(r'\s*[\|•]\s*Facebook.*$', '', full_name)
                                break

                        if profile_pic_url:
                            break

                except Exception as e:
                    logger.warning(f"Error fetching from {url}: {e}")
                    continue

            # If web scraping didn't work, try Graph API and follow redirects to get real image
            if not profile_pic_url:
                logger.info(f"Trying Graph API redirect for {graph_id}")

                # Graph API redirects to actual profile picture
                graph_url = f"https://graph.facebook.com/{graph_id}/picture?type=large&redirect=true&width=800&height=800"

                try:
                    # Follow the redirect to get the actual image URL
                    response = requests.get(graph_url, headers=headers, timeout=15, allow_redirects=True)

                    if response.status_code == 200 and 'fbcdn' in response.url:
                        # We got redirected to the actual CDN URL
                        profile_pic_url = response.url
                        profile_pic_url_hd = response.url.replace('_n.', '_o.').replace('_s.', '_o.')

                        # Try to get higher resolution
                        if '_s' in profile_pic_url_hd:
                            profile_pic_url_hd = re.sub(r'_s\d+x\d+', '_s1080x1080', profile_pic_url_hd)

                        logger.info(f"Successfully got Facebook picture via Graph API redirect")
                    else:
                        # Redirect didn't work, use Graph API URLs directly
                        profile_pic_url = f"https://graph.facebook.com/{graph_id}/picture?type=large&width=720&height=720"
                        profile_pic_url_hd = f"https://graph.facebook.com/{graph_id}/picture?type=large&width=1080&height=1080"
                        logger.warning(f"Graph API redirect failed, using direct API URLs")

                except Exception as e:
                    logger.error(f"Error following Graph API redirect: {e}")
                    # Fallback to direct Graph API URLs
                    profile_pic_url = f"https://graph.facebook.com/{graph_id}/picture?type=large&width=720&height=720"
                    profile_pic_url_hd = f"https://graph.facebook.com/{graph_id}/picture?type=large&width=1080&height=1080"
            else:
                # If we got a scraped URL, try to get HD version
                profile_pic_url_hd = profile_pic_url
                # Try to increase resolution in URL
                if '_s' in profile_pic_url:
                    profile_pic_url_hd = re.sub(r'_s\d+x\d+', '_s1080x1080', profile_pic_url)
                elif '_n' in profile_pic_url:
                    profile_pic_url_hd = profile_pic_url.replace('_n.', '_o.')

            return {
                'username': profile_id or username,
                'platform': 'facebook',
                'profile_pic_url': profile_pic_url,
                'profile_pic_url_hd': profile_pic_url_hd,
                'full_name': full_name or (username.replace('_', ' ').replace('.', ' ').title()),
                'bio': f'Facebook profile',
                'followers': 0,
                'following': 0,
                'is_verified': False,
            }

        except Exception as e:
            logger.error(f"Facebook profile fetch error: {e}")
            return self._get_fallback_profile(username, 'facebook')

    def _get_twitter_profile(self, username: str) -> Dict:
        """Get X (formerly Twitter) profile picture

        Note: X.com has very strong anti-bot protection.
        We try multiple approaches to get profile pictures.
        """
        try:
            logger.info(f"Attempting to fetch X profile for @{username}")

            # Approach 1: Try using a constructed pbs.twimg.com URL pattern
            # Many X profile pictures follow this pattern, try common variations
            common_profile_pic_patterns = [
                f"https://pbs.twimg.com/profile_images/{username}_normal.jpg",
                f"https://pbs.twimg.com/profile_images/{username}_400x400.jpg",
            ]

            # Approach 2: Try fetching from x.com with strong browser headers
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Cache-Control': 'max-age=0',
                'Referer': 'https://x.com/',
            }

            profile_pic_url = None

            # Try x.com
            try:
                profile_url = f"https://x.com/{username}"
                response = self.session.get(profile_url, headers=headers, timeout=20, allow_redirects=True)

                logger.info(f"X.com response status: {response.status_code}")

                if response.status_code == 200:
                    # Try multiple patterns to extract profile picture
                    patterns = [
                        # Pattern 1: Direct pbs.twimg.com URL with profile_images
                        r'(https://pbs\.twimg\.com/profile_images/[\d]+/[a-zA-Z0-9_-]+\.(jpg|png|webp))',
                        # Pattern 2: With escaped slashes
                        r'https:\\u002F\\u002Fpbs\.twimg\.com\\u002Fprofile_images\\u002F([\d]+)\\u002F([^"\\]+)',
                        # Pattern 3: Profile image in JSON format
                        r'"profile_image_url_https":"(https://pbs\.twimg\.com/profile_images/[^"]+)"',
                        # Pattern 4: OG image meta tag
                        r'<meta\s+property="og:image"\s+content="(https://pbs\.twimg\.com/profile_images/[^"]+)"',
                        # Pattern 5: Twitter card image
                        r'<meta\s+name="twitter:image"\s+content="(https://pbs\.twimg\.com/profile_images/[^"]+)"',
                        # Pattern 6: Any pbs.twimg.com profile image
                        r'(https://pbs\.twimg\.com/profile_images/[^\s"<>]+)',
                    ]

                    for pattern in patterns:
                        pic_match = re.search(pattern, response.text)
                        if pic_match:
                            if len(pic_match.groups()) > 1:
                                # Reconstruct URL from captured groups
                                profile_pic_url = f"https://pbs.twimg.com/profile_images/{pic_match.group(1)}/{pic_match.group(2)}"
                            else:
                                profile_pic_url = pic_match.group(1)

                            # Clean up escaped characters
                            profile_pic_url = profile_pic_url.replace('\\u002F', '/').replace('\\/', '/').replace('\\', '')
                            logger.info(f"✓ Found X profile picture using pattern: {pattern[:60]}...")
                            break

            except Exception as e:
                logger.warning(f"Failed to fetch from x.com: {e}")

            if profile_pic_url:
                # Get larger version by replacing size suffixes
                # X/Twitter sizes: _normal (48x48), _bigger (73x73), _mini (24x24), _400x400, _200x200
                profile_pic_url_hd = profile_pic_url
                if '_normal.' in profile_pic_url:
                    profile_pic_url_hd = profile_pic_url.replace('_normal.', '_400x400.')
                elif '_bigger.' in profile_pic_url:
                    profile_pic_url_hd = profile_pic_url.replace('_bigger.', '_400x400.')
                elif '_mini.' in profile_pic_url:
                    profile_pic_url_hd = profile_pic_url.replace('_mini.', '_400x400.')
                # If no size suffix, try adding _400x400 before extension
                elif not any(size in profile_pic_url for size in ['_400x400', '_200x200']):
                    # Try to add _400x400 before the file extension
                    if '.' in profile_pic_url:
                        parts = profile_pic_url.rsplit('.', 1)
                        if not parts[0].endswith(('_normal', '_bigger', '_mini')):
                            profile_pic_url_hd = f"{parts[0]}_400x400.{parts[1]}"

                logger.info(f"✓ X profile picture URL: {profile_pic_url[:100]}...")
                logger.info(f"✓ X HD profile picture URL: {profile_pic_url_hd[:100]}...")

                return {
                    'username': username,
                    'platform': 'twitter',
                    'profile_pic_url': profile_pic_url,
                    'profile_pic_url_hd': profile_pic_url_hd,
                    'full_name': username.replace('_', ' ').title(),
                    'bio': f'X (formerly Twitter) user @{username}',
                    'followers': 0,
                    'following': 0,
                    'is_verified': False,
                }

            logger.warning(f"Could not extract X profile picture for @{username}")
            logger.warning(f"X.com blocks automated profile picture fetching")

            # Return fallback but without error message to user
            fallback = self._get_fallback_profile(username, 'twitter')
            # Remove the error field so no error message is shown
            fallback.pop('error', None)
            fallback['bio'] = f'X profile: @{username} - Note: X blocks profile picture fetching'
            return fallback

        except Exception as e:
            logger.error(f"X profile fetch error: {e}")
            fallback = self._get_fallback_profile(username, 'twitter')
            fallback.pop('error', None)
            fallback['bio'] = f'X profile: @{username} - Profile pictures unavailable'
            return fallback

    def _get_tiktok_profile(self, username: str) -> Dict:
        """Get TikTok profile picture"""
        try:
            profile_url = f"https://www.tiktok.com/@{username}"
            response = self.session.get(profile_url, timeout=10)
            response.raise_for_status()

            # Extract TikTok profile picture
            pic_pattern = r'"avatarLarger":"([^"]+)"'
            pic_match = re.search(pic_pattern, response.text)

            if pic_match:
                profile_pic_url = pic_match.group(1).replace('\\u002F', '/')

                return {
                    'username': username,
                    'platform': 'tiktok',
                    'profile_pic_url': profile_pic_url,
                    'profile_pic_url_hd': profile_pic_url,
                    'full_name': username.replace('_', ' ').title(),
                    'bio': f'TikTok user @{username}',
                    'followers': 0,
                    'following': 0,
                    'is_verified': False,
                }

            return self._get_fallback_profile(username, 'tiktok')

        except Exception as e:
            logger.error(f"TikTok profile fetch error: {e}")
            return self._get_fallback_profile(username, 'tiktok')

    def _get_youtube_profile(self, username: str) -> Dict:
        """Get YouTube channel profile picture"""
        try:
            # YouTube profile URL patterns
            profile_url = f"https://www.youtube.com/@{username}"
            response = self.session.get(profile_url, timeout=10)
            response.raise_for_status()

            # Try multiple regex patterns to extract YouTube channel avatar
            patterns = [
                # Pattern 1: Standard avatar thumbnails array
                r'"avatar":\s*{\s*"thumbnails":\s*\[{\s*"url":\s*"([^"]+)"',
                # Pattern 2: Channel header avatar
                r'"channelAvatarViewModel":\s*{\s*"image":\s*{\s*"sources":\s*\[{\s*"url":\s*"([^"]+)"',
                # Pattern 3: Legacy pattern
                r'"width":88,"height":88}\],"accessibility":{"accessibilityData":{"label":"[^"]*"}}},"thumbnailUrl":"([^"]+)"',
                # Pattern 4: Another common pattern
                r'"avatar":{"thumbnails":\[{"url":"([^"]+)"',
                # Pattern 5: Image URL in videoOwnerRenderer
                r'"videoOwnerRenderer":\s*{[^}]*"thumbnail":\s*{[^}]*"thumbnails":\s*\[\s*{"url":\s*"([^"]+)"',
                # Pattern 6: Direct channel image
                r'<link\s+itemprop="image"\s+href="([^"]+)"',
                # Pattern 7: OG image meta tag
                r'<meta\s+property="og:image"\s+content="([^"]+)"',
            ]

            profile_pic_url = None
            for pattern in patterns:
                pic_match = re.search(pattern, response.text)
                if pic_match:
                    profile_pic_url = pic_match.group(1)
                    logger.info(f"✓ Found YouTube profile picture using pattern: {pattern[:50]}...")
                    break

            if profile_pic_url:
                # Clean up URL
                profile_pic_url = profile_pic_url.replace('\\u003d', '=').replace('\\/', '/')

                # Get higher resolution by replacing size parameter
                profile_pic_url_hd = profile_pic_url
                if '=s' in profile_pic_url:
                    # Replace size parameter (e.g., =s88-c to =s800-c)
                    profile_pic_url_hd = re.sub(r'=s\d+-', '=s800-', profile_pic_url)
                elif 's88-' in profile_pic_url:
                    profile_pic_url_hd = profile_pic_url.replace('s88-', 's800-')

                logger.info(f"✓ YouTube profile picture URL: {profile_pic_url[:100]}...")
                logger.info(f"✓ YouTube HD profile picture URL: {profile_pic_url_hd[:100]}...")

                return {
                    'username': username,
                    'platform': 'youtube',
                    'profile_pic_url': profile_pic_url,
                    'profile_pic_url_hd': profile_pic_url_hd,
                    'full_name': username.replace('_', ' ').title(),
                    'bio': f'YouTube channel @{username}',
                    'followers': 0,
                    'following': 0,
                    'is_verified': False,
                }

            logger.warning(f"Could not extract YouTube profile picture for @{username}")
            return self._get_fallback_profile(username, 'youtube')

        except Exception as e:
            logger.error(f"YouTube profile fetch error: {e}")
            return self._get_fallback_profile(username, 'youtube')

    def _get_linkedin_profile(self, username: str) -> Dict:
        """Get LinkedIn profile picture"""
        try:
            logger.info(f"Attempting to fetch LinkedIn profile for: {username}")

            # LinkedIn profile URL pattern - try both /in/ and company pages
            profile_urls = [
                f"https://www.linkedin.com/in/{username}/",
                f"https://www.linkedin.com/company/{username}/",
            ]

            # Headers to mimic browser request
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Cache-Control': 'max-age=0',
            }

            profile_pic_url = None

            for profile_url in profile_urls:
                try:
                    response = self.session.get(profile_url, headers=headers, timeout=15, allow_redirects=True)

                    if response.status_code == 200:
                        logger.info(f"LinkedIn response status: {response.status_code}")

                        # Try multiple regex patterns to extract profile picture
                        patterns = [
                            # Pattern 1: OG image meta tag (most reliable for LinkedIn)
                            r'<meta\s+property="og:image"\s+content="([^"]+)"',
                            # Pattern 2: Twitter image meta tag
                            r'<meta\s+name="twitter:image"\s+content="([^"]+)"',
                            # Pattern 3: Profile image in JSON-LD
                            r'"image":\s*"([^"]+)"',
                            # Pattern 4: Media CDN images
                            r'(https://media\.licdn\.com/[^"\s]+)',
                            # Pattern 5: Direct profile image
                            r'<img[^>]+class="[^"]*profile[^"]*"[^>]+src="([^"]+)"',
                        ]

                        for pattern in patterns:
                            pic_match = re.search(pattern, response.text)
                            if pic_match:
                                profile_pic_url = pic_match.group(1)
                                # Filter out small icons or generic images
                                if 'linkedin.com' in profile_pic_url and not any(x in profile_pic_url for x in ['icon', 'logo', 'feed-update-ghost']):
                                    logger.info(f"✓ Found LinkedIn profile picture using pattern: {pattern[:60]}...")
                                    break

                        if profile_pic_url:
                            break

                except Exception as e:
                    logger.warning(f"Failed to fetch from {profile_url}: {e}")
                    continue

            if profile_pic_url:
                # Clean up URL
                profile_pic_url = profile_pic_url.replace('\\u003d', '=').replace('\\/', '/')

                # Try to get higher resolution by modifying size parameters
                profile_pic_url_hd = profile_pic_url
                # LinkedIn images often have size parameters like shrink_200_200
                profile_pic_url_hd = re.sub(r'shrink_\d+_\d+', 'shrink_800_800', profile_pic_url)
                profile_pic_url_hd = re.sub(r'/\d+_\d+/', '/800_800/', profile_pic_url_hd)

                logger.info(f"✓ LinkedIn profile picture URL: {profile_pic_url[:100]}...")
                logger.info(f"✓ LinkedIn HD profile picture URL: {profile_pic_url_hd[:100]}...")

                return {
                    'username': username,
                    'platform': 'linkedin',
                    'profile_pic_url': profile_pic_url,
                    'profile_pic_url_hd': profile_pic_url_hd,
                    'full_name': username.replace('-', ' ').replace('_', ' ').title(),
                    'bio': f'LinkedIn professional @{username}',
                    'followers': 0,
                    'following': 0,
                    'is_verified': False,
                }

            logger.warning(f"Could not extract LinkedIn profile picture for {username}")
            logger.warning(f"LinkedIn requires authentication for reliable profile fetching")

            # Return fallback
            return {
                'username': username,
                'platform': 'linkedin',
                'profile_pic_url': f'https://ui-avatars.com/api/?name={quote(username)}&size=400&background=0077B5&color=fff',
                'profile_pic_url_hd': f'https://ui-avatars.com/api/?name={quote(username)}&size=1080&background=0077B5&color=fff',
                'full_name': username.replace('-', ' ').replace('_', ' ').title(),
                'bio': f'LinkedIn professional @{username}',
                'followers': 0,
                'following': 0,
                'is_verified': False,
            }

        except Exception as e:
            logger.error(f"LinkedIn profile fetch error: {e}")
            return self._get_fallback_profile(username, 'linkedin')

    def _get_whatsapp_profile(self, username: str) -> Dict:
        """Get WhatsApp profile picture (placeholder)"""
        try:
            # WhatsApp doesn't have public profiles
            # Using fallback avatar
            return {
                'username': username,
                'platform': 'whatsapp',
                'profile_pic_url': f'https://ui-avatars.com/api/?name={quote(username)}&size=400&background=25D366&color=fff',
                'profile_pic_url_hd': f'https://ui-avatars.com/api/?name={quote(username)}&size=1080&background=25D366&color=fff',
                'full_name': username.replace('_', ' ').title(),
                'bio': f'WhatsApp user {username}',
                'followers': 0,
                'following': 0,
                'is_verified': False,
            }

        except Exception as e:
            logger.error(f"WhatsApp profile fetch error: {e}")
            return self._get_fallback_profile(username, 'whatsapp')

    def _get_telegram_profile(self, username: str) -> Dict:
        """Get Telegram profile picture"""
        try:
            logger.info(f"Attempting to fetch Telegram profile for: {username}")

            profile_url = f"https://t.me/{username}"

            # Headers to mimic browser
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Cache-Control': 'max-age=0',
            }

            response = self.session.get(profile_url, headers=headers, timeout=15, allow_redirects=True)
            response.raise_for_status()

            logger.info(f"Telegram response status: {response.status_code}")

            # Try multiple patterns to extract Telegram profile picture
            patterns = [
                # Pattern 1: Direct tgme_page_photo_image class
                r'<img[^>]+class="tgme_page_photo_image"[^>]+src="([^"]+)"',
                # Pattern 2: OG image meta tag
                r'<meta\s+property="og:image"\s+content="([^"]+)"',
                # Pattern 3: Twitter card image
                r'<meta\s+name="twitter:image"\s+content="([^"]+)"',
                # Pattern 4: Any telegram CDN image
                r'(https://cdn\d*\.telesco\.pe/[^"\s]+)',
                # Pattern 5: Telegram file CDN
                r'(https://telegram\.org/file/[^"\s]+)',
            ]

            profile_pic_url = None
            for pattern in patterns:
                pic_match = re.search(pattern, response.text)
                if pic_match:
                    profile_pic_url = pic_match.group(1)
                    # Filter out small icons
                    if 'telegram' in profile_pic_url.lower() or 'telesco.pe' in profile_pic_url:
                        logger.info(f"✓ Found Telegram profile picture using pattern: {pattern[:60]}...")
                        break

            if profile_pic_url:
                # Clean up URL
                profile_pic_url = profile_pic_url.replace('\\/', '/')

                # Telegram images are already high quality, but we can try to get larger version
                profile_pic_url_hd = profile_pic_url
                # Some Telegram images have size parameters
                if '/160/' in profile_pic_url:
                    profile_pic_url_hd = profile_pic_url.replace('/160/', '/640/')
                elif '_160.' in profile_pic_url:
                    profile_pic_url_hd = profile_pic_url.replace('_160.', '_640.')

                logger.info(f"✓ Telegram profile picture URL: {profile_pic_url[:100]}...")
                logger.info(f"✓ Telegram HD profile picture URL: {profile_pic_url_hd[:100]}...")

                return {
                    'username': username,
                    'platform': 'telegram',
                    'profile_pic_url': profile_pic_url,
                    'profile_pic_url_hd': profile_pic_url_hd,
                    'full_name': username.replace('_', ' ').title(),
                    'bio': f'Telegram user @{username}',
                    'followers': 0,
                    'following': 0,
                    'is_verified': False,
                }

            logger.warning(f"Could not extract Telegram profile picture for @{username}")
            return self._get_fallback_profile(username, 'telegram')

        except Exception as e:
            logger.error(f"Telegram profile fetch error: {e}")
            return self._get_fallback_profile(username, 'telegram')

    def _get_fallback_profile(self, username: str, platform: str) -> Dict:
        """Get fallback profile data with UI Avatars"""
        # Platform-specific colors for UI Avatars
        colors = {
            'instagram': ('C13584', 'fff'),  # Instagram gradient color
            'facebook': ('1877F2', 'fff'),   # Facebook blue
            'twitter': ('1DA1F2', 'fff'),    # Twitter blue
            'tiktok': ('000000', 'fff'),     # TikTok black
            'youtube': ('FF0000', 'fff'),    # YouTube red
            'linkedin': ('0077B5', 'fff'),   # LinkedIn blue
            'whatsapp': ('25D366', 'fff'),   # WhatsApp green
            'telegram': ('0088cc', 'fff'),   # Telegram blue
        }

        bg_color, text_color = colors.get(platform, ('random', 'fff'))

        return {
            'username': username,
            'platform': platform,
            'profile_pic_url': f'https://ui-avatars.com/api/?name={quote(username)}&size=400&background={bg_color}&color={text_color}&bold=true',
            'profile_pic_url_hd': f'https://ui-avatars.com/api/?name={quote(username)}&size=1080&background={bg_color}&color={text_color}&bold=true',
            'full_name': username.replace('_', ' ').replace('.', ' ').replace('-', ' ').title(),
            'bio': f'{platform.title()} user @{username}',
            'followers': 0,
            'following': 0,
            'is_verified': False,
            'error': f'Username "@{username}" not found on {platform.title()}. Please check and try again.',
        }

    def download_profile_picture(self, profile_pic_url: str, username: str, platform: str) -> bytes:
        """
        Download profile picture and return as bytes

        Args:
            profile_pic_url: URL of the profile picture
            username: Username
            platform: Platform name

        Returns:
            Image bytes
        """
        try:
            response = self.session.get(profile_pic_url, timeout=15)
            response.raise_for_status()
            logger.info(f"Successfully downloaded profile picture for {username} from {platform}")
            return response.content

        except Exception as e:
            logger.error(f"Error downloading profile picture: {e}")
            raise
