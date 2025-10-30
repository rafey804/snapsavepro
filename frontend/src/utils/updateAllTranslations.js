const fs = require('fs');
const path = require('path');

// Chinese translations
const zhPath = path.join(__dirname, '../../messages/zh.json');
const zhData = JSON.parse(fs.readFileSync(zhPath, 'utf8'));

zhData.home = {
  ...zhData.home,
  pasteUrl: "在此粘贴TikTok链接...",
  pasteUrlLong: "在此粘贴TikTok链接... (例如, https://www.tiktok.com/@user/video/123)",
  getVideo: "获取视频",
  paste: "粘贴",
  watermarkFree: "无水印下载",
  videoDownloads: "视频下载",
  audioDownloads: "音频下载 (MP3)",
  readyToDownload: "准备下载",
  noVideoFormats: "此TikTok没有可用的视频格式。",
  noAudioFormats: "此TikTok没有可用的音频格式。",
  downloaded: "已下载",
  downloading: "下载中...",
  startingDownload: "开始下载...",
  processingVideo: "处理TikTok视频中...",
  invalidUrl: "请提供有效的TikTok链接",
  copyright: "© 2025 TikTok下载器。以高清质量下载无水印视频。",
  supportText: "支持所有TikTok视频格式 • 快速下载 • 无需注册"
};

fs.writeFileSync(zhPath, JSON.stringify(zhData, null, 2), 'utf8');

// Urdu translations
const urPath = path.join(__dirname, '../../messages/ur.json');
const urData = JSON.parse(fs.readFileSync(urPath, 'utf8'));

urData.home = {
  ...urData.home,
  pasteUrl: "یہاں TikTok URL پیسٹ کریں...",
  pasteUrlLong: "یہاں TikTok URL پیسٹ کریں... (مثال کے طور پر, https://www.tiktok.com/@user/video/123)",
  getVideo: "ویڈیو حاصل کریں",
  paste: "پیسٹ کریں",
  watermarkFree: "واٹر مارک کے بغیر ڈاؤن لوڈ",
  videoDownloads: "ویڈیو ڈاؤن لوڈز",
  audioDownloads: "آڈیو ڈاؤن لوڈز (MP3)",
  readyToDownload: "ڈاؤن لوڈ کے لیے تیار",
  noVideoFormats: "اس TikTok کے لیے کوئی ویڈیو فارمیٹ دستیاب نہیں۔",
  noAudioFormats: "اس TikTok کے لیے کوئی آڈیو فارمیٹ دستیاب نہیں۔",
  downloaded: "ڈاؤن لوڈ ہو گیا",
  downloading: "ڈاؤن لوڈ ہو رہا ہے...",
  startingDownload: "ڈاؤن لوڈ شروع ہو رہا ہے...",
  processingVideo: "TikTok ویڈیو پراسیس ہو رہی ہے...",
  invalidUrl: "براہ کرم ایک درست TikTok URL فراہم کریں",
  copyright: "© 2025 TikTok ڈاؤن لوڈر۔ HD معیار میں واٹر مارک کے بغیر ویڈیوز ڈاؤن لوڈ کریں۔",
  supportText: "تمام TikTok ویڈیو فارمیٹس کی حمایت • تیز ڈاؤن لوڈز • رجسٹریشن کی ضرورت نہیں"
};

fs.writeFileSync(urPath, JSON.stringify(urData, null, 2), 'utf8');

console.log('✅ All translations updated successfully!');
console.log('  - Chinese (zh.json)');
console.log('  - Urdu (ur.json)');
