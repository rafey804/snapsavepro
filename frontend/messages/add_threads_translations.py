import json

# English translations
en_threads = {
    "threads": {
        "title": "Threads Video Downloader",
        "subtitle": "Download Threads videos in HD quality - Fast, Free & Easy - Supports all video types",
        "placeholder": "Paste Threads video URL here...",
        "downloadButton": "Download",
        "videoMode": "Video",
        "audioMode": "Audio",
        "noFormats": "No video formats available for this video",
        "errorFetch": "Failed to fetch video information. Please check the URL and try again.",
        "howToUse": "How to Use",
        "step1": "Copy the Threads video URL from your browser",
        "step2": "Paste the URL in the input field above",
        "step3": "Click Download and choose your preferred quality",
        "features": {
            "title": "Why Choose Our Threads Downloader?",
            "quality": "HD Quality",
            "qualityDesc": "Download videos in high definition quality",
            "speed": "Fast Download",
            "speedDesc": "Quick processing and instant downloads",
            "free": "100% Free",
            "freeDesc": "No fees, no subscriptions, completely free",
            "safe": "Safe & Secure",
            "safeDesc": "Your privacy is protected, no data collected"
        }
    }
}

# Load English file
with open('en.json', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

# Add threads translations
en_data['threads'] = en_threads['threads']

# Add to downloaders menu
if 'downloaders' not in en_data:
    en_data['downloaders'] = {}

en_data['downloaders']['threads'] = {
    "name": "Threads Video Downloader",
    "description": "Download Threads videos in HD quality"
}

# Save
with open('en.json', 'w', encoding='utf-8') as f:
    json.dump(en_data, f, ensure_ascii=False, indent=2)

print("English translations added successfully!")
