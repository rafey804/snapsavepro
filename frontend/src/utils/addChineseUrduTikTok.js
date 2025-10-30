const fs = require('fs');
const path = require('path');

// Chinese translations (simplified - basic structure for now)
const zhPath = path.join(__dirname, '../../messages/zh.json');
const zhData = JSON.parse(fs.readFileSync(zhPath, 'utf8'));

zhData.seo = zhData.seo || {};
zhData.seo.tiktokContent = {
  mainTitle: "TikTok 视频下载器无水印 - 免费快速",
  introduction: {
    para1: "欢迎使用 Snap Save Pro，终极无水印 TikTok 视频下载器。我们强大的工具可让您以高质量下载 TikTok 视频，完全免费，且无任何水印。",
    para2: "TikTok 已成为世界上最受欢迎的社交媒体平台之一，拥有超过 10 亿活跃用户，每天创建和分享短视频。"
  },
  whyChoose: {
    title: "为什么选择 Snap Save Pro 下载 TikTok？",
    noWatermark: { title: "无水印下载", description: "与其他工具不同，我们提供 100% 无水印下载。" },
    hdQuality: { title: "高清质量下载", description: "我们保留原始视频质量，提供 HD、Full HD 甚至 4K 下载。" },
    noRegistration: { title: "无需注册", description: "无需创建账户即可立即开始下载。" },
    audioSupport: { title: "音频下载支持", description: "以 MP3 格式从 TikTok 视频中提取音频。" }
  },
  howItWorks: {
    title: "如何下载无水印 TikTok 视频",
    description: "使用 Snap Save Pro 下载 TikTok 视频非常简单。",
    step1: { title: "打开 TikTok 应用或网站", description: "找到您想下载的 TikTok 视频。" },
    step2: { title: "复制视频链接", description: "点击 TikTok 视频上的\"分享\"按钮并选择\"复制链接\"。" },
    step3: { title: "粘贴并下载", description: "将复制的链接粘贴到 Snap Save Pro 的输入框中，点击\"下载\"。" }
  },
  advancedFeatures: {
    title: "TikTok 视频下载的高级功能",
    description: "Snap Save Pro 不只是另一个 TikTok 下载器。",
    unlimited: "无限下载：无每日限制，无高级计划。",
    mobileFriendly: "移动友好界面：我们的响应式设计在 iPhone、Android、iPad 上完美运行。",
    fastProcessing: "闪电般快速处理：我们的优化服务器在几秒钟内处理您的下载。",
    batchDownload: "批量下载支持：需要下载多个 TikTok 视频？",
    formatConversion: "格式转换：以 MP4 格式下载视频或提取音频为 MP3。"
  },
  benefits: {
    title: "使用 TikTok 视频下载器的好处",
    description: "数百万用户依赖 TikTok 视频下载器的原因数不胜数。",
    contentCreation: "内容创作和转发",
    offlineViewing: "离线观看",
    backup: "备份和存档",
    educational: "教育目的",
    marketing: "营销和分析"
  },
  safetyPrivacy: {
    title: "Snap Save Pro 安全合法吗？",
    safety: "安全性：绝对安全！",
    privacy: "隐私：我们 100% 尊重您的隐私。",
    legal: "法律免责声明：我们的工具下载公开可用的 TikTok 视频。"
  },
  proTips: {
    title: "TikTok 视频下载专业提示",
    tip1: "选择正确的质量",
    tip2: "检查视频方向",
    tip3: "尽早下载热门内容",
    tip4: "明智地使用音频提取",
    tip5: "整理您的下载"
  },
  closing: {
    title: "立即开始下载 TikTok 视频",
    para1: "加入数百万信任 Snap Save Pro 的满意用户。",
    para2: "无论您是在构建内容库、保存回忆还是创建合集视频。",
    para3: "准备好下载了吗？在上面粘贴您的 TikTok 视频链接！"
  }
};

fs.writeFileSync(zhPath, JSON.stringify(zhData, null, 2), 'utf8');
console.log('✅ Chinese TikTok content translations added!');

// Urdu translations
const urPath = path.join(__dirname, '../../messages/ur.json');
const urData = JSON.parse(fs.readFileSync(urPath, 'utf8'));

urData.seo = urData.seo || {};
urData.seo.tiktokContent = {
  mainTitle: "TikTok ویڈیو ڈاؤن لوڈر بغیر واٹر مارک کے - مفت اور تیز",
  introduction: {
    para1: "Snap Save Pro میں خوش آمدید، حتمی بغیر واٹر مارک کے TikTok ویڈیو ڈاؤن لوڈر۔ ہمارا طاقتور ٹول آپ کو اعلیٰ معیار میں TikTok ویڈیوز ڈاؤن لوڈ کرنے کی اجازت دیتا ہے۔",
    para2: "TikTok دنیا کے سب سے مقبول سوشل میڈیا پلیٹ فارمز میں سے ایک بن گیا ہے۔"
  },
  whyChoose: {
    title: "TikTok ڈاؤن لوڈز کے لیے Snap Save Pro کیوں منتخب کریں؟",
    noWatermark: { title: "واٹر مارک کے بغیر ڈاؤن لوڈز", description: "دوسرے ٹولز کے برعکس، ہم 100% واٹر مارک سے پاک ڈاؤن لوڈز فراہم کرتے ہیں۔" },
    hdQuality: { title: "HD معیار کی ڈاؤن لوڈز", description: "ہم اصل ویڈیو کوالٹی کو محفوظ رکھتے ہیں۔" },
    noRegistration: { title: "رجسٹریشن کی ضرورت نہیں", description: "اکاؤنٹ بنائے بغیر فوری طور پر ڈاؤن لوڈ کرنا شروع کریں۔" },
    audioSupport: { title: "آڈیو ڈاؤن لوڈ سپورٹ", description: "MP3 فارمیٹ میں TikTok ویڈیوز سے آڈیو نکالیں۔" }
  },
  howItWorks: {
    title: "بغیر واٹر مارک کے TikTok ویڈیوز کیسے ڈاؤن لوڈ کریں",
    description: "Snap Save Pro کے ساتھ TikTok ویڈیوز ڈاؤن لوڈ کرنا ناقابل یقین حد تک آسان ہے۔",
    step1: { title: "TikTok ایپ یا ویب سائٹ کھولیں", description: "وہ TikTok ویڈیو تلاش کریں جسے آپ ڈاؤن لوڈ کرنا چاہتے ہیں۔" },
    step2: { title: "ویڈیو لنک کاپی کریں", description: "TikTok ویڈیو پر \"شیئر\" بٹن پر ٹیپ کریں۔" },
    step3: { title: "پیسٹ کریں اور ڈاؤن لوڈ کریں", description: "کاپی شدہ لنک کو Snap Save Pro کے ان پٹ فیلڈ میں پیسٹ کریں۔" }
  },
  advancedFeatures: {
    title: "TikTok ویڈیو ڈاؤن لوڈز کے لیے جدید خصوصیات",
    description: "Snap Save Pro صرف ایک اور TikTok ڈاؤن لوڈر نہیں ہے۔",
    unlimited: "لامحدود ڈاؤن لوڈز: کوئی روزانہ کی حد نہیں۔",
    mobileFriendly: "موبائل فرینڈلی انٹرفیس",
    fastProcessing: "بجلی کی تیز رفتار پروسیسنگ",
    batchDownload: "بیچ ڈاؤن لوڈ سپورٹ",
    formatConversion: "فارمیٹ تبدیلی"
  },
  benefits: {
    title: "TikTok ویڈیو ڈاؤن لوڈر استعمال کرنے کے فوائد",
    description: "لاکھوں صارفین TikTok ویڈیو ڈاؤن لوڈرز پر بھروسہ کرنے کی بے شمار وجوہات ہیں۔",
    contentCreation: "مواد کی تخلیق اور دوبارہ پوسٹنگ",
    offlineViewing: "آف لائن دیکھنا",
    backup: "بیک اپ اور آرکائیو",
    educational: "تعلیمی مقاصد",
    marketing: "مارکیٹنگ اور تجزیہ"
  },
  safetyPrivacy: {
    title: "کیا Snap Save Pro محفوظ اور قانونی ہے؟",
    safety: "حفاظت: بالکل!",
    privacy: "رازداری: ہم آپ کی رازداری کا 100% احترام کرتے ہیں۔",
    legal: "قانونی دستبرداری"
  },
  proTips: {
    title: "TikTok ویڈیو ڈاؤن لوڈز کے لیے پرو ٹپس",
    tip1: "صحیح معیار منتخب کریں",
    tip2: "ویڈیو کی سمت چیک کریں",
    tip3: "رجحان ساز مواد جلد ڈاؤن لوڈ کریں",
    tip4: "آڈیو نکالنے کا دانشمندی سے استعمال کریں",
    tip5: "اپنی ڈاؤن لوڈز کو منظم کریں"
  },
  closing: {
    title: "آج ہی TikTok ویڈیوز ڈاؤن لوڈ کرنا شروع کریں",
    para1: "لاکھوں مطمئن صارفین میں شامل ہوں۔",
    para2: "چاہے آپ مواد کی لائبریری بنا رہے ہوں۔",
    para3: "ڈاؤن لوڈ کے لیے تیار ہیں؟"
  }
};

fs.writeFileSync(urPath, JSON.stringify(urData, null, 2), 'utf8');
console.log('✅ Urdu TikTok content translations added!');

console.log('\n🎉 All language TikTok content translations completed!');
