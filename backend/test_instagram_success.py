# -*- coding: utf-8 -*-
import sys
import io
import logging
import json

# Fix console encoding for emojis
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# Setup logging
logging.basicConfig(level=logging.INFO)

# Import the Instagram downloader
from instagram import InstagramDownloader

# Test URL
test_url = "https://www.instagram.com/reel/DLe1o79Mk67/"

print("\n" + "="*60)
print("Testing Instagram Downloader with instagrapi")
print("="*60 + "\n")
print(f"Testing URL: {test_url}\n")

try:
    # Get video info
    print("Fetching video info...")
    video_info = InstagramDownloader.get_video_info(test_url)

    print("\n" + "="*60)
    print("SUCCESS! Instagram download working!")
    print("="*60 + "\n")

    print(f"Title: {video_info['title'][:100]}")
    print(f"Uploader: {video_info['uploader']}")
    print(f"Views: {video_info['view_count']:,}")
    print(f"Likes: {video_info['like_count']:,}")
    print(f"Comments: {video_info['comment_count']:,}")
    print(f"Thumbnail: {video_info['thumbnail'][:80] if video_info['thumbnail'] else 'No thumbnail'}...")

    video_formats = video_info['formats']['video_formats']
    if video_formats:
        print(f"\nVideo URL: {video_formats[0]['direct_url'][:100]}...")
        print(f"Quality: {video_formats[0]['quality']}")
        print(f"Extension: {video_formats[0]['ext']}")

    print("\n" + "="*60)
    print("Instagram integration is working perfectly!")
    print("="*60 + "\n")

    # Save to JSON for verification
    with open('instagram_test_result.json', 'w', encoding='utf-8') as f:
        json.dump(video_info, f, indent=2, ensure_ascii=False)
    print("Saved full result to: instagram_test_result.json\n")

except Exception as e:
    print("\n" + "="*60)
    print("ERROR!")
    print("="*60 + "\n")
    print(f"Error: {str(e)}")
    import traceback
    traceback.print_exc()
    print("\n" + "="*60 + "\n")
