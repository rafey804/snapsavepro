const fs = require('fs');
const path = require('path');

// Instagram Chinese and Urdu translations
const instagramTranslations = {
  zh: {
    seo: {
      instagram: {
        mainTitle: "Instagram Reels 下载器 - 轻松保存 Instagram 视频",
        intro: "我们的 Instagram Reels 下载器是最好的免费工具，可以高质量无水印下载 Instagram Reels、帖子和 IGTV 视频。只需点击几下即可将您喜爱的 Instagram 内容直接保存到您的设备。",
        howTo: {
          title: "如何下载 Instagram Reels",
          step1: "复制 Instagram 链接：打开 Instagram 应用或网站，找到要下载的 Reel 或视频，然后复制其 URL",
          step2: "粘贴 URL：将 Instagram 链接粘贴到上面的输入框中",
          step3: "点击 '获取视频'：我们的工具将分析视频并获取所有可用格式",
          step4: "选择质量：选择您喜欢的视频质量或音频格式",
          step5: "下载：点击下载按钮并将文件保存到您的设备"
        },
        features: {
          title: "主要功能",
          highQuality: "高质量下载：下载最佳可用质量的 Instagram Reels，包括 HD 和 Full HD",
          noWatermark: "无水印：所有下载均无水印，为您提供干净的视频",
          multipleFormats: "多种格式：从各种视频格式（MP4、WebM）和音频格式（MP3、M4A）中选择",
          fastSecure: "快速安全：通过安全连接实现闪电般的快速下载",
          free: "永久免费：完全免费使用，无隐藏费用或订阅",
          noRegistration: "无需注册：无需创建帐户或登录即可下载",
          allDevices: "所有设备：适用于台式机、手机和平板电脑设备",
          audioExtraction: "音频提取：从 Instagram 视频中提取并下载高质量音频"
        },
        whyChoose: {
          title: "为什么选择我们的 Instagram 下载器？",
          description: "与其他 Instagram 下载器不同，我们的工具提供最高质量的下载，没有任何水印或品牌。我们支持所有类型的 Instagram 内容，包括 Reels、常规帖子、IGTV 视频等。我们的先进技术确保快速处理和下载，使其成为在线可用的最高效的 Instagram 视频下载器。"
        },
        supportedTypes: {
          title: "支持的 Instagram 内容类型",
          reels: "Instagram Reels：以 HD 质量下载热门 Reels",
          posts: "Instagram 帖子：从任何公共帐户保存视频帖子",
          igtv: "IGTV 视频：下载长篇 IGTV 内容",
          stories: "Instagram Stories：在故事消失之前保存它们（如果作为帖子分享）"
        },
        faq: {
          title: "常见问题",
          q1: {
            question: "下载 Instagram 视频合法吗？",
            answer: "为个人使用下载 Instagram 视频通常是可以接受的，但您应该尊重版权法和内容创作者的权利。在重新发布或商业使用他人内容之前，请务必获得许可。"
          },
          q2: {
            question: "我可以下载私人 Instagram 视频吗？",
            answer: "不，我们的工具仅适用于公开访问的 Instagram 内容。为保护用户隐私，无法下载私人帐户和年龄限制内容。"
          },
          q3: {
            question: "我需要安装任何软件吗？",
            answer: "无需安装！我们的 Instagram 下载器完全基于网络。只需粘贴链接并下载 - 它可以直接在任何设备的浏览器中工作。"
          },
          q4: {
            question: "我可以下载什么视频质量？",
            answer: "我们提供 Instagram 提供的最高质量，通常高达 1080p Full HD。可用质量取决于原始视频的上传方式。"
          },
          q5: {
            question: "有下载限制吗？",
            answer: "没有限制！您可以完全免费下载任意数量的 Instagram 视频和 Reels。"
          },
          q6: {
            question: "它可以在移动设备上使用吗？",
            answer: "是的！我们的 Instagram 下载器完全响应式，可以在包括智能手机、平板电脑和台式电脑在内的所有设备上完美运行。"
          }
        },
        proTip: {
          title: "专业提示：",
          description: "为获得最佳体验，请始终复制包括"https://"在内的完整 Instagram URL。您可以通过单击任何 Instagram 帖子上的三点菜单并选择"复制链接"或"分享到..."然后复制 URL 来获取链接。"
        }
      }
    }
  },
  ur: {
    seo: {
      instagram: {
        mainTitle: "Instagram Reels ڈاؤن لوڈر - آسانی سے Instagram ویڈیوز محفوظ کریں",
        intro: "ہمارا Instagram Reels ڈاؤن لوڈر واٹر مارک کے بغیر اعلیٰ معیار میں Instagram Reels، پوسٹس اور IGTV ویڈیوز ڈاؤن لوڈ کرنے کا بہترین مفت ٹول ہے۔ صرف چند کلکس میں اپنی پسندیدہ Instagram مواد براہ راست اپنے ڈیوائس میں محفوظ کریں۔",
        howTo: {
          title: "Instagram Reels کیسے ڈاؤن لوڈ کریں",
          step1: "Instagram لنک کاپی کریں: Instagram ایپ یا ویب سائٹ کھولیں، وہ Reel یا ویڈیو تلاش کریں جسے آپ ڈاؤن لوڈ کرنا چاہتے ہیں، اور اس کا URL کاپی کریں",
          step2: "URL پیسٹ کریں: Instagram لنک کو اوپر دیے گئے ان پٹ باکس میں پیسٹ کریں",
          step3: "\"ویڈیو حاصل کریں\" پر کلک کریں: ہمارا ٹول ویڈیو کا تجزیہ کرے گا اور تمام دستیاب فارمیٹس لائے گا",
          step4: "معیار منتخب کریں: اپنی پسندیدہ ویڈیو معیار یا آڈیو فارمیٹ منتخب کریں",
          step5: "ڈاؤن لوڈ: ڈاؤن لوڈ بٹن پر کلک کریں اور فائل کو اپنے ڈیوائس میں محفوظ کریں"
        },
        features: {
          title: "اہم خصوصیات",
          highQuality: "اعلیٰ معیار ڈاؤن لوڈ: HD اور Full HD سمیت بہترین دستیاب معیار میں Instagram Reels ڈاؤن لوڈ کریں",
          noWatermark: "واٹر مارک کے بغیر: تمام ڈاؤن لوڈز واٹر مارک سے پاک ہیں، آپ کو صاف ویڈیوز ملتی ہیں",
          multipleFormats: "متعدد فارمیٹس: مختلف ویڈیو فارمیٹس (MP4، WebM) اور آڈیو فارمیٹس (MP3، M4A) میں سے منتخب کریں",
          fastSecure: "تیز اور محفوظ: محفوظ کنکشن کے ساتھ بجلی کی تیز رفتار ڈاؤن لوڈ",
          free: "ہمیشہ کے لیے مفت: بغیر کسی چھپی ہوئی فیس یا سبسکرپشن کے مکمل طور پر مفت استعمال",
          noRegistration: "رجسٹریشن کی ضرورت نہیں: اکاؤنٹ بنائے یا لاگ ان کیے بغیر ڈاؤن لوڈ کریں",
          allDevices: "تمام ڈیوائسز: ڈیسک ٹاپ، موبائل اور ٹیبلیٹ ڈیوائسز پر کام کرتا ہے",
          audioExtraction: "آڈیو نکالنا: اعلیٰ معیار میں Instagram ویڈیوز سے آڈیو نکالیں اور ڈاؤن لوڈ کریں"
        },
        whyChoose: {
          title: "ہمارا Instagram ڈاؤن لوڈر کیوں منتخب کریں؟",
          description: "دیگر Instagram ڈاؤن لوڈرز کے برعکس، ہمارا ٹول بغیر کسی واٹر مارک یا برانڈنگ کے اعلیٰ ترین معیار کے ڈاؤن لوڈز فراہم کرتا ہے۔ ہم Reels، باقاعدہ پوسٹس، IGTV ویڈیوز اور مزید سمیت تمام قسم کے Instagram مواد کی حمایت کرتے ہیں۔ ہماری جدید ٹیکنالوجی تیز پروسیسنگ اور ڈاؤن لوڈنگ کو یقینی بناتی ہے، جو اسے آن لائن دستیاب سب سے زیادہ موثر Instagram ویڈیو ڈاؤن لوڈر بناتی ہے۔"
        },
        supportedTypes: {
          title: "تعاون یافتہ Instagram مواد کی اقسام",
          reels: "Instagram Reels: HD معیار میں مقبول Reels ڈاؤن لوڈ کریں",
          posts: "Instagram پوسٹس: کسی بھی عوامی اکاؤنٹ سے ویڈیو پوسٹس محفوظ کریں",
          igtv: "IGTV ویڈیوز: لمبی شکل کے IGTV مواد ڈاؤن لوڈ کریں",
          stories: "Instagram Stories: کہانیاں غائب ہونے سے پہلے محفوظ کریں (اگر پوسٹس کے طور پر شیئر کی گئی ہوں)"
        },
        faq: {
          title: "اکثر پوچھے جانے والے سوالات",
          q1: {
            question: "کیا Instagram ویڈیوز ڈاؤن لوڈ کرنا قانونی ہے؟",
            answer: "ذاتی استعمال کے لیے Instagram ویڈیوز ڈاؤن لوڈ کرنا عام طور پر قابل قبول ہے، لیکن آپ کو کاپی رائٹ قوانین اور مواد بنانے والے کے حقوق کا احترام کرنا چاہیے۔ کسی اور کے مواد کو دوبارہ پوسٹ کرنے یا تجارتی طور پر استعمال کرنے سے پہلے ہمیشہ اجازت حاصل کریں۔"
          },
          q2: {
            question: "کیا میں نجی Instagram ویڈیوز ڈاؤن لوڈ کر سکتا ہوں؟",
            answer: "نہیں، ہمارا ٹول صرف عوامی طور پر قابل رسائی Instagram مواد کے ساتھ کام کرتا ہے۔ صارف کی رازداری کی حفاظت کے لیے نجی اکاؤنٹس اور عمر کی پابندی والے مواد کو ڈاؤن لوڈ نہیں کیا جا سکتا۔"
          },
          q3: {
            question: "کیا مجھے کوئی سافٹ ویئر انسٹال کرنے کی ضرورت ہے؟",
            answer: "کسی انسٹالیشن کی ضرورت نہیں! ہمارا Instagram ڈاؤن لوڈر مکمل طور پر ویب پر مبنی ہے۔ صرف لنک پیسٹ کریں اور ڈاؤن لوڈ کریں - یہ کسی بھی ڈیوائس پر آپ کے براؤزر میں براہ راست کام کرتا ہے۔"
          },
          q4: {
            question: "میں کس ویڈیو معیار میں ڈاؤن لوڈ کر سکتا ہوں؟",
            answer: "ہم Instagram سے دستیاب اعلیٰ ترین معیار فراہم کرتے ہیں، عام طور پر 1080p Full HD تک۔ دستیاب معیار اس بات پر منحصر ہے کہ اصل ویڈیو کیسے اپ لوڈ کی گئی تھی۔"
          },
          q5: {
            question: "کیا کوئی ڈاؤن لوڈ کی حد ہے؟",
            answer: "نہیں، کوئی حد نہیں ہے! آپ مکمل طور پر مفت جتنے چاہیں Instagram ویڈیوز اور Reels ڈاؤن لوڈ کر سکتے ہیں۔"
          },
          q6: {
            question: "کیا یہ موبائل ڈیوائسز پر کام کرتا ہے؟",
            answer: "ہاں! ہمارا Instagram ڈاؤن لوڈر مکمل طور پر ریسپانسیو ہے اور سمارٹ فونز، ٹیبلٹس اور ڈیسک ٹاپ کمپیوٹرز سمیت تمام ڈیوائسز پر بہترین طریقے سے کام کرتا ہے۔"
          }
        },
        proTip: {
          title: "پرو ٹپ:",
          description: "بہترین تجربے کے لیے، ہمیشہ \"https://\" سمیت مکمل Instagram URL کاپی کریں۔ آپ کسی بھی Instagram پوسٹ پر تین نقطوں کے مینو پر کلک کر کے اور \"لنک کاپی کریں\" یا \"شیئر کریں...\" منتخب کر کے اور پھر URL کاپی کر کے لنک حاصل کر سکتے ہیں۔"
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

    // Merge instagram translations with existing data
    if (!existingData.seo) {
      existingData.seo = {};
    }
    existingData.seo.instagram = instagramTranslations[locale].seo.instagram;

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
    console.log(`✅ ${locale.toUpperCase()} Instagram translations added!`);
  });

  console.log('\n🎉 Chinese and Urdu Instagram translations completed!');
}

updateTranslations();
