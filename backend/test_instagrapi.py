from instagrapi import Client
import re

url = "https://www.instagram.com/reel/DLe1o79Mk67/"
match = re.search(r'instagram\.com/(?:p|reel|reels|tv)/([A-Za-z0-9_-]+)', url)
shortcode = match.group(1)

print(f"Testing shortcode: {shortcode}")

cl = Client()

# Try different methods
try:
    # Method 1: Try media_pk_from_url
    print("\n=== Method 1: media_pk_from_url ===")
    media_pk = cl.media_pk_from_url(url)
    print(f"Media PK: {media_pk}")

    # Get media info
    media = cl.media_info(media_pk)
    print(f"SUCCESS! Got media info")
    print(f"Type: {media.media_type}")
    if media.media_type == 2:  # Video
        print(f"Video URL: {media.video_url[:150]}...")
        print(f"Thumbnail: {media.thumbnail_url[:100]}...")
    print(f"Likes: {media.like_count}")
    print(f"Views: {media.view_count if hasattr(media, 'view_count') else 'N/A'}")

except Exception as e:
    print(f"Error: {str(e)}")
    print(f"Error type: {type(e).__name__}")
