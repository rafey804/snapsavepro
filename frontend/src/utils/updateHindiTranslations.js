const fs = require('fs');
const path = require('path');

// Read Hindi JSON
const hiPath = path.join(__dirname, '../../messages/hi.json');
const hiData = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

// Add missing keys to home section
hiData.home = {
  ...hiData.home,
  pasteUrl: "यहाँ TikTok URL पेस्ट करें...",
  pasteUrlLong: "यहाँ TikTok URL पेस्ट करें... (जैसे, https://www.tiktok.com/@user/video/123)",
  getVideo: "वीडियो प्राप्त करें",
  paste: "पेस्ट करें",
  watermarkFree: "वॉटरमार्क-मुक्त डाउनलोड",
  videoDownloads: "वीडियो डाउनलोड",
  audioDownloads: "ऑडियो डाउनलोड (MP3)",
  readyToDownload: "डाउनलोड के लिए तैयार",
  noVideoFormats: "इस TikTok के लिए कोई वीडियो प्रारूप उपलब्ध नहीं है।",
  noAudioFormats: "इस TikTok के लिए कोई ऑडियो प्रारूप उपलब्ध नहीं है।",
  downloaded: "डाउनलोड हो गया",
  downloading: "डाउनलोड हो रहा है...",
  startingDownload: "डाउनलोड शुरू हो रहा है...",
  processingVideo: "TikTok वीडियो प्रोसेस हो रहा है...",
  invalidUrl: "कृपया एक वैध TikTok URL प्रदान करें",
  copyright: "© 2025 TikTok डाउनलोडर। HD गुणवत्ता में बिना वॉटरमार्क के वीडियो डाउनलोड करें।",
  supportText: "सभी TikTok वीडियो प्रारूपों का समर्थन करता है • तेज़ डाउनलोड • पंजीकरण की आवश्यकता नहीं"
};

// Write back
fs.writeFileSync(hiPath, JSON.stringify(hiData, null, 2), 'utf8');

console.log('✅ Hindi translations updated successfully!');
