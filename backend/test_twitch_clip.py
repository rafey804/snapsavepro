import yt_dlp
import json

url = "https://www.twitch.tv/arrowcs/clip/AuspiciousAmericanPistachioNinjaGrumpy-CF9NnWuQaQVIgmfq"

opts = {
    'quiet': False,
    'no_warnings': False,
}

with yt_dlp.YoutubeDL(opts) as ydl:
    info = ydl.extract_info(url, download=False)

    print("\n" + "="*60)
    print(f"Title: {info.get('title')}")
    print(f"Duration: {info.get('duration')}")
    print(f"Total formats: {len(info.get('formats', []))}")
    print("="*60)

    formats = info.get('formats', [])
    for i, fmt in enumerate(formats):
        print(f"\nFormat {i+1}:")
        print(f"  ID: {fmt.get('format_id')}")
        print(f"  Extension: {fmt.get('ext')}")
        print(f"  vcodec: {fmt.get('vcodec')}")
        print(f"  acodec: {fmt.get('acodec')}")
        print(f"  Height: {fmt.get('height')}")
        print(f"  FPS: {fmt.get('fps')}")
        print(f"  Format note: {fmt.get('format_note')}")
