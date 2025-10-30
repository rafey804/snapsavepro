const fs = require('fs');
const path = require('path');

// Hindi translations
const hiPath = path.join(__dirname, '../../messages/hi.json');
const hiData = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

hiData.footer = {
  ...hiData.footer,
  description: "अपने पसंदीदा सोशल मीडिया प्लेटफॉर्म से वीडियो डाउनलोड करने के लिए अंतिम उपकरण। तेज़, सुरक्षित और विश्वसनीय।",
  downloaders: "डाउनलोडर",
  instagramReels: "Instagram Reels डाउनलोड",
  youtubeShorts: "YouTube Shorts डाउनलोड",
  pinterestVideo: "Pinterest वीडियो डाउनलोड",
  snapchatVideo: "Snapchat वीडियो डाउनलोड",
  redditVideo: "Reddit वीडियो डाउनलोड",
  twitterVideo: "Twitter/X वीडियो डाउनलोड",
  linkedinVideo: "LinkedIn वीडियो डाउनलोड",
  home: "होम",
  howItWorks: "यह कैसे काम करता है",
  faq: "सामान्य प्रश्न",
  contact: "संपर्क करें",
  privacyPolicy: "गोपनीयता नीति",
  termsOfService: "सेवा की शर्तें",
  support: "सहायता",
  copyright: "© {year} SnapSavePro। सर्वाधिकार सुरक्षित।",
  developedBy: "द्वारा विकसित",
  madeWithLove: "समुदाय के लिए ❤️ के साथ बनाया गया"
};

fs.writeFileSync(hiPath, JSON.stringify(hiData, null, 2), 'utf8');

// Chinese translations
const zhPath = path.join(__dirname, '../../messages/zh.json');
const zhData = JSON.parse(fs.readFileSync(zhPath, 'utf8'));

zhData.footer = {
  ...zhData.footer,
  description: "从您最喜欢的社交媒体平台下载视频的终极工具。快速、安全、可靠。",
  downloaders: "下载器",
  instagramReels: "Instagram Reels 下载",
  youtubeShorts: "YouTube Shorts 下载",
  pinterestVideo: "Pinterest 视频下载",
  snapchatVideo: "Snapchat 视频下载",
  redditVideo: "Reddit 视频下载",
  twitterVideo: "Twitter/X 视频下载",
  linkedinVideo: "LinkedIn 视频下载",
  home: "首页",
  howItWorks: "使用方法",
  faq: "常见问题",
  contact: "联系我们",
  privacyPolicy: "隐私政策",
  termsOfService: "服务条款",
  support: "支持",
  copyright: "© {year} SnapSavePro。保留所有权利。",
  developedBy: "开发者",
  madeWithLove: "用❤️为社区打造"
};

fs.writeFileSync(zhPath, JSON.stringify(zhData, null, 2), 'utf8');

// Urdu translations
const urPath = path.join(__dirname, '../../messages/ur.json');
const urData = JSON.parse(fs.readFileSync(urPath, 'utf8'));

urData.footer = {
  ...urData.footer,
  description: "اپنے پسندیدہ سوشل میڈیا پلیٹ فارمز سے ویڈیوز ڈاؤن لوڈ کرنے کے لیے حتمی ٹول۔ تیز، محفوظ اور قابل اعتماد۔",
  downloaders: "ڈاؤن لوڈرز",
  instagramReels: "Instagram Reels ڈاؤن لوڈ",
  youtubeShorts: "YouTube Shorts ڈاؤن لوڈ",
  pinterestVideo: "Pinterest ویڈیو ڈاؤن لوڈ",
  snapchatVideo: "Snapchat ویڈیو ڈاؤن لوڈ",
  redditVideo: "Reddit ویڈیو ڈاؤن لوڈ",
  twitterVideo: "Twitter/X ویڈیو ڈاؤن لوڈ",
  linkedinVideo: "LinkedIn ویڈیو ڈاؤن لوڈ",
  home: "ہوم",
  howItWorks: "یہ کیسے کام کرتا ہے",
  faq: "عمومی سوالات",
  contact: "رابطہ کریں",
  privacyPolicy: "رازداری کی پالیسی",
  termsOfService: "سروس کی شرائط",
  support: "سپورٹ",
  copyright: "© {year} SnapSavePro۔ تمام حقوق محفوظ ہیں۔",
  developedBy: "تیار کردہ",
  madeWithLove: "کمیونٹی کے لیے ❤️ کے ساتھ بنایا گیا"
};

fs.writeFileSync(urPath, JSON.stringify(urData, null, 2), 'utf8');

console.log('✅ All footer translations updated successfully!');
console.log('  - Hindi (hi.json)');
console.log('  - Chinese (zh.json)');
console.log('  - Urdu (ur.json)');
