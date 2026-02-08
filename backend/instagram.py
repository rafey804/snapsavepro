import yt_dlp
import time
import re
import logging
from flask import jsonify
from utils import get_best_thumbnail, detect_audio_in_format, get_production_download_opts

logger = logging.getLogger(__name__)

class InstagramDownloader:
    def __init__(self):
        self.platform = 'instagram'
    
    def get_robust_instagram_opts(self, base_opts=None, attempt=0):
        """Robust Instagram options for yt-dlp"""
        if base_opts is None:
            base_opts = {}

        user_agents = [
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15',
        ]

        current_ua = user_agents[attempt % len(user_agents)]
        
        instagram_opts = {
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
            
            # Enhanced headers for Instagram
            'http_headers': {
                'User-Agent': current_ua,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.instagram.com/',
                'Origin': 'https://www.instagram.com',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Dest': 'document',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
            },
            
            # Geo bypass for Instagram
            'geo_bypass': True,
            'geo_bypass_country': 'US',
            
            # Instagram-specific extractor args
            'extractor_args': {
                'instagram': {
                    'direct': True,
                }
            },
        }

        # Merge production options
        production_opts = get_production_download_opts()
        instagram_opts.update(production_opts)
        instagram_opts.update(base_opts)
        return instagram_opts
    
    @staticmethod
    def extract_shortcode(url):
        """Extract shortcode from Instagram URL"""
        patterns = [
            r'instagram\.com/(?:p|reel|reels|tv)/([A-Za-z0-9_-]+)',
            r'instagr\.am/(?:p|reel)/([A-Za-z0-9_-]+)',
        ]
        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
        return None
    
    def get_video_info(self, url, return_json=True):
        """Extract Instagram video/reel information using yt-dlp
        
        Args:
            url: Instagram URL
            return_json: If True, return Flask jsonify response. If False, return plain dict.
        """
        max_attempts = 4
        last_error = None
        
        # Validate URL first
        shortcode = self.extract_shortcode(url)
        if not shortcode:
            if return_json:
                return jsonify({'error': 'Invalid Instagram URL. Please provide a valid Instagram post/reel URL.'}), 400
            else:
                raise Exception('Invalid Instagram URL. Please provide a valid Instagram post/reel URL.')
        
        for attempt in range(max_attempts):
            try:
                logger.info(f"Instagram attempt {attempt + 1}/{max_attempts} for shortcode: {shortcode}")
                
                ydl_opts = self.get_robust_instagram_opts({
                    'noplaylist': True,
                    'extract_flat': False,
                }, attempt)
                
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    info = ydl.extract_info(url, download=False)
                    
                    if not info:
                        raise Exception('Could not extract video information')
                    
                    duration = info.get('duration', 0) or 0
                    logger.info(f"Instagram extraction successful - Duration: {duration}s")
                    
                    # Better thumbnail handling
                    thumbnail_url = get_best_thumbnail(info)
                    
                    # Enhanced title handling
                    title = info.get('title', '') or info.get('fulltitle', '') or info.get('description', '')[:100] or 'Instagram Video'
                    if not title or title == 'NA':
                        uploader = info.get('uploader', '') or info.get('creator', '') or info.get('uploader_id', '')
                        title = f"{uploader} - Instagram Video" if uploader else "Instagram Video"
                    
                    # Truncate title if too long
                    if len(title) > 100:
                        title = title[:100] + "..."
                    
                    video_info = {
                        'title': title,
                        'duration': duration,
                        'view_count': info.get('view_count', 0) or 0,
                        'uploader': info.get('uploader', '') or info.get('creator', '') or info.get('uploader_id', 'Unknown'),
                        'uploader_id': info.get('uploader_id', ''),
                        'thumbnail': thumbnail_url,
                        'description': (info.get('description', '')[:200] + '...') if info.get('description', '') else '',
                        'upload_date': info.get('upload_date', ''),
                        'like_count': info.get('like_count', 0) or 0,
                        'comment_count': info.get('comment_count', 0) or 0,
                        'platform': 'instagram',
                        'formats': []
                    }
                    
                    # Process formats
                    formats = info.get('formats', [])
                    if not formats:
                        # Try to get URL directly for single format
                        direct_url = info.get('url')
                        if direct_url:
                            video_info['formats'] = {
                                'video_formats': [{
                                    'quality': 'Best Available',
                                    'type': 'video',
                                    'format_id': 'best',
                                    'ext': 'mp4',
                                    'filesize': 0,
                                    'direct_url': direct_url,
                                    'width': info.get('width', 0),
                                    'height': info.get('height', 0),
                                    'has_audio': True,
                                    'platform': 'instagram',
                                    'watermark_free': True,
                                    'duration': duration,
                                    'resolution': 'HD'
                                }],
                                'audio_formats': []
                            }
                            logger.info("Instagram success - Single format extracted")
                            if return_json:
                                return jsonify(video_info)
                            return video_info
                        else:
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
                        
                        if ext not in ['mp4', 'm4a', 'webm', 'mp3']:
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
                            'filesize': fmt.get('filesize', 0) or 0,
                            'fps': fmt.get('fps', 30),
                            'width': fmt.get('width', 0),
                            'height': height,
                            'has_audio': has_audio,
                            'platform': 'instagram',
                            'watermark_free': True,
                            'duration': duration,
                            'audio_description': 'With Audio' if has_audio else 'Video Only',
                            'direct_url': fmt.get('url', '')  # Direct download URL from yt-dlp
                        }
                        processed_video.append(format_data)
                    
                    # If no video formats found, create a default one
                    if not processed_video:
                        direct_url = info.get('url') or (formats[0].get('url') if formats else None)
                        if direct_url or formats:
                            best_fmt = formats[0] if formats else {}
                            processed_video.append({
                                'quality': 'Best Available',
                                'type': 'video',
                                'format_id': best_fmt.get('format_id', 'best'),
                                'ext': 'mp4',
                                'filesize': best_fmt.get('filesize', 0) or 0,
                                'direct_url': direct_url or best_fmt.get('url', ''),
                                'width': info.get('width', 0),
                                'height': info.get('height', 0),
                                'has_audio': True,
                                'platform': 'instagram',
                                'watermark_free': True,
                                'duration': duration,
                                'resolution': 'HD'
                            })
                    
                    # Process audio formats
                    processed_audio = []
                    for fmt in sorted(audio_formats, key=lambda x: x.get('abr') or 0, reverse=True):
                        abr = fmt.get('abr') or 128
                        quality_level = f"{int(abr)}kbps"
                        
                        format_data = {
                            'quality': quality_level,
                            'type': 'audio',
                            'format_id': fmt['format_id'],
                            'ext': 'mp3',
                            'filesize': fmt.get('filesize', 0) or 0,
                            'abr': abr,
                            'platform': 'instagram',
                            'description': f"Audio ({quality_level})"
                        }
                        processed_audio.append(format_data)
                    
                    video_info['formats'] = {
                        'video_formats': processed_video[:8],
                        'audio_formats': processed_audio[:6]
                    }
                    
                    logger.info(f"Instagram success - Video: {len(processed_video)}, Audio: {len(processed_audio)}")
                    if return_json:
                        return jsonify(video_info)
                    return video_info
                    
            except yt_dlp.DownloadError as e:
                last_error = e
                error_msg = str(e).lower()
                logger.warning(f"Instagram attempt {attempt + 1} failed: {error_msg}")
                
                if 'private' in error_msg or 'login' in error_msg or 'not found' in error_msg:
                    break
                
                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue
                else:
                    raise e
                    
            except Exception as e:
                last_error = e
                logger.warning(f"Instagram attempt {attempt + 1} exception: {str(e)}")
                if attempt < max_attempts - 1:
                    time.sleep(2 + attempt)
                    continue
                else:
                    raise e
        
        # Handle final error
        if last_error:
            error_msg = str(last_error).lower()
            logger.error(f"Instagram final error: {error_msg}")
            
            if 'private' in error_msg or 'login' in error_msg:
                if return_json:
                    return jsonify({'error': 'This Instagram video is private. Only public videos can be downloaded.'}), 400
                raise Exception('This Instagram video is private. Only public videos can be downloaded.')
            elif 'not found' in error_msg or '404' in error_msg:
                if return_json:
                    return jsonify({'error': 'Instagram video not found. It may have been deleted.'}), 400
                raise Exception('Instagram video not found. It may have been deleted.')
            elif 'rate' in error_msg or 'limit' in error_msg:
                if return_json:
                    return jsonify({'error': 'Instagram rate limit reached. Please try again in a few minutes.'}), 429
                raise Exception('Instagram rate limit reached. Please try again in a few minutes.')
            else:
                if return_json:
                    return jsonify({'error': 'Instagram video could not be processed. Please check the URL and try again.'}), 400
                raise Exception('Instagram video could not be processed. Please check the URL and try again.')
        
        if return_json:
            return jsonify({'error': 'Failed to process Instagram video.'}), 400
        raise Exception('Failed to process Instagram video.')

    @staticmethod
    def download_video(url, format_id='best', output_path='downloads'):
        """
        Download Instagram video - now uses yt-dlp
        """
        try:
            import os
            
            # Create output directory
            os.makedirs(output_path, exist_ok=True)
            
            ydl_opts = {
                'format': format_id if format_id != 'best' else 'best',
                'outtmpl': os.path.join(output_path, '%(title)s.%(ext)s'),
                'quiet': True,
                'no_warnings': True,
                'geo_bypass': True,
            }
            
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                filename = ydl.prepare_filename(info)
                logger.info(f"Successfully downloaded: {filename}")
                return filename
                
        except Exception as e:
            logger.error(f"Download failed: {str(e)}")
            raise Exception(f"Download failed: {str(e)}")
