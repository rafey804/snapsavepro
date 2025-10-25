from instascrape import Reel

url = "https://www.instagram.com/reel/DLe1o79Mk67/"

print(f"Testing URL: {url}")

try:
    reel = Reel(url)
    reel.scrape()

    print(f"SUCCESS! Got reel data")
    print(f"Likes: {reel.likes}")
    print(f"Video URL: {reel.video_url[:100]}...")
    print(f"Thumbnail: {reel.display_url[:100]}...")

except Exception as e:
    print(f"Error: {str(e)}")
    print(f"Error type: {type(e).__name__}")
    import traceback
    traceback.print_exc()
