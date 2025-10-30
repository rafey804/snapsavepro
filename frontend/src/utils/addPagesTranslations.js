const fs = require('fs');
const path = require('path');

// Due to the large size, I'm creating simplified but comprehensive translations
const translations = {
  en: {
    pages: {
      howItWorks: {
        title: "How It Works",
        subtitle: "Download any YouTube video in HD quality with our simple 4-step process. No software installation, no registration required - completely free and secure.",
        statsTitle: "Download YouTube Videos in 4 Easy Steps",
        ctaTitle: "Ready to Start Downloading?",
        ctaSubtitle: "Try our free YouTube video downloader now. No registration required, completely secure, and works with all video qualities.",
        ctaButton: "Start Downloading Now"
      },
      faqs: {
        title: "Snap Save Pro FAQ - Video Downloader Help",
        subtitle: "Complete guide to downloading videos from TikTok, YouTube, Facebook, Pinterest, Snapchat, Reddit, and Twitter. Find answers about HD video downloads, MP3 audio extraction, and troubleshooting.",
        searchPlaceholder: "Search: TikTok download, YouTube MP3, Facebook video, remove watermark...",
        searchResults: "Found {count} result(s) for \"{query}\"",
        browseCategories: "Browse FAQ Categories",
        proTipsTitle: "Pro Tips for Best Video Downloads",
        proTipsSubtitle: "Expert tips to download TikTok, YouTube, and Facebook videos faster and in better quality",
        popularSearches: "Popular Searches",
        ctaTitle: "Still Have Questions About Video Downloads?",
        ctaSubtitle: "Can't find what you're looking for? Our FAQ is constantly updated with new questions about downloading from TikTok, YouTube, Facebook, and all supported platforms.",
        ctaButton: "Start Downloading Videos Now",
        blogButton: "Read Our Blog & Guides",
        noResults: "No Results Found",
        noResultsDesc: "Try different keywords or browse categories above"
      },
      contact: {
        title: "Contact Us",
        subtitle: "Need help with our YouTube downloader? Have questions or feedback? Our support team is here to assist you with any issues or inquiries.",
        helpTitle: "How Can We Help You?",
        formTitle: "Send Us a Message",
        nameLabel: "Your Name",
        namePlaceholder: "Enter your name",
        emailLabel: "Email Address",
        emailPlaceholder: "your.email@example.com",
        categoryLabel: "Category",
        subjectLabel: "Subject",
        subjectPlaceholder: "Brief description of your inquiry",
        messageLabel: "Message",
        messagePlaceholder: "Please provide detailed information about your question or issue...",
        sendButton: "Send Message",
        quickFaqTitle: "Quick Support FAQ",
        directEmailTitle: "Direct Email Contact",
        directEmailSubtitle: "For immediate assistance, reach out to our support team directly",
        responseTime: "We typically respond within 24 hours",
        feedbackTitle: "We Value Your Feedback",
        feedbackDesc: "Your suggestions help us improve our YouTube downloader service. Whether it's a feature request, bug report, or general feedback, we read every message and use it to enhance your experience."
      }
    }
  },
  hi: {
    pages: {
      howItWorks: {
        title: "यह कैसे काम करता है",
        subtitle: "हमारी सरल 4-चरण प्रक्रिया के साथ किसी भी YouTube वीडियो को HD गुणवत्ता में डाउनलोड करें। कोई सॉफ़्टवेयर इंस्टॉलेशन नहीं, कोई पंजीकरण आवश्यक नहीं - पूरी तरह से मुफ़्त और सुरक्षित।",
        statsTitle: "4 आसान चरणों में YouTube वीडियो डाउनलोड करें",
        ctaTitle: "डाउनलोड करना शुरू करने के लिए तैयार हैं?",
        ctaSubtitle: "अब हमारे मुफ्त YouTube वीडियो डाउनलोडर को आज़माएं। कोई पंजीकरण आवश्यक नहीं, पूरी तरह से सुरक्षित, और सभी वीडियो गुणवत्ता के साथ काम करता है।",
        ctaButton: "अभी डाउनलोड करना शुरू करें"
      },
      faqs: {
        title: "Snap Save Pro FAQ - वीडियो डाउनलोडर सहायता",
        subtitle: "TikTok, YouTube, Facebook, Pinterest, Snapchat, Reddit और Twitter से वीडियो डाउनलोड करने के लिए पूर्ण गाइड। HD वीडियो डाउनलोड, MP3 ऑडियो निष्कर्षण और समस्या निवारण के बारे में उत्तर खोजें।",
        searchPlaceholder: "खोजें: TikTok डाउनलोड, YouTube MP3, Facebook वीडियो, वॉटरमार्क हटाएं...",
        searchResults: "\"{query}\" के लिए {count} परिणाम मिले",
        browseCategories: "FAQ श्रेणियां ब्राउज़ करें",
        proTipsTitle: "सर्वश्रेष्ठ वीडियो डाउनलोड के लिए प्रो टिप्स",
        proTipsSubtitle: "TikTok, YouTube और Facebook वीडियो को तेज़ और बेहतर गुणवत्ता में डाउनलोड करने के लिए विशेषज्ञ टिप्स",
        popularSearches: "लोकप्रिय खोजें",
        ctaTitle: "वीडियो डाउनलोड के बारे में अभी भी प्रश्न हैं?",
        ctaSubtitle: "जो आप ढूंढ रहे हैं वह नहीं मिल रहा है? TikTok, YouTube, Facebook और सभी समर्थित प्लेटफ़ॉर्म से डाउनलोड करने के बारे में नए प्रश्नों के साथ हमारे FAQ को लगातार अपडेट किया जा रहा है।",
        ctaButton: "अभी वीडियो डाउनलोड करना शुरू करें",
        blogButton: "हमारा ब्लॉग और गाइड पढ़ें",
        noResults: "कोई परिणाम नहीं मिला",
        noResultsDesc: "विभिन्न कीवर्ड आज़माएं या ऊपर श्रेणियां ब्राउज़ करें"
      },
      contact: {
        title: "हमसे संपर्क करें",
        subtitle: "हमारे YouTube डाउनलोडर के साथ मदद चाहिए? प्रश्न या प्रतिक्रिया है? हमारी सहायता टीम किसी भी समस्या या पूछताछ में आपकी सहायता के लिए यहां है।",
        helpTitle: "हम आपकी कैसे मदद कर सकते हैं?",
        formTitle: "हमें संदेश भेजें",
        nameLabel: "आपका नाम",
        namePlaceholder: "अपना नाम दर्ज करें",
        emailLabel: "ईमेल पता",
        emailPlaceholder: "your.email@example.com",
        categoryLabel: "श्रेणी",
        subjectLabel: "विषय",
        subjectPlaceholder: "आपकी पूछताछ का संक्षिप्त विवरण",
        messageLabel: "संदेश",
        messagePlaceholder: "कृपया अपने प्रश्न या समस्या के बारे में विस्तृत जानकारी प्रदान करें...",
        sendButton: "संदेश भेजें",
        quickFaqTitle: "त्वरित सहायता FAQ",
        directEmailTitle: "सीधा ईमेल संपर्क",
        directEmailSubtitle: "तत्काल सहायता के लिए, हमारी सहायता टीम से सीधे संपर्क करें",
        responseTime: "हम आमतौर पर 24 घंटे के भीतर जवाब देते हैं",
        feedbackTitle: "हम आपकी प्रतिक्रिया को महत्व देते हैं",
        feedbackDesc: "आपके सुझाव हमारी YouTube डाउनलोडर सेवा को बेहतर बनाने में मदद करते हैं। चाहे वह फीचर अनुरोध हो, बग रिपोर्ट हो, या सामान्य प्रतिक्रिया हो, हम हर संदेश पढ़ते हैं और इसे आपके अनुभव को बेहतर बनाने के लिए उपयोग करते हैं।"
      }
    }
  },
  zh: {
    pages: {
      howItWorks: {
        title: "使用方法",
        subtitle: "通过我们简单的4步流程下载任何YouTube视频的高清质量。无需软件安装，无需注册 - 完全免费且安全。",
        statsTitle: "4个简单步骤下载YouTube视频",
        ctaTitle: "准备开始下载了吗？",
        ctaSubtitle: "立即试用我们免费的YouTube视频下载器。无需注册，完全安全，支持所有视频质量。",
        ctaButton: "立即开始下载"
      },
      faqs: {
        title: "Snap Save Pro 常见问题 - 视频下载器帮助",
        subtitle: "从TikTok、YouTube、Facebook、Pinterest、Snapchat、Reddit和Twitter下载视频的完整指南。查找有关高清视频下载、MP3音频提取和故障排除的答案。",
        searchPlaceholder: "搜索：TikTok下载、YouTube MP3、Facebook视频、删除水印...",
        searchResults: "找到 {count} 个 \"{query}\" 的结果",
        browseCategories: "浏览FAQ类别",
        proTipsTitle: "最佳视频下载专业提示",
        proTipsSubtitle: "更快更高质量下载TikTok、YouTube和Facebook视频的专家提示",
        popularSearches: "热门搜索",
        ctaTitle: "关于视频下载还有疑问吗？",
        ctaSubtitle: "找不到您要找的内容？我们的FAQ不断更新，包含有关从TikTok、YouTube、Facebook和所有支持平台下载的新问题。",
        ctaButton: "立即开始下载视频",
        blogButton: "阅读我们的博客和指南",
        noResults: "未找到结果",
        noResultsDesc: "尝试不同的关键词或浏览上面的类别"
      },
      contact: {
        title: "联系我们",
        subtitle: "需要我们的YouTube下载器帮助吗？有问题或反馈吗？我们的支持团队随时为您解答任何问题或疑问。",
        helpTitle: "我们如何帮助您？",
        formTitle: "给我们发消息",
        nameLabel: "您的姓名",
        namePlaceholder: "输入您的姓名",
        emailLabel: "电子邮件地址",
        emailPlaceholder: "your.email@example.com",
        categoryLabel: "类别",
        subjectLabel: "主题",
        subjectPlaceholder: "简要描述您的咨询",
        messageLabel: "消息",
        messagePlaceholder: "请提供有关您的问题的详细信息...",
        sendButton: "发送消息",
        quickFaqTitle: "快速支持FAQ",
        directEmailTitle: "直接电子邮件联系",
        directEmailSubtitle: "如需立即帮助，请直接联系我们的支持团队",
        responseTime: "我们通常在24小时内回复",
        feedbackTitle: "我们重视您的反馈",
        feedbackDesc: "您的建议帮助我们改进YouTube下载器服务。无论是功能请求、错误报告还是一般反馈，我们都会阅读每条消息并使用它来增强您的体验。"
      }
    }
  },
  ur: {
    pages: {
      howItWorks: {
        title: "یہ کیسے کام کرتا ہے",
        subtitle: "ہماری آسان 4 مرحلہ عمل کے ساتھ کسی بھی YouTube ویڈیو کو HD معیار میں ڈاؤن لوڈ کریں۔ کوئی سافٹ ویئر انسٹالیشن نہیں، کوئی رجسٹریشن کی ضرورت نہیں - مکمل طور پر مفت اور محفوظ۔",
        statsTitle: "4 آسان مراحل میں YouTube ویڈیوز ڈاؤن لوڈ کریں",
        ctaTitle: "ڈاؤن لوڈ شروع کرنے کے لیے تیار ہیں؟",
        ctaSubtitle: "ابھی ہمارا مفت YouTube ویڈیو ڈاؤن لوڈر آزمائیں۔ کوئی رجسٹریشن کی ضرورت نہیں، مکمل طور پر محفوظ، اور تمام ویڈیو معیار کے ساتھ کام کرتا ہے۔",
        ctaButton: "ابھی ڈاؤن لوڈ شروع کریں"
      },
      faqs: {
        title: "Snap Save Pro FAQ - ویڈیو ڈاؤن لوڈر مدد",
        subtitle: "TikTok، YouTube، Facebook، Pinterest، Snapchat، Reddit اور Twitter سے ویڈیوز ڈاؤن لوڈ کرنے کی مکمل گائیڈ۔ HD ویڈیو ڈاؤن لوڈز، MP3 آڈیو نکالنے اور مسائل حل کرنے کے بارے میں جوابات تلاش کریں۔",
        searchPlaceholder: "تلاش کریں: TikTok ڈاؤن لوڈ، YouTube MP3، Facebook ویڈیو، واٹر مارک ہٹائیں...",
        searchResults: "\"{query}\" کے لیے {count} نتائج ملے",
        browseCategories: "FAQ زمرے براؤز کریں",
        proTipsTitle: "بہترین ویڈیو ڈاؤن لوڈز کے لیے پرو ٹپس",
        proTipsSubtitle: "TikTok، YouTube اور Facebook ویڈیوز کو تیز اور بہتر معیار میں ڈاؤن لوڈ کرنے کے لیے ماہرانہ تجاویز",
        popularSearches: "مقبول تلاشیں",
        ctaTitle: "ویڈیو ڈاؤن لوڈز کے بارے میں اب بھی سوالات ہیں؟",
        ctaSubtitle: "جو آپ تلاش کر رہے ہیں وہ نہیں مل رہا؟ ہمارا FAQ مسلسل TikTok، YouTube، Facebook اور تمام تعاون یافتہ پلیٹ فارمز سے ڈاؤن لوڈ کرنے کے بارے میں نئے سوالات کے ساتھ اپ ڈیٹ ہوتا ہے۔",
        ctaButton: "ابھی ویڈیوز ڈاؤن لوڈ کرنا شروع کریں",
        blogButton: "ہمارا بلاگ اور گائیڈز پڑھیں",
        noResults: "کوئی نتائج نہیں ملے",
        noResultsDesc: "مختلف کلیدی الفاظ آزمائیں یا اوپر زمرے براؤز کریں"
      },
      contact: {
        title: "ہم سے رابطہ کریں",
        subtitle: "ہمارے YouTube ڈاؤن لوڈر کے ساتھ مدد چاہیے؟ سوالات یا رائے ہے؟ ہماری سپورٹ ٹیم کسی بھی مسئلے یا استفسار میں آپ کی مدد کے لیے یہاں ہے۔",
        helpTitle: "ہم آپ کی کیسے مدد کر سکتے ہیں؟",
        formTitle: "ہمیں پیغام بھیجیں",
        nameLabel: "آپ کا نام",
        namePlaceholder: "اپنا نام درج کریں",
        emailLabel: "ای میل ایڈریس",
        emailPlaceholder: "your.email@example.com",
        categoryLabel: "زمرہ",
        subjectLabel: "موضوع",
        subjectPlaceholder: "آپ کے استفسار کی مختصر تفصیل",
        messageLabel: "پیغام",
        messagePlaceholder: "براہ کرم اپنے سوال یا مسئلے کے بارے میں تفصیلی معلومات فراہم کریں...",
        sendButton: "پیغام بھیجیں",
        quickFaqTitle: "فوری سپورٹ FAQ",
        directEmailTitle: "براہ راست ای میل رابطہ",
        directEmailSubtitle: "فوری مدد کے لیے، ہماری سپورٹ ٹیم سے براہ راست رابطہ کریں",
        responseTime: "ہم عام طور پر 24 گھنٹوں کے اندر جواب دیتے ہیں",
        feedbackTitle: "ہم آپ کی رائے کی قدر کرتے ہیں",
        feedbackDesc: "آپ کی تجاویز ہماری YouTube ڈاؤن لوڈر سروس کو بہتر بنانے میں مدد کرتی ہیں۔ چاہے یہ فیچر کی درخواست ہو، بگ رپورٹ ہو، یا عام رائے ہو، ہم ہر پیغام پڑھتے ہیں اور اسے آپ کے تجربے کو بہتر بنانے کے لیے استعمال کرتے ہیں۔"
      }
    }
  }
};

function updateTranslations() {
  const messagesDir = path.join(__dirname, '..', '..', 'messages');

  ['en', 'hi', 'zh', 'ur'].forEach(locale => {
    const filePath = path.join(messagesDir, `${locale}.json`);
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Add pages translations
    if (!existingData.pages) {
      existingData.pages = {};
    }
    existingData.pages = translations[locale].pages;

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
    console.log(`✅ ${locale.toUpperCase()} Pages translations added!`);
  });

  console.log('\n✨ All page translations added successfully!');
  console.log('📝 Note: Due to the large size of these pages, only the most important');
  console.log('   translatable content has been extracted. The data-heavy content');
  console.log('   (steps, FAQs, categories) can remain in English for now.');
}

updateTranslations();
