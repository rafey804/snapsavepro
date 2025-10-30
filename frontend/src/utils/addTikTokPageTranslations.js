const fs = require('fs');
const path = require('path');

// Read English file
const enPath = path.join(__dirname, '../../messages/en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Add HowToDownload translations
enData.seo = enData.seo || {};
enData.seo.howToDownload = {
  title: "How to Download {platform} Videos",
  subtitle: "Download {platform} videos in just 4 simple steps with the best quality",
  step: "STEP",
  steps: {
    step1: {
      title: "Copy {platform} Link",
      description: "Find and copy the link to your {platform} video that you want to download"
    },
    step2: {
      title: "Paste the Link",
      description: "Paste the {platform} video link into our downloader"
    },
    step3: {
      title: "Choose Quality",
      description: "Select your desired video quality (up to 4K for {platform})"
    },
    step4: {
      title: "Download Complete",
      description: "Your video is ready to download without watermarks"
    }
  },
  whyChoose: "Why Choose Our {platform} Downloader?",
  features: {
    free: {
      title: "100% Free & Unlimited",
      description: "Download unlimited {platform} videos completely free, no premium required"
    },
    quality: {
      title: "High Quality Videos",
      description: "Download in the highest available quality up to 4K resolution"
    },
    noWatermark: {
      title: "No Watermarks",
      description: "Remove watermarks and get clean {platform} videos without any branding"
    }
  }
};

// Add InfoSection translations
enData.seo.infoSection = {
  title: "Download {platform} Videos",
  description1: "Our {platform} downloader is the most reliable tool available.",
  description2: "Get high-quality downloads from {platform} instantly.",
  description3: "Compatible with all devices and operating systems.",
  description4: "We preserve the original quality of your downloads.",
  description5: "Start downloading now and enjoy your content offline!",
  features: {
    quality: {
      title: "Multiple Quality Options",
      description: "Choose from various quality options to suit your needs."
    },
    speed: {
      title: "Lightning Fast Downloads",
      description: "Download {platform} videos in seconds."
    },
    security: {
      title: "Safe & Secure",
      description: "Your data is encrypted and never stored on our servers."
    },
    noWatermark: {
      title: "No Watermarks",
      description: "Get clean {platform} videos without any watermarks."
    }
  }
};

// Add FAQ translations
enData.seo.faq = {
  title: "Frequently Asked Questions",
  subtitle: "Everything you need to know about downloading {platform} videos"
};

// Save English file
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('✅ English translations added successfully!');

// Now add translations for other languages
const translations = {
  hi: {
    howToDownload: {
      title: "{platform} वीडियो कैसे डाउनलोड करें",
      subtitle: "सबसे अच्छी गुणवत्ता के साथ केवल 4 सरल चरणों में {platform} वीडियो डाउनलोड करें",
      step: "चरण",
      steps: {
        step1: {
          title: "{platform} लिंक कॉपी करें",
          description: "अपने {platform} वीडियो का लिंक खोजें और कॉपी करें जिसे आप डाउनलोड करना चाहते हैं"
        },
        step2: {
          title: "लिंक पेस्ट करें",
          description: "हमारे डाउनलोडर में {platform} वीडियो लिंक पेस्ट करें"
        },
        step3: {
          title: "गुणवत्ता चुनें",
          description: "अपनी इच्छित वीडियो गुणवत्ता चुनें ({platform} के लिए 4K तक)"
        },
        step4: {
          title: "डाउनलोड पूर्ण",
          description: "आपका वीडियो बिना वॉटरमार्क के डाउनलोड के लिए तैयार है"
        }
      },
      whyChoose: "हमारे {platform} डाउनलोडर को क्यों चुनें?",
      features: {
        free: {
          title: "100% मुफ्त और असीमित",
          description: "असीमित {platform} वीडियो पूरी तरह से मुफ्त डाउनलोड करें, कोई प्रीमियम आवश्यक नहीं"
        },
        quality: {
          title: "उच्च गुणवत्ता वाले वीडियो",
          description: "4K रिज़ॉल्यूशन तक उच्चतम उपलब्ध गुणवत्ता में डाउनलोड करें"
        },
        noWatermark: {
          title: "कोई वॉटरमार्क नहीं",
          description: "वॉटरमार्क हटाएं और बिना किसी ब्रांडिंग के साफ {platform} वीडियो प्राप्त करें"
        }
      }
    },
    infoSection: {
      title: "{platform} वीडियो डाउनलोड करें",
      description1: "हमारा {platform} डाउनलोडर सबसे विश्वसनीय उपकरण उपलब्ध है।",
      description2: "{platform} से तुरंत उच्च-गुणवत्ता डाउनलोड प्राप्त करें।",
      description3: "सभी उपकरणों और ऑपरेटिंग सिस्टम के साथ संगत।",
      description4: "हम आपके डाउनलोड की मूल गुणवत्ता को संरक्षित करते हैं।",
      description5: "अभी डाउनलोड करना शुरू करें और अपनी सामग्री ऑफ़लाइन का आनंद लें!",
      features: {
        quality: {
          title: "एकाधिक गुणवत्ता विकल्प",
          description: "अपनी आवश्यकताओं के अनुरूप विभिन्न गुणवत्ता विकल्पों में से चुनें।"
        },
        speed: {
          title: "बिजली की तेजी से डाउनलोड",
          description: "सेकंड में {platform} वीडियो डाउनलोड करें।"
        },
        security: {
          title: "सुरक्षित और सुरक्षित",
          description: "आपका डेटा एन्क्रिप्ट किया गया है और हमारे सर्वर पर कभी संग्रहीत नहीं किया जाता है।"
        },
        noWatermark: {
          title: "कोई वॉटरमार्क नहीं",
          description: "बिना किसी वॉटरमार्क के साफ {platform} वीडियो प्राप्त करें।"
        }
      }
    },
    faq: {
      title: "अक्सर पूछे जाने वाले प्रश्न",
      subtitle: "{platform} वीडियो डाउनलोड करने के बारे में आपको जो कुछ भी जानना आवश्यक है"
    }
  },
  zh: {
    howToDownload: {
      title: "如何下载 {platform} 视频",
      subtitle: "只需 4 个简单步骤即可以最佳质量下载 {platform} 视频",
      step: "步骤",
      steps: {
        step1: {
          title: "复制 {platform} 链接",
          description: "查找并复制您要下载的 {platform} 视频链接"
        },
        step2: {
          title: "粘贴链接",
          description: "将 {platform} 视频链接粘贴到我们的下载器中"
        },
        step3: {
          title: "选择质量",
          description: "选择您想要的视频质量（{platform} 最高支持 4K）"
        },
        step4: {
          title: "下载完成",
          description: "您的视频已准备好下载，无水印"
        }
      },
      whyChoose: "为什么选择我们的 {platform} 下载器？",
      features: {
        free: {
          title: "100% 免费和无限制",
          description: "完全免费下载无限量的 {platform} 视频，无需高级版"
        },
        quality: {
          title: "高质量视频",
          description: "以最高可用质量下载，支持高达 4K 分辨率"
        },
        noWatermark: {
          title: "无水印",
          description: "删除水印，获得无任何品牌标识的干净 {platform} 视频"
        }
      }
    },
    infoSection: {
      title: "下载 {platform} 视频",
      description1: "我们的 {platform} 下载器是最可靠的工具。",
      description2: "从 {platform} 即时获取高质量下载。",
      description3: "与所有设备和操作系统兼容。",
      description4: "我们保留您下载的原始质量。",
      description5: "立即开始下载，离线享受您的内容！",
      features: {
        quality: {
          title: "多种质量选项",
          description: "从各种质量选项中选择以满足您的需求。"
        },
        speed: {
          title: "闪电般快速下载",
          description: "在几秒钟内下载 {platform} 视频。"
        },
        security: {
          title: "安全可靠",
          description: "您的数据已加密，从不存储在我们的服务器上。"
        },
        noWatermark: {
          title: "无水印",
          description: "获得无任何水印的干净 {platform} 视频。"
        }
      }
    },
    faq: {
      title: "常见问题",
      subtitle: "关于下载 {platform} 视频您需要了解的一切"
    }
  },
  ur: {
    howToDownload: {
      title: "{platform} ویڈیوز کیسے ڈاؤن لوڈ کریں",
      subtitle: "بہترین معیار کے ساتھ صرف 4 آسان مراحل میں {platform} ویڈیوز ڈاؤن لوڈ کریں",
      step: "مرحلہ",
      steps: {
        step1: {
          title: "{platform} لنک کاپی کریں",
          description: "اپنے {platform} ویڈیو کا لنک تلاش کریں اور کاپی کریں جسے آپ ڈاؤن لوڈ کرنا چاہتے ہیں"
        },
        step2: {
          title: "لنک پیسٹ کریں",
          description: "ہمارے ڈاؤن لوڈر میں {platform} ویڈیو لنک پیسٹ کریں"
        },
        step3: {
          title: "معیار منتخب کریں",
          description: "اپنا مطلوبہ ویڈیو معیار منتخب کریں ({platform} کے لیے 4K تک)"
        },
        step4: {
          title: "ڈاؤن لوڈ مکمل",
          description: "آپ کی ویڈیو بغیر واٹر مارک کے ڈاؤن لوڈ کے لیے تیار ہے"
        }
      },
      whyChoose: "ہمارے {platform} ڈاؤن لوڈر کو کیوں منتخب کریں؟",
      features: {
        free: {
          title: "100% مفت اور لامحدود",
          description: "لامحدود {platform} ویڈیوز مکمل طور پر مفت ڈاؤن لوڈ کریں، کوئی پریمیم کی ضرورت نہیں"
        },
        quality: {
          title: "اعلیٰ معیار کی ویڈیوز",
          description: "4K ریزولوشن تک دستیاب بلند ترین معیار میں ڈاؤن لوڈ کریں"
        },
        noWatermark: {
          title: "کوئی واٹر مارک نہیں",
          description: "واٹر مارک ہٹائیں اور بغیر کسی برانڈنگ کے صاف {platform} ویڈیوز حاصل کریں"
        }
      }
    },
    infoSection: {
      title: "{platform} ویڈیوز ڈاؤن لوڈ کریں",
      description1: "ہمارا {platform} ڈاؤن لوڈر سب سے قابل اعتماد ٹول دستیاب ہے۔",
      description2: "{platform} سے فوری طور پر اعلیٰ معیار کی ڈاؤن لوڈز حاصل کریں۔",
      description3: "تمام آلات اور آپریٹنگ سسٹمز کے ساتھ مطابقت پذیر۔",
      description4: "ہم آپ کی ڈاؤن لوڈز کے اصل معیار کو محفوظ رکھتے ہیں۔",
      description5: "ابھی ڈاؤن لوڈ کرنا شروع کریں اور اپنے مواد سے آف لائن لطف اٹھائیں!",
      features: {
        quality: {
          title: "متعدد معیار کے اختیارات",
          description: "اپنی ضروریات کے مطابق مختلف معیار کے اختیارات میں سے منتخب کریں۔"
        },
        speed: {
          title: "بجلی کی تیز رفتار ڈاؤن لوڈز",
          description: "سیکنڈوں میں {platform} ویڈیوز ڈاؤن لوڈ کریں۔"
        },
        security: {
          title: "محفوظ اور مامون",
          description: "آپ کا ڈیٹا خفیہ کیا گیا ہے اور ہمارے سرورز پر کبھی محفوظ نہیں کیا جاتا۔"
        },
        noWatermark: {
          title: "کوئی واٹر مارک نہیں",
          description: "بغیر کسی واٹر مارک کے صاف {platform} ویڈیوز حاصل کریں۔"
        }
      }
    },
    faq: {
      title: "اکثر پوچھے گئے سوالات",
      subtitle: "{platform} ویڈیوز ڈاؤن لوڈ کرنے کے بارے میں آپ کو جاننے کی ضرورت ہر چیز"
    }
  }
};

// Update other language files
['hi', 'zh', 'ur'].forEach(lang => {
  const langPath = path.join(__dirname, `../../messages/${lang}.json`);
  const langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));

  langData.seo = langData.seo || {};
  langData.seo.howToDownload = translations[lang].howToDownload;
  langData.seo.infoSection = translations[lang].infoSection;
  langData.seo.faq = translations[lang].faq;

  fs.writeFileSync(langPath, JSON.stringify(langData, null, 2), 'utf8');
  console.log(`✅ ${lang.toUpperCase()} translations updated!`);
});

console.log('\n🎉 All SEO page translations added successfully!');
