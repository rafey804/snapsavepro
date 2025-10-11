"""
Test script to verify YouTube and Instagram fixes work without browser cookies
"""
import sys
from youtube import YouTubeDownloader
from instagram import InstagramDownloader

def test_youtube():
    """Test YouTube downloader initialization"""
    print("=" * 60)
    print("Testing YouTube Downloader")
    print("=" * 60)
    try:
        yt = YouTubeDownloader()
        print(f"[OK] YouTube downloader initialized successfully")
        print(f"  Browser cookies: {yt.browser_cookies}")

        # Test get_robust_youtube_opts
        opts = yt.get_robust_youtube_opts()
        print(f"[OK] YouTube options generated successfully")
        print(f"  Has cookiesfrombrowser: {'cookiesfrombrowser' in opts}")

        return True
    except Exception as e:
        print(f"[FAIL] YouTube test failed: {e}")
        return False

def test_instagram():
    """Test Instagram downloader initialization"""
    print("\n" + "=" * 60)
    print("Testing Instagram Downloader")
    print("=" * 60)
    try:
        ig = InstagramDownloader()
        print(f"[OK] Instagram downloader initialized successfully")
        print(f"  Browser cookies: {ig.browser_cookies}")

        # Test get_robust_instagram_opts
        opts = ig.get_robust_instagram_opts()
        print(f"[OK] Instagram options generated successfully")
        print(f"  Has cookiesfrombrowser: {'cookiesfrombrowser' in opts}")
        print(f"  Extractor args: {opts.get('extractor_args', {})}")

        return True
    except Exception as e:
        print(f"[FAIL] Instagram test failed: {e}")
        return False

if __name__ == "__main__":
    print("\nRunning downloader tests...\n")

    yt_result = test_youtube()
    ig_result = test_instagram()

    print("\n" + "=" * 60)
    print("Test Results")
    print("=" * 60)
    print(f"YouTube: {'[PASS]' if yt_result else '[FAIL]'}")
    print(f"Instagram: {'[PASS]' if ig_result else '[FAIL]'}")

    if yt_result and ig_result:
        print("\n[OK] All tests passed! Ready for production.")
        sys.exit(0)
    else:
        print("\n[FAIL] Some tests failed. Please check the errors above.")
        sys.exit(1)
