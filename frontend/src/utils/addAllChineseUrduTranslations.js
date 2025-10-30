const fs = require('fs');
const path = require('path');

// Simplified Chinese and Urdu translations for all platforms
const translations = {
  zh: {
    seo: {
      instagram: {
        mainTitle: "Instagram Reels 下载器 - 轻松保存 Instagram 视频",
        intro: "我们的 Instagram Reels 下载器是最好的免费工具，可以高质量无水印下载 Instagram Reels、帖子和 IGTV 视频。",
        howTo: {
          title: "如何下载 Instagram Reels",
          step1: "复制 Instagram 链接",
          step2: "粘贴 URL",
          step3: "点击获取视频",
          step4: "选择质量",
          step5: "下载"
        },
        features: {
          title: "主要功能",
          highQuality: "高质量下载：以 HD 和 Full HD 下载",
          noWatermark: "无水印：所有下载均无水印",
          multipleFormats: "多种格式：支持 MP4、MP3 等",
          fastSecure: "快速安全：闪电般的下载速度",
          free: "永久免费：完全免费使用",
          noRegistration: "无需注册",
          allDevices: "所有设备：支持所有设备",
          audioExtraction: "音频提取：提取高质量音频"
        },
        whyChoose: {
          title: "为什么选择我们？",
          description: "我们的工具提供最高质量的下载，没有水印。支持所有类型的 Instagram 内容。"
        },
        faq: {
          title: "常见问题",
          q1: { question: "下载合法吗？", answer: "个人使用通常是可以接受的。" },
          q2: { question: "可以下载私人视频吗？", answer: "不可以，仅支持公开内容。" },
          q3: { question: "需要安装软件吗？", answer: "不需要，完全基于网络。" },
          q4: { question: "支持什么质量？", answer: "支持最高 1080p Full HD。" },
          q5: { question: "有下载限制吗？", answer: "没有限制，完全免费。" },
          q6: { question: "支持移动设备吗？", answer: "是的，支持所有设备。" }
        },
        proTip: {
          title: "专业提示：",
          description: "始终复制完整的 URL 以获得最佳效果。"
        }
      },
      youtube: {
        mainTitle: "YouTube Shorts 下载器 - 保存高质量 Shorts",
        intro: "最好的免费 YouTube Shorts 下载工具，支持 4K、1080p 高质量下载。",
        howTo: {
          title: "如何下载 YouTube Shorts",
          step1: "复制 Shorts 链接",
          step2: "粘贴 URL",
          step3: "点击获取视频",
          step4: "选择质量",
          step5: "下载"
        },
        features: {
          title: "主要功能",
          highQuality: "高质量：支持 4K、1080p、720p",
          noWatermark: "无水印",
          multipleFormats: "多种格式",
          fastSecure: "快速安全",
          free: "永久免费",
          noRegistration: "无需注册",
          allDevices: "所有设备",
          audioExtraction: "音频提取"
        },
        whyChoose: {
          title: "为什么选择我们？",
          description: "提供最高 4K 质量的下载，无水印，最快的处理速度。"
        },
        faq: {
          title: "常见问题",
          q1: { question: "下载合法吗？", answer: "个人使用通常可以接受。" },
          q2: { question: "可以下载私人视频吗？", answer: "不可以。" },
          q3: { question: "需要安装吗？", answer: "不需要。" },
          q4: { question: "支持什么质量？", answer: "最高 4K。" },
          q5: { question: "有限制吗？", answer: "没有限制。" },
          q6: { question: "支持移动设备吗？", answer: "是的。" }
        },
        proTip: {
          title: "提示：",
          description: "复制完整 URL 以获得最佳效果。"
        }
      },
      facebook: {
        mainTitle: "Facebook 视频下载器",
        intro: "最好的 Facebook 视频下载工具。",
        howTo: {
          title: "如何下载",
          step1: "复制链接",
          step2: "粘贴 URL",
          step3: "获取视频",
          step4: "选择质量",
          step5: "下载"
        },
        features: {
          title: "功能",
          highQuality: "高质量",
          noWatermark: "无水印",
          multipleFormats: "多格式",
          fastSecure: "快速",
          free: "免费",
          noRegistration: "无需注册",
          allDevices: "所有设备",
          audioExtraction: "音频提取"
        },
        whyChoose: {
          title: "为什么选择？",
          description: "最佳质量，无水印。"
        },
        faq: {
          title: "常见问题",
          q1: { question: "合法吗？", answer: "个人使用可以。" },
          q2: { question: "私人视频？", answer: "不支持。" },
          q3: { question: "安装？", answer: "不需要。" },
          q4: { question: "质量？", answer: "1080p HD。" },
          q5: { question: "限制？", answer: "无限制。" },
          q6: { question: "移动？", answer: "支持。" }
        },
        proTip: {
          title: "提示：",
          description: "复制完整 URL。"
        }
      },
      twitter: {
        mainTitle: "Twitter 视频下载器",
        intro: "下载 Twitter 视频和 GIF。",
        howTo: {
          title: "如何下载",
          step1: "复制推文链接",
          step2: "粘贴 URL",
          step3: "获取视频",
          step4: "选择格式",
          step5: "下载"
        },
        features: {
          title: "功能",
          highQuality: "高质量 1080p",
          noWatermark: "无水印",
          multipleFormats: "MP4 和 GIF",
          fastSecure: "快速",
          free: "免费",
          noRegistration: "无需注册",
          allDevices: "所有设备",
          audioExtraction: "音频 MP3"
        },
        whyChoose: {
          title: "为什么？",
          description: "最快最可靠。"
        },
        faq: {
          title: "常见问题",
          q1: { question: "合法？", answer: "个人可以。" },
          q2: { question: "私人？", answer: "不支持。" },
          q3: { question: "安装？", answer: "不需要。" },
          q4: { question: "质量？", answer: "1080p。" },
          q5: { question: "限制？", answer: "无限。" },
          q6: { question: "移动？", answer: "支持。" }
        },
        proTip: {
          title: "提示：",
          description: "复制完整链接。"
        }
      }
    }
  },
  ur: {
    seo: {
      instagram: {
        mainTitle: "Instagram Reels ڈاؤن لوڈر - آسانی سے ویڈیوز محفوظ کریں",
        intro: "بہترین مفت Instagram Reels ڈاؤن لوڈ کرنے کا ٹول۔",
        howTo: {
          title: "کیسے ڈاؤن لوڈ کریں",
          step1: "لنک کاپی کریں",
          step2: "URL پیسٹ کریں",
          step3: "ویڈیو حاصل کریں",
          step4: "معیار منتخب کریں",
          step5: "ڈاؤن لوڈ"
        },
        features: {
          title: "خصوصیات",
          highQuality: "اعلیٰ معیار: HD اور Full HD",
          noWatermark: "واٹر مارک کے بغیر",
          multipleFormats: "متعدد فارمیٹس",
          fastSecure: "تیز اور محفوظ",
          free: "مفت",
          noRegistration: "رجسٹریشن نہیں",
          allDevices: "تمام ڈیوائسز",
          audioExtraction: "آڈیو نکالیں"
        },
        whyChoose: {
          title: "کیوں منتخب کریں؟",
          description: "بہترین معیار، واٹر مارک کے بغیر۔"
        },
        faq: {
          title: "سوالات",
          q1: { question: "قانونی؟", answer: "ذاتی استعمال ٹھیک ہے۔" },
          q2: { question: "نجی ویڈیو؟", answer: "نہیں۔" },
          q3: { question: "انسٹال؟", answer: "ضرورت نہیں۔" },
          q4: { question: "معیار؟", answer: "1080p تک۔" },
          q5: { question: "حد؟", answer: "کوئی حد نہیں۔" },
          q6: { question: "موبائل؟", answer: "ہاں۔" }
        },
        proTip: {
          title: "ٹپ:",
          description: "مکمل URL کاپی کریں۔"
        }
      },
      youtube: {
        mainTitle: "YouTube Shorts ڈاؤن لوڈر",
        intro: "بہترین YouTube Shorts ڈاؤن لوڈ ٹول۔",
        howTo: {
          title: "کیسے ڈاؤن لوڈ کریں",
          step1: "لنک کاپی",
          step2: "پیسٹ کریں",
          step3: "ویڈیو حاصل کریں",
          step4: "معیار منتخب",
          step5: "ڈاؤن لوڈ"
        },
        features: {
          title: "خصوصیات",
          highQuality: "4K، 1080p، 720p",
          noWatermark: "واٹر مارک نہیں",
          multipleFormats: "متعدد فارمیٹس",
          fastSecure: "تیز",
          free: "مفت",
          noRegistration: "رجسٹریشن نہیں",
          allDevices: "تمام ڈیوائسز",
          audioExtraction: "آڈیو"
        },
        whyChoose: {
          title: "کیوں؟",
          description: "4K معیار، تیز ترین۔"
        },
        faq: {
          title: "سوالات",
          q1: { question: "قانونی؟", answer: "ہاں۔" },
          q2: { question: "نجی؟", answer: "نہیں۔" },
          q3: { question: "انسٹال؟", answer: "نہیں۔" },
          q4: { question: "معیار؟", answer: "4K تک۔" },
          q5: { question: "حد؟", answer: "نہیں۔" },
          q6: { question: "موبائل؟", answer: "ہاں۔" }
        },
        proTip: {
          title: "ٹپ:",
          description: "مکمل URL کاپی کریں۔"
        }
      },
      facebook: {
        mainTitle: "Facebook ویڈیو ڈاؤن لوڈر",
        intro: "Facebook ویڈیوز ڈاؤن لوڈ کریں۔",
        howTo: {
          title: "کیسے",
          step1: "لنک کاپی",
          step2: "پیسٹ",
          step3: "حاصل کریں",
          step4: "منتخب کریں",
          step5: "ڈاؤن لوڈ"
        },
        features: {
          title: "خصوصیات",
          highQuality: "HD",
          noWatermark: "واٹر مارک نہیں",
          multipleFormats: "MP4",
          fastSecure: "تیز",
          free: "مفت",
          noRegistration: "رجسٹریشن نہیں",
          allDevices: "تمام",
          audioExtraction: "آڈیو"
        },
        whyChoose: {
          title: "کیوں؟",
          description: "بہترین معیار۔"
        },
        faq: {
          title: "سوالات",
          q1: { question: "قانونی؟", answer: "ہاں۔" },
          q2: { question: "نجی؟", answer: "نہیں۔" },
          q3: { question: "انسٹال؟", answer: "نہیں۔" },
          q4: { question: "معیار؟", answer: "1080p۔" },
          q5: { question: "حد؟", answer: "نہیں۔" },
          q6: { question: "موبائل؟", answer: "ہاں۔" }
        },
        proTip: {
          title: "ٹپ:",
          description: "مکمل URL۔"
        }
      },
      twitter: {
        mainTitle: "Twitter ویڈیو ڈاؤن لوڈر",
        intro: "Twitter ویڈیوز اور GIF ڈاؤن لوڈ کریں۔",
        howTo: {
          title: "کیسے",
          step1: "ٹویٹ کاپی",
          step2: "پیسٹ",
          step3: "حاصل کریں",
          step4: "منتخب",
          step5: "ڈاؤن لوڈ"
        },
        features: {
          title: "خصوصیات",
          highQuality: "1080p",
          noWatermark: "واٹر مارک نہیں",
          multipleFormats: "MP4، GIF",
          fastSecure: "تیز",
          free: "مفت",
          noRegistration: "رجسٹریشن نہیں",
          allDevices: "تمام",
          audioExtraction: "MP3"
        },
        whyChoose: {
          title: "کیوں؟",
          description: "تیز ترین۔"
        },
        faq: {
          title: "سوالات",
          q1: { question: "قانونی؟", answer: "ہاں۔" },
          q2: { question: "نجی؟", answer: "نہیں۔" },
          q3: { question: "انسٹال؟", answer: "نہیں۔" },
          q4: { question: "معیار؟", answer: "1080p۔" },
          q5: { question: "حد؟", answer: "نہیں۔" },
          q6: { question: "موبائل؟", answer: "ہاں۔" }
        },
        proTip: {
          title: "ٹپ:",
          description: "مکمل لنک۔"
        }
      }
    }
  }
};

// Function to update JSON files
function updateTranslations() {
  const messagesDir = path.join(__dirname, '..', '..', 'messages');

  ['zh', 'ur'].forEach(locale => {
    const filePath = path.join(messagesDir, `${locale}.json`);
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Merge all platform translations
    if (!existingData.seo) {
      existingData.seo = {};
    }

    existingData.seo.instagram = translations[locale].seo.instagram;
    existingData.seo.youtube = translations[locale].seo.youtube;
    existingData.seo.facebook = translations[locale].seo.facebook;
    existingData.seo.twitter = translations[locale].seo.twitter;

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
    console.log(`✅ ${locale.toUpperCase()} All platform translations added!`);
  });

  console.log('\n🎉 Chinese & Urdu translations for all platforms completed!');
}

updateTranslations();
