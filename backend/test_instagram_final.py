import sys
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)

# Import the Instagram downloader
from instagram import InstagramDownloader

# Test URL
test_url = "https://www.instagram.com/reel/DLe1o79Mk67/"

print(f"\n{'='*60}")
print("Testing Instagram Downloader with instagrapi")
print(f"{'='*60}\n")
print(f"Testing URL: {test_url}\n")

try:
    # Get video info
    print("Fetching video info...")
    video_info = InstagramDownloader.get_video_info(test_url)

    print(f"\n{'='*60}")
    print("SUCCESS! Instagram download working!")
    print(f"{'='*60}\n")

    print(f"Title: {video_info['title'][:100]}...")
    print(f"Uploader: {video_info['uploader']}")
    print(f"Views: {video_info['view_count']}")
    print(f"Likes: {video_info['like_count']}")
    print(f"Comments: {video_info['comment_count']}")
    print(f"Thumbnail: {video_info['thumbnail'][:80]}..." if video_info['thumbnail'] else "No thumbnail")

    video_formats = video_info['formats']['video_formats']
    if video_formats:
        print(f"\nVideo URL: {video_formats[0]['direct_url'][:100]}...")
        print(f"Quality: {video_formats[0]['quality']}")

    print(f"\n{'='*60}")
    print("Instagram integration is working perfectly!")
    print(f"{'='*60}\n")

except Exception as e:
    print(f"\n{'='*60}")
    print("ERROR!")
    print(f"{'='*60}\n")
    print(f"Error: {str(e)}")
    import traceback
    traceback.print_exc()
    print(f"\n{'='*60}\n")
