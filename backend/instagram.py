import yt_dlp
import time
from flask import jsonify
from utils import get_best_thumbnail, detect_audio_in_format

class InstagramDownloader:
    def __init__(self):
        self.platform = 'instagram'
    
    def get_robust_instagram_opts(self, base_opts=None, attempt=0):
        """Enhanced Instagram options with session handling"""
        if base_opts is None:
            base_opts = {}
        
        user_agents = [
            'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Linux; Android 11; SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
            'Instagram 200.0.0.28.127 Android (28/9; 320dpi; 720x1448; samsung; SM-A515F; a51; exynos9611; en_US; 312662218)',
        ]
        
        current_ua = user_agents[attempt % len(user_agents)]
        
        instagram_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'socket_timeout': 90,
            'retries': 8,
            'fragment_retries': 8,
            'file_access_retries': 5,
            'extractor_retries': 8,
            'skip_unavailable_fragments': True,
            'ignoreerrors': False,
            'no_color': True,
            'user_agent': current_ua,
            # Better format selection for videos with audio
            'format': 'best[height<=1080]/best',
            'format_sort': ['res:1080', 'ext:mp4:m4a', 'hasaud', 'size'],
            'format_sort_force': True,
            'http_chunk_size': 8388608,
            'concurrent_fragment_downloads': 1,
            'writeinfojson': False,
            'writethumbnail': False,
            'writedescription': False,
            'writesubtitles': False,
            
            # Instagram-specific headers
            'http_headers': {
                'User-Agent': current_ua,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.instagram.com/',
                'Origin': 'https://www.instagram.com',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
            },
            
            # Instagram extractor args
            'extractor_args': {
                'instagram': {
                    'api_hostname': 'i.instagram.com',
                    'webpage_api': True,
                    'mobile_api': True
                }
            },
        }
        
        instagram_opts.update(base_opts)
        return instagram_opts
    
    def get_instagram_content_type(self, url):
        """Determine Instagram content type"""
        if '/p/' in url:
            return 'post'
        elif '/reel/' in url or '/reels/' in url:
            return 'reel'
        elif '/tv/' in url:
            return 'igtv'
        else:
            return 'post'
    
    def get_video_info(self, url):
        """Extract Instagram video information"""
        max_attempts = 3
        last_error = None
        
        for attempt in range(max_attempts):
            try:
                print(f"Instagram attempt {attempt + 1}/{max_attempts}")
                
                ydl_opts = self.get_robust_instagram_opts({
                    'noplaylist': True,
                    'extract_flat': False,
                }, attempt)
                
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(url, download=False)
                    
                    if not info:
                        raise Exception('Could not extract Instagram content')
                    
                    duration = info.get('duration', 0)
                    content_type = self.get_instagram_content_type(url)
                    print(f"Instagram extraction successful - Type: {content_type}, Duration: {duration}s")
                    
                    # ENHANCED: Better thumbnail handling with multiple fallbacks
                    thumbnail_url = get_best_thumbnail(info)
                    print(f"Thumbnail URL found: {thumbnail_url}")
                    
                    # Enhanced title handling for Instagram
                    title = info.get('title', '') or info.get('fulltitle', '')
                    if not title or title == 'NA':
                        uploader = info.get('uploader', '') or info.get('creator', '') or info.get('uploader_id', '')
                        if uploader:
                            title = f"{uploader} - Instagram {content_type.title()}"
                        else:
                            title = f"Instagram {content_type.title()}"
                    
                    video_info = {
                        'title': title,
                        'duration': duration,
                        'view_count': info.get('view_count', 0),
                        'uploader': info.get('uploader', '') or info.get('creator', '') or info.get('uploader_id', 'Unknown'),
                        'uploader_id': info.get('uploader_id', ''),
                        'thumbnail': thumbnail_url,
                        'description': (info.get('description', '')[:150] + '...') if info.get('description', '') else '',
                        'upload_date': info.get('upload_date', ''),
                        'like_count': info.get('like_count', 0),
                        'comment_count': info.get('comment_count', 0),
                        'content_type': content_type,
                        'platform': 'instagram',
                        'formats': []
                    }
                    
                    formats = info.get('formats', [])
                    if not formats:
                        raise Exception('No formats available')
                    
                    print(f"Found {len(formats)} formats")
                    
                    video_formats = []
                    audio_formats = []
                    
                    # ENHANCED: Better format processing with improved audio detection
                    for fmt in formats:
                        if not fmt.get('format_id'):
                            continue
                            
                        vcodec = fmt.get('vcodec', 'none')
                        acodec = fmt.get('acodec', 'none')
                        height = fmt.get('height') or 0
                        ext = fmt.get('ext', '')
                        
                        print(f"Format: {fmt.get('format_id')} - vcodec: {vcodec}, acodec: {acodec}, height: {height}, ext: {ext}")
                        
                        if ext not in ['mp4', 'm4a', 'webm', 'mov']:
                            continue
                        
                        if vcodec != 'none' and height > 0:
                            video_formats.append(fmt)
                        elif acodec != 'none':
                            audio_formats.append(fmt)
                    
                    # Process video formats with enhanced audio detection
                    processed_video = []
                    for fmt in sorted(video_formats, key=lambda x: x.get('height') or 0, reverse=True):
                        try:
                            height = fmt.get('height') or 0
                            if height < 144:
                                continue
                                
                            quality = f"{height}p"
                            ext = fmt.get('ext', 'mp4')
                            
                            # ENHANCED: Better audio detection - assume Instagram videos have audio by default
                            has_audio = detect_audio_in_format(fmt)
                            # For Instagram reels and posts, assume audio is present unless explicitly noted as video-only
                            if not has_audio and content_type in ['reel', 'post'] and fmt.get('acodec', 'none') != 'none':
                                has_audio = True
                            
                            print(f"Video format {fmt.get('format_id')}: {quality}, has_audio: {has_audio}")
                            
                            # Safe filesize handling
                            filesize = fmt.get('filesize') or 0
                            if filesize is None:
                                filesize = 0
                            
                            format_data = {
                                'quality': quality,
                                'type': 'video',
                                'format_id': fmt['format_id'],
                                'ext': ext,
                                'filesize': filesize,
                                'width': fmt.get('width') or 0,
                                'height': height,
                                'has_audio': has_audio,
                                'content_type': content_type,
                                'platform': 'instagram',
                                'duration': duration,
                                'audio_description': 'With Audio' if has_audio else 'Video Only',
                                'fps': fmt.get('fps') or 30,
                                'vcodec': fmt.get('vcodec', ''),
                                'acodec': fmt.get('acodec', ''),
                                'format_note': fmt.get('format_note', '')
                            }
                            processed_video.append(format_data)
                        except Exception as fmt_error:
                            print(f"Error processing video format {fmt.get('format_id', 'unknown')}: {fmt_error}")
                            continue
                    
                    # Process audio formats
                    processed_audio = []
                    
                    # Direct audio formats
                    for fmt in sorted(audio_formats, key=lambda x: x.get('abr') or 0, reverse=True):
                        try:
                            abr = fmt.get('abr') or 128
                            quality_level = f"{int(abr)}kbps" if abr else "128kbps"
                            
                            # Safe filesize handling
                            filesize = fmt.get('filesize') or 0
                            if filesize is None:
                                filesize = 0
                            
                            format_data = {
                                'quality': quality_level,
                                'type': 'audio',
                                'format_id': fmt['format_id'],
                                'ext': 'mp3',
                                'filesize': filesize,
                                'abr': abr,
                                'platform': 'instagram',
                                'description': f"Audio ({quality_level})"
                            }
                            processed_audio.append(format_data)
                        except Exception as fmt_error:
                            print(f"Error processing audio format {fmt.get('format_id', 'unknown')}: {fmt_error}")
                            continue
                    
                    # ENHANCED: Create audio extraction options from video formats
                    if processed_video:
                        for idx, fmt in enumerate(processed_video[:3]):  # Top 3 video qualities
                            # Safe filesize calculation with None check
                            original_filesize = fmt.get('filesize', 0) or 0
                            estimated_audio_size = max(original_filesize // 12, 1000000) if original_filesize > 0 else 1000000  # 1MB minimum estimate
                            
                            audio_format = {
                                'quality': f"Audio from {fmt['quality']}",
                                'type': 'audio',
                                'format_id': fmt['format_id'],
                                'ext': 'mp3',
                                'filesize': estimated_audio_size,
                                'abr': 192 if idx == 0 else 128,  # Higher quality for first format
                                'platform': 'instagram',
                                'description': f"Audio extracted from {fmt['quality']} video",
                                'source': 'video'
                            }
                            processed_audio.append(audio_format)
                    
                    video_info['formats'] = {
                        'video_formats': processed_video[:6],
                        'audio_formats': processed_audio[:8],
                        'content_type': content_type
                    }
                    
                    print(f"Instagram success - Video: {len(processed_video)}, Audio: {len(processed_audio)}")
                    print(f"Thumbnail URL in response: {thumbnail_url}")
                    return jsonify(video_info)
                    
            except yt_dlp.DownloadError as e:
                last_error = e
                error_msg = str(e).lower()
                print(f"Instagram attempt {attempt + 1} failed: {error_msg}")
                
                if 'login' in error_msg or 'cookie' in error_msg:
                    if attempt < max_attempts - 1:
                        time.sleep(3 + attempt)
                        continue
                    else:
                        return jsonify({
                            'error': 'Instagram requires authentication for this content.',
                            'suggestion': 'Try with a public Instagram post or reel that doesn\'t require login.'
                        }), 400
                
                if 'private' in error_msg or 'unavailable' in error_msg:
                    break
                
                if attempt < max_attempts - 1:
                    time.sleep(3 + attempt)
                    continue
                else:
                    raise e
                    
            except Exception as e:
                last_error = e
                print(f"Instagram attempt {attempt + 1} exception: {str(e)}")
                if attempt < max_attempts - 1:
                    time.sleep(3 + attempt)
                    continue
                else:
                    raise e
        
        # Handle final Instagram error
        if last_error:
            error_msg = str(last_error)
            if 'login' in error_msg.lower() or 'cookie' in error_msg.lower():
                return jsonify({
                    'error': 'Instagram authentication required.',
                    'suggestion': 'This Instagram content requires login. Please try with a different public post.'
                }), 400
            elif 'private' in error_msg.lower():
                return jsonify({'error': 'This Instagram content is private.'}), 400
            elif 'unavailable' in error_msg.lower():
                return jsonify({'error': 'Instagram content unavailable or deleted.'}), 400
            else:
                return jsonify({'error': 'Instagram content could not be processed.'}), 400