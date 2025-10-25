from instagrapi import Client
from instagrapi.exceptions import LoginRequired
import re

url = "https://www.instagram.com/reel/DLe1o79Mk67/"
match = re.search(r'instagram\.com/(?:p|reel|reels|tv)/([A-Za-z0-9_-]+)', url)
shortcode = match.group(1)

print(f"Testing shortcode: {shortcode}")

cl = Client()

# Try using public methods (no login required)
try:
    print("\n=== Trying public extraction ===")

    # Get media PK
    media_pk = cl.media_pk_from_url(url)
    print(f"Media PK: {media_pk}")

    # Try to get public info
    try:
        # Use the public API endpoint
        media = cl.media_info(media_pk)
        print(f"SUCCESS with login!")
    except LoginRequired:
        print("Login required, trying alternative methods...")

        # Try using requests to get public data
        import requests
        import json

        # Instagram public API
        public_url = f"https://www.instagram.com/p/{shortcode}/?__a=1&__d=dis"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': '*/*',
            'X-IG-App-ID': '936619743392459',
        }

        response = requests.get(public_url, headers=headers)
        print(f"Response status: {response.status_code}")

        if response.status_code == 200:
            try:
                data = response.json()
                print("Got JSON data!")
                print(json.dumps(data, indent=2)[:500])
            except:
                print("Not JSON, HTML response")

except Exception as e:
    print(f"Error: {str(e)}")
    print(f"Error type: {type(e).__name__}")
    import traceback
    traceback.print_exc()
