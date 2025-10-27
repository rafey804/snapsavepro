#!/usr/bin/env python3
"""
Extract YouTube cookies from Chrome browser
"""
import yt_dlp
import os

def extract_cookies():
    """Extract cookies from Chrome and save to file"""
    try:
        print("Extracting cookies from Chrome browser...")

        # Create yt-dlp instance with cookie extraction
        ydl_opts = {
            'cookiesfrombrowser': ('chrome',),
            'quiet': True,
            'no_warnings': True,
        }

        # Extract cookies by attempting to get video info
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # Try to extract info from a YouTube video to trigger cookie extraction
            try:
                ydl.extract_info('https://www.youtube.com/watch?v=dQw4w9WgXcQ', download=False)
            except:
                pass  # We just need cookies, not actual video info

            # Save cookies to file
            cookie_file = os.path.join(os.path.dirname(__file__), 'youtube_cookies.txt')
            ydl.cookiejar.save(cookie_file, ignore_discard=True, ignore_expires=True)

        print(f"✓ Cookies successfully extracted to: {cookie_file}")
        print(f"✓ Cookie file size: {os.path.getsize(cookie_file)} bytes")
        return cookie_file

    except Exception as e:
        print(f"✗ Error extracting cookies: {str(e)}")
        print("\nTrying Firefox as fallback...")

        try:
            # Fallback to Firefox
            ydl_opts = {
                'cookiesfrombrowser': ('firefox',),
                'quiet': True,
                'no_warnings': True,
            }

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                try:
                    ydl.extract_info('https://www.youtube.com/watch?v=dQw4w9WgXcQ', download=False)
                except:
                    pass

                cookie_file = os.path.join(os.path.dirname(__file__), 'youtube_cookies.txt')
                ydl.cookiejar.save(cookie_file, ignore_discard=True, ignore_expires=True)

            print(f"✓ Cookies successfully extracted from Firefox to: {cookie_file}")
            print(f"✓ Cookie file size: {os.path.getsize(cookie_file)} bytes")
            return cookie_file

        except Exception as e2:
            print(f"✗ Error extracting cookies from Firefox: {str(e2)}")
            print("\n" + "="*60)
            print("MANUAL SOLUTION:")
            print("="*60)
            print("1. Install Chrome extension: 'Get cookies.txt LOCALLY'")
            print("2. Visit youtube.com and make sure you're logged in")
            print("3. Click the extension icon and export cookies")
            print("4. Save the file as 'youtube_cookies.txt' in this directory")
            print("="*60)
            return None

if __name__ == '__main__':
    extract_cookies()
