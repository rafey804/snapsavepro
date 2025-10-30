const fs = require('fs');
const path = require('path');

// Hindi translations
const hiPath = path.join(__dirname, '../../messages/hi.json');
const hiData = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

hiData.header = {
  ...hiData.header,
  socialMediaDownloaders: "सोशल मीडिया डाउनलोडर",
  helpAndResources: "सहायता और संसाधन",
  howToUse: "उपयोग कैसे करें",
  faq: "सामान्य प्रश्न",
  contactSupport: "संपर्क सहायता",
  aboutUs: "हमारे बारे में",
  allPlatformsSupport: "सभी प्लेटफार्म HD गुणवत्ता डाउनलोड का समर्थन करते हैं • तेज़ और मुफ्त • पंजीकरण की आवश्यकता नहीं",
  needHelp: "मदद चाहिए? हम आपके लिए 24/7 यहां हैं"
};

fs.writeFileSync(hiPath, JSON.stringify(hiData, null, 2), 'utf8');

// Chinese translations
const zhPath = path.join(__dirname, '../../messages/zh.json');
const zhData = JSON.parse(fs.readFileSync(zhPath, 'utf8'));

zhData.header = {
  ...zhData.header,
  socialMediaDownloaders: "社交媒体下载器",
  helpAndResources: "帮助和资源",
  howToUse: "使用方法",
  faq: "常见问题",
  contactSupport: "联系支持",
  aboutUs: "关于我们",
  allPlatformsSupport: "所有平台支持高清下载 • 快速免费 • 无需注册",
  needHelp: "需要帮助吗？我们为您提供24/7全天候服务"
};

fs.writeFileSync(zhPath, JSON.stringify(zhData, null, 2), 'utf8');

// Urdu translations
const urPath = path.join(__dirname, '../../messages/ur.json');
const urData = JSON.parse(fs.readFileSync(urPath, 'utf8'));

urData.header = {
  ...urData.header,
  socialMediaDownloaders: "سوشل میڈیا ڈاؤن لوڈرز",
  helpAndResources: "مدد اور وسائل",
  howToUse: "استعمال کیسے کریں",
  faq: "عمومی سوالات",
  contactSupport: "رابطہ سپورٹ",
  aboutUs: "ہمارے بارے میں",
  allPlatformsSupport: "تمام پلیٹ فارمز HD معیار کی ڈاؤن لوڈ کی حمایت کرتے ہیں • تیز اور مفت • رجسٹریشن کی ضرورت نہیں",
  needHelp: "مدد چاہیے؟ ہم آپ کے لیے 24/7 موجود ہیں"
};

fs.writeFileSync(urPath, JSON.stringify(urData, null, 2), 'utf8');

console.log('✅ All header translations updated successfully!');
console.log('  - Hindi (hi.json)');
console.log('  - Chinese (zh.json)');
console.log('  - Urdu (ur.json)');
