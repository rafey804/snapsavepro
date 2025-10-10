import yt_dlp
import time
from flask import jsonify
from utils import get_best_thumbnail, detect_audio_in_format, get_production_download_opts

class TiktokDownloader:
    def __init__(self):
        self.platform = 'tiktok'
    
    def get_robust_tiktok_opts(self, base_opts=None, attempt=0):
        """Ultra-robust TikTok options that handle all known issues"""
        if base_opts is None:
            base_opts = {}

        # Different configurations for different attempts
        user_agents = [
            'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.179 Mobile Safari/537.36',
            'com.zhiliaoapp.musically/2023405020 (Linux; U; Android 13; en_US; Pixel 6; Build/TP1A.220624.021; Cronet/124.0.6367.179)',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        ]

        current_ua = user_agents[attempt % len(user_agents)]
        
        tiktok_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
            'socket_timeout': 60,
            'retries': 5,
            'fragment_retries': 5,
            'file_access_retries': 3,
            'extractor_retries': 5,
            'skip_unavailable_fragments': True,
            'ignoreerrors': False,
            'no_color': True,
            'user_agent': current_ua,
            'format_sort': ['res', 'ext:mp4:m4a'],
            'format_sort_force': True,
            'http_chunk_size': 5242880,
            'concurrent_fragment_downloads': 1,
            
            # Enhanced headers
            'http_headers': {
                'User-Agent': current_ua,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.tiktok.com/',
                'Origin': 'https://www.tiktok.com',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'cross-site',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
            },
            
            # TikTok extractor args with multiple fallback strategies
            'extractor_args': {
                'tiktok': {
                    'api_hostname': [
                        'api16-normal-c-useast1a.tiktokv.com',
                        'api19-normal-c-useast1a.tiktokv.com',
                        'api22-normal-c-useast1a.tiktokv.com',
                        'api16-core-c-useast1a.tiktokv.com',
                        'api16-normal-c-useast2a.tiktokv.com'
                    ][attempt % 5],
                    'webpage_api': attempt < 3,  # Try webpage API first
                    'mobile_api': attempt >= 1,   # Then mobile API
                    'app_version': '34.1.2',
                    'manifest_app_version': '2023405020',
                    'aid': '1988',
                    'app_name': 'musical_ly'
                }
            },

            # Additional options for better compatibility
            'geo_bypass': True,
            'geo_bypass_country': 'US',
        }

        # Merge production options to prevent blocking
        production_opts = get_production_download_opts()
        tiktok_opts.update(production_opts)
        tiktok_opts.update(base_opts)
        return tiktok_opts
    
    def get_video_info(self, url):
        """Extract TikTok video information"""
        max_attempts = 4
        last_error = None
        
        for attempt in range(max_attempts):
            try:
                print(f"TikTok attempt {attempt + 1}/{max_attempts}")
                
                ydl_opts = self.get_robust_tiktok_opts({
                    'noplaylist': True,
                    'extract_flat': False,
                }, attempt)
                
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(url, download=False)
                    
                    if not info:
                        raise Exception('Could not extract video information')
                    
                    duration = info.get('duration', 0)
                    print(f"TikTok extraction successful - Duration: {duration}s")
                    
                    # Better thumbnail handling
                    thumbnail_url = get_best_thumbnail(info)
                    
                    # Enhanced title handling
                    title = info.get('title', '') or info.get('fulltitle', '') or 'TikTok Video'
                    if not title or title == 'NA':
                        uploader = info.get('uploader', '') or info.get('creator', '') or info.get('uploader_id', '')
                        title = f"{uploader} - TikTok Video" if uploader else "TikTok Video"
                    
                    video_info = {
                        'title': title,
                        'duration': duration,
                        'view_count': info.get('view_count', 0),
                        'uploader': info.get('uploader', '') or info.get('creator', '') or info.get('uploader_id', 'Unknown'),
                        'uploader_id': info.get('uploader_id', ''),
                        'thumbnail': thumbnail_url,
                        'description': (info.get('description', '')[:200] + '...') if info.get('description', '') else '',
                        'upload_date': info.get('upload_date', ''),
                        'like_count': info.get('like_count', 0),
                        'comment_count': info.get('comment_count', 0),
                        'repost_count': info.get('repost_count', 0),
                        'platform': 'tiktok',
                        'formats': []
                    }
                    
                    # Process formats with better audio detection
                    formats = info.get('formats', [])
                    if not formats:
                        raise Exception('No formats available')
                    
                    video_formats = []
                    audio_formats = []
                    
                    for fmt in formats:
                        if not fmt.get('format_id'):
                            continue
                            
                        vcodec = fmt.get('vcodec', 'none')
                        acodec = fmt.get('acodec', 'none')
                        height = fmt.get('height') or 0
                        ext = fmt.get('ext', '')
                        
                        if ext not in ['mp4', 'm4a', 'webm']:
                            continue
                        
                        if vcodec != 'none' and height > 0:
                            video_formats.append(fmt)
                        elif acodec != 'none':
                            audio_formats.append(fmt)
                    
                    # Process video formats
                    processed_video = []
                    for fmt in sorted(video_formats, key=lambda x: x.get('height') or 0, reverse=True):
                        height = fmt.get('height') or 0
                        if height < 144:
                            continue
                            
                        quality = f"{height}p"
                        ext = fmt.get('ext', 'mp4')
                        has_audio = detect_audio_in_format(fmt)
                        
                        format_data = {
                            'quality': quality,
                            'type': 'video',
                            'format_id': fmt['format_id'],
                            'ext': ext,
                            'filesize': fmt.get('filesize', 0),
                            'fps': fmt.get('fps', 30),
                            'width': fmt.get('width', 0),
                            'height': height,
                            'has_audio': has_audio,
                            'platform': 'tiktok',
                            'watermark_free': True,
                            'duration': duration,
                            'audio_description': 'With Audio' if has_audio else 'Video Only'
                        }
                        processed_video.append(format_data)
                    
                    # Process audio formats and create audio-only versions
                    processed_audio = []
                    
                    # Direct audio formats
                    for fmt in sorted(audio_formats, key=lambda x: x.get('abr') or 0, reverse=True):
                        abr = fmt.get('abr') or 128
                        quality_level = f"{int(abr)}kbps" if abr else "128kbps"
                        
                        format_data = {
                            'quality': quality_level,
                            'type': 'audio',
                            'format_id': fmt['format_id'],
                            'ext': 'mp3',
                            'filesize': fmt.get('filesize', 0),
                            'abr': abr,
                            'platform': 'tiktok',
                            'description': f"Audio ({quality_level})"
                        }
                        processed_audio.append(format_data)
                    
                    # Add audio extraction from best video formats
                    if processed_video and not processed_audio:
                        for fmt in processed_video[:2]:  # Top 2 video qualities
                            if fmt.get('has_audio'):
                                # Safe filesize calculation with None check
                                original_filesize = fmt.get('filesize', 0) or 0
                                estimated_audio_size = max(original_filesize // 10, 500000) if original_filesize > 0 else 500000  # 500KB minimum estimate
                                
                                audio_format = {
                                    'quality': f"{fmt['quality']} Audio",
                                    'type': 'audio',
                                    'format_id': fmt['format_id'],
                                    'ext': 'mp3',
                                    'filesize': estimated_audio_size,
                                    'abr': 192,
                                    'platform': 'tiktok',
                                    'description': f"Audio extracted from {fmt['quality']} video",
                                    'source': 'video'
                                }
                                processed_audio.append(audio_format)
                    
                    video_info['formats'] = {
                        'video_formats': processed_video[:8],
                        'audio_formats': processed_audio[:6]
                    }
                    
                    print(f"TikTok success - Video: {len(processed_video)}, Audio: {len(processed_audio)}")
                    return jsonify(video_info)
                    
            except yt_dlp.DownloadError as e:
                last_error = e
                error_msg = str(e).lower()
                print(f"TikTok attempt {attempt + 1} failed: {error_msg}")
                
                if 'private' in error_msg or 'unavailable' in error_msg or 'not found' in error_msg:
                    break
                
                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue
                else:
                    raise e
                    
            except Exception as e:
                last_error = e
                print(f"TikTok attempt {attempt + 1} exception: {str(e)}")
                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue
                else:
                    raise e
        
        # Handle final error
        if last_error:
            error_msg = str(last_error)
            if 'signature' in error_msg.lower():
                return jsonify({'error': 'TikTok signature error. Please try again in a few minutes.'}), 400
            elif 'private' in error_msg.lower():
                return jsonify({'error': 'This TikTok video is private or requires login.'}), 400
            elif 'unavailable' in error_msg.lower():
                return jsonify({'error': 'TikTok video unavailable or deleted.'}), 400
            else:
                return jsonify({'error': 'TikTok video could not be processed.'}), 400