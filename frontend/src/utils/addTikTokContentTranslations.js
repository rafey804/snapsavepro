const fs = require('fs');
const path = require('path');

// English translations for TikTokContentSection
const enTikTokContent = {
  mainTitle: "TikTok Video Downloader Without Watermark - Free & Fast",
  introduction: {
    para1: "Welcome to Snap Save Pro, the ultimate TikTok video downloader without watermark. Our powerful tool allows you to download TikTok videos in high quality, completely free, and without any watermarks. Whether you're a content creator, marketer, or just someone who loves saving favorite TikTok moments, our downloader is designed to meet all your needs.",
    para2: "TikTok has become one of the world's most popular social media platforms, with over 1 billion active users creating and sharing short-form videos daily. From viral dance challenges to educational content, cooking tutorials to comedy sketches, TikTok offers endless entertainment. However, downloading these videos directly from TikTok includes an annoying watermark. That's where Snap Save Pro comes in - providing a seamless solution to download TikTok videos without watermark."
  },
  whyChoose: {
    title: "Why Choose Snap Save Pro for TikTok Downloads?",
    noWatermark: {
      title: "No Watermark Downloads",
      description: "Unlike other tools, we provide 100% watermark-free downloads. Your downloaded TikTok videos will be clean and professional, perfect for reposting, editing, or personal collections without any TikTok branding."
    },
    hdQuality: {
      title: "HD Quality Downloads",
      description: "We preserve the original video quality, offering downloads in HD, Full HD, and even 4K when available. Choose from multiple quality options to match your storage space and viewing preferences."
    },
    noRegistration: {
      title: "No Registration Required",
      description: "Start downloading immediately without creating an account. No signup, no login, no personal information needed. Just paste the link and download - it's that simple!"
    },
    audioSupport: {
      title: "Audio Download Support",
      description: "Extract audio from TikTok videos in MP3 format. Perfect for saving those trending songs, sound effects, or voice-overs for your own creative projects."
    }
  },
  howItWorks: {
    title: "How to Download TikTok Videos Without Watermark",
    description: "Downloading TikTok videos with Snap Save Pro is incredibly easy. Follow these simple steps to save your favorite TikTok content:",
    step1: {
      title: "Open TikTok App or Website",
      description: "Find the TikTok video you want to download. This works with any public TikTok video, including trending videos, challenges, or your favorite creator's content."
    },
    step2: {
      title: "Copy the Video Link",
      description: "Tap the \"Share\" button on the TikTok video and select \"Copy Link\". The video URL will be copied to your clipboard automatically."
    },
    step3: {
      title: "Paste and Download",
      description: "Paste the copied link into Snap Save Pro's input field, click \"Download\", and choose your preferred quality. Your watermark-free TikTok video will be ready in seconds!"
    }
  },
  advancedFeatures: {
    title: "Advanced Features for TikTok Video Downloads",
    description: "Snap Save Pro isn't just another TikTok downloader. We've built advanced features to enhance your downloading experience and provide maximum value:",
    unlimited: "Unlimited Downloads: No daily limits, no premium plans. Download as many TikTok videos as you want, completely free forever. Perfect for content creators building their video libraries.",
    mobileFriendly: "Mobile-Friendly Interface: Our responsive design works flawlessly on iPhone, Android, iPad, and all tablets. Download TikTok videos on the go, anytime, anywhere.",
    fastProcessing: "Lightning-Fast Processing: Our optimized servers process your downloads in seconds. No waiting, no queues - just instant downloads with maximum speed.",
    batchDownload: "Batch Download Support: Need to download multiple TikTok videos? Our tool supports batch processing, allowing you to queue multiple downloads simultaneously.",
    formatConversion: "Format Conversion: Download videos in MP4 format or extract audio as MP3. Perfect flexibility for content creators and music enthusiasts."
  },
  benefits: {
    title: "Benefits of Using a TikTok Video Downloader",
    description: "There are countless reasons why millions of users rely on TikTok video downloaders. Here are the top benefits:",
    contentCreation: "Content Creation & Reposting: Content creators often need to download TikTok videos for compilation videos, reaction content, or cross-platform sharing. Our watermark-free downloads ensure your content looks professional on Instagram Reels, YouTube Shorts, or Facebook.",
    offlineViewing: "Offline Viewing: Internet connectivity isn't always reliable. Download your favorite TikTok videos to watch offline during commutes, flights, or in areas with poor network coverage.",
    backup: "Backup & Archive: Creators often delete videos, or accounts get banned. By downloading TikTok videos, you can preserve memorable content, important tutorials, or viral moments forever.",
    educational: "Educational Purposes: Teachers, students, and researchers use TikTok for educational content. Our downloader helps save valuable learning resources for presentations, research, or classroom use.",
    marketing: "Marketing & Analysis: Digital marketers analyze trending TikTok content for campaign insights. Download and study successful videos to understand what resonates with audiences and improve your marketing strategy."
  },
  safetyPrivacy: {
    title: "Is Snap Save Pro Safe and Legal?",
    safety: "Safety: Absolutely! Snap Save Pro is completely safe to use. We don't require any personal information, don't install malware, and don't store your downloaded videos. Your privacy is our top priority. All downloads are processed securely through encrypted connections.",
    privacy: "Privacy: We respect your privacy 100%. We don't track your downloads, don't collect browsing data, and never share your information with third parties. What you download is your business alone.",
    legal: "Legal Disclaimer: Our tool downloads publicly available TikTok videos. However, we strongly encourage users to respect copyright laws and creators' rights. Always credit original creators when reposting content, and only download videos for personal use or with proper permissions for commercial use."
  },
  proTips: {
    title: "Pro Tips for TikTok Video Downloads",
    tip1: "Choose the Right Quality: For social media reposting, HD quality (720p) is usually sufficient. For archiving or professional use, select the highest available quality.",
    tip2: "Check Video Orientation: TikTok videos are typically vertical (9:16). Ensure your download maintains the correct aspect ratio for your intended use.",
    tip3: "Download Trending Content Early: Viral videos can be deleted or made private. Download trending content promptly to ensure you don't miss out.",
    tip4: "Use Audio Extraction Wisely: When you only need the audio (trending songs, sound effects), use our MP3 extraction feature to save storage space.",
    tip5: "Organize Your Downloads: Create folders by category (tutorials, entertainment, inspiration) to easily find your downloaded TikTok videos later."
  },
  closing: {
    title: "Start Downloading TikTok Videos Today",
    para1: "Join millions of satisfied users who trust Snap Save Pro as their go-to TikTok video downloader without watermark. Our commitment to providing free, fast, and high-quality downloads has made us the #1 choice for TikTok enthusiasts worldwide.",
    para2: "Whether you're building a content library, saving memories, or creating compilation videos, Snap Save Pro delivers the best downloading experience. No ads, no limits, no hassle - just pure, simple functionality that works every time.",
    para3: "Ready to download? Paste your TikTok video link above and experience the difference. Your next favorite video is just one click away!"
  }
};

// Read and update English file
const enPath = path.join(__dirname, '../../messages/en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
enData.seo = enData.seo || {};
enData.seo.tiktokContent = enTikTokContent;
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
console.log('✅ English TikTok content translations added!');

// Hindi translations
const hiTikTokContent = {
  mainTitle: "TikTok वीडियो डाउनलोडर बिना वॉटरमार्क के - मुफ्त और तेज़",
  introduction: {
    para1: "Snap Save Pro में आपका स्वागत है, जो बिना वॉटरमार्क के अंतिम TikTok वीडियो डाउनलोडर है। हमारा शक्तिशाली टूल आपको उच्च गुणवत्ता में TikTok वीडियो डाउनलोड करने की अनुमति देता है, पूरी तरह से मुफ्त, और बिना किसी वॉटरमार्क के। चाहे आप एक सामग्री निर्माता हों, मार्केटर हों, या कोई ऐसा व्यक्ति जो पसंदीदा TikTok पलों को सहेजना पसंद करता हो, हमारा डाउनलोडर आपकी सभी आवश्यकताओं को पूरा करने के लिए डिज़ाइन किया गया है।",
    para2: "TikTok दुनिया के सबसे लोकप्रिय सोशल मीडिया प्लेटफॉर्म में से एक बन गया है, जिसमें 1 बिलियन से अधिक सक्रिय उपयोगकर्ता प्रतिदिन लघु-रूप वीडियो बना रहे हैं और साझा कर रहे हैं। वायरल डांस चैलेंज से लेकर शैक्षिक सामग्री, खाना पकाने के ट्यूटोरियल से लेकर कॉमेडी स्केच तक, TikTok अंतहीन मनोरंजन प्रदान करता है। हालाँकि, इन वीडियो को सीधे TikTok से डाउनलोड करने में एक कष्टप्रद वॉटरमार्क शामिल होता है। यहीं पर Snap Save Pro आता है - बिना वॉटरमार्क के TikTok वीडियो डाउनलोड करने के लिए एक सहज समाधान प्रदान करता है।"
  },
  whyChoose: {
    title: "TikTok डाउनलोड के लिए Snap Save Pro को क्यों चुनें?",
    noWatermark: {
      title: "वॉटरमार्क मुक्त डाउनलोड",
      description: "अन्य टूल्स के विपरीत, हम 100% वॉटरमार्क-मुक्त डाउनलोड प्रदान करते हैं। आपके डाउनलोड किए गए TikTok वीडियो साफ और पेशेवर होंगे, बिना किसी TikTok ब्रांडिंग के पुनः पोस्ट करने, संपादित करने या व्यक्तिगत संग्रह के लिए एकदम सही।"
    },
    hdQuality: {
      title: "HD गुणवत्ता डाउनलोड",
      description: "हम मूल वीडियो गुणवत्ता को संरक्षित करते हैं, HD, Full HD और यहां तक कि 4K में डाउनलोड की पेशकश करते हैं जब उपलब्ध हो। अपने स्टोरेज स्पेस और देखने की प्राथमिकताओं से मेल खाने के लिए कई गुणवत्ता विकल्पों में से चुनें।"
    },
    noRegistration: {
      title: "पंजीकरण की आवश्यकता नहीं",
      description: "खाता बनाए बिना तुरंत डाउनलोड करना शुरू करें। कोई साइनअप नहीं, कोई लॉगिन नहीं, कोई व्यक्तिगत जानकारी की आवश्यकता नहीं। बस लिंक पेस्ट करें और डाउनलोड करें - यह इतना आसान है!"
    },
    audioSupport: {
      title: "ऑडियो डाउनलोड समर्थन",
      description: "MP3 प्रारूप में TikTok वीडियो से ऑडियो निकालें। उन ट्रेंडिंग गानों, साउंड इफेक्ट्स, या वॉयस-ओवर को अपने रचनात्मक प्रोजेक्ट्स के लिए सहेजने के लिए एकदम सही।"
    }
  },
  howItWorks: {
    title: "बिना वॉटरमार्क के TikTok वीडियो कैसे डाउनलोड करें",
    description: "Snap Save Pro के साथ TikTok वीडियो डाउनलोड करना अविश्वसनीय रूप से आसान है। अपनी पसंदीदा TikTok सामग्री को सहेजने के लिए इन सरल चरणों का पालन करें:",
    step1: {
      title: "TikTok ऐप या वेबसाइट खोलें",
      description: "जिस TikTok वीडियो को आप डाउनलोड करना चाहते हैं उसे खोजें। यह किसी भी सार्वजनिक TikTok वीडियो के साथ काम करता है, जिसमें ट्रेंडिंग वीडियो, चैलेंज, या आपके पसंदीदा निर्माता की सामग्री शामिल है।"
    },
    step2: {
      title: "वीडियो लिंक कॉपी करें",
      description: "TikTok वीडियो पर \"शेयर\" बटन पर टैप करें और \"लिंक कॉपी करें\" चुनें। वीडियो URL स्वचालित रूप से आपके क्लिपबोर्ड पर कॉपी हो जाएगा।"
    },
    step3: {
      title: "पेस्ट करें और डाउनलोड करें",
      description: "कॉपी किए गए लिंक को Snap Save Pro के इनपुट फ़ील्ड में पेस्ट करें, \"डाउनलोड\" पर क्लिक करें, और अपनी पसंदीदा गुणवत्ता चुनें। आपका वॉटरमार्क-मुक्त TikTok वीडियो सेकंड में तैयार होगा!"
    }
  },
  advancedFeatures: {
    title: "TikTok वीडियो डाउनलोड के लिए उन्नत सुविधाएँ",
    description: "Snap Save Pro केवल एक और TikTok डाउनलोडर नहीं है। हमने आपके डाउनलोडिंग अनुभव को बढ़ाने और अधिकतम मूल्य प्रदान करने के लिए उन्नत सुविधाएँ बनाई हैं:",
    unlimited: "असीमित डाउनलोड: कोई दैनिक सीमा नहीं, कोई प्रीमियम प्लान नहीं। जितने चाहें उतने TikTok वीडियो डाउनलोड करें, हमेशा के लिए पूरी तरह से मुफ्त। सामग्री निर्माताओं के लिए अपनी वीडियो लाइब्रेरी बनाने के लिए एकदम सही।",
    mobileFriendly: "मोबाइल-फ्रेंडली इंटरफ़ेस: हमारा रिस्पॉन्सिव डिज़ाइन iPhone, Android, iPad और सभी टैबलेट पर त्रुटिहीन रूप से काम करता है। कभी भी, कहीं भी, चलते-फिरते TikTok वीडियो डाउनलोड करें।",
    fastProcessing: "बिजली की तेज प्रोसेसिंग: हमारे अनुकूलित सर्वर सेकंड में आपके डाउनलोड को प्रोसेस करते हैं। कोई प्रतीक्षा नहीं, कोई कतार नहीं - अधिकतम गति के साथ बस तत्काल डाउनलोड।",
    batchDownload: "बैच डाउनलोड समर्थन: कई TikTok वीडियो डाउनलोड करने की आवश्यकता है? हमारा टूल बैच प्रोसेसिंग का समर्थन करता है, जिससे आप एक साथ कई डाउनलोड को कतारबद्ध कर सकते हैं।",
    formatConversion: "प्रारूप रूपांतरण: MP4 प्रारूप में वीडियो डाउनलोड करें या MP3 के रूप में ऑडियो निकालें। सामग्री निर्माताओं और संगीत उत्साही लोगों के लिए एकदम सही लचीलापन।"
  },
  benefits: {
    title: "TikTok वीडियो डाउनलोडर का उपयोग करने के लाभ",
    description: "लाखों उपयोगकर्ता TikTok वीडियो डाउनलोडर पर भरोसा करने के अनगिनत कारण हैं। यहाँ शीर्ष लाभ हैं:",
    contentCreation: "सामग्री निर्माण और पुनः पोस्ट करना: सामग्री निर्माताओं को अक्सर संकलन वीडियो, प्रतिक्रिया सामग्री, या क्रॉस-प्लेटफ़ॉर्म शेयरिंग के लिए TikTok वीडियो डाउनलोड करने की आवश्यकता होती है। हमारे वॉटरमार्क-मुक्त डाउनलोड सुनिश्चित करते हैं कि आपकी सामग्री Instagram Reels, YouTube Shorts या Facebook पर पेशेवर दिखे।",
    offlineViewing: "ऑफ़लाइन देखना: इंटरनेट कनेक्टिविटी हमेशा विश्वसनीय नहीं होती है। यात्रा, उड़ानों के दौरान, या खराब नेटवर्क कवरेज वाले क्षेत्रों में ऑफ़लाइन देखने के लिए अपने पसंदीदा TikTok वीडियो डाउनलोड करें।",
    backup: "बैकअप और संग्रह: निर्माता अक्सर वीडियो हटा देते हैं, या खाते प्रतिबंधित हो जाते हैं। TikTok वीडियो डाउनलोड करके, आप यादगार सामग्री, महत्वपूर्ण ट्यूटोरियल, या वायरल पलों को हमेशा के लिए संरक्षित कर सकते हैं।",
    educational: "शैक्षिक उद्देश्य: शिक्षक, छात्र और शोधकर्ता शैक्षिक सामग्री के लिए TikTok का उपयोग करते हैं। हमारा डाउनलोडर प्रस्तुतियों, अनुसंधान या कक्षा उपयोग के लिए मूल्यवान शिक्षण संसाधनों को सहेजने में मदद करता है।",
    marketing: "मार्केटिंग और विश्लेषण: डिजिटल मार्केटर्स अभियान अंतर्दृष्टि के लिए ट्रेंडिंग TikTok सामग्री का विश्लेषण करते हैं। सफल वीडियो डाउनलोड करें और अध्ययन करें कि दर्शकों के साथ क्या प्रतिध्वनित होता है और अपनी मार्केटिंग रणनीति में सुधार करें।"
  },
  safetyPrivacy: {
    title: "क्या Snap Save Pro सुरक्षित और कानूनी है?",
    safety: "सुरक्षा: बिल्कुल! Snap Save Pro का उपयोग करना पूरी तरह से सुरक्षित है। हम किसी भी व्यक्तिगत जानकारी की आवश्यकता नहीं रखते हैं, मैलवेयर इंस्टॉल नहीं करते हैं, और आपके डाउनलोड किए गए वीडियो को स्टोर नहीं करते हैं। आपकी गोपनीयता हमारी सर्वोच्च प्राथमिकता है। सभी डाउनलोड एन्क्रिप्टेड कनेक्शन के माध्यम से सुरक्षित रूप से प्रोसेस किए जाते हैं।",
    privacy: "गोपनीयता: हम आपकी गोपनीयता का 100% सम्मान करते हैं। हम आपके डाउनलोड को ट्रैक नहीं करते हैं, ब्राउज़िंग डेटा एकत्र नहीं करते हैं, और कभी भी तीसरे पक्षों के साथ आपकी जानकारी साझा नहीं करते हैं। आप जो डाउनलोड करते हैं वह केवल आपका व्यवसाय है।",
    legal: "कानूनी अस्वीकरण: हमारा टूल सार्वजनिक रूप से उपलब्ध TikTok वीडियो डाउनलोड करता है। हालाँकि, हम उपयोगकर्ताओं को कॉपीराइट कानूनों और निर्माताओं के अधिकारों का सम्मान करने के लिए दृढ़ता से प्रोत्साहित करते हैं। सामग्री को पुनः पोस्ट करते समय हमेशा मूल निर्माताओं को क्रेडिट दें, और केवल व्यक्तिगत उपयोग के लिए या वाणिज्यिक उपयोग के लिए उचित अनुमति के साथ वीडियो डाउनलोड करें।"
  },
  proTips: {
    title: "TikTok वीडियो डाउनलोड के लिए प्रो टिप्स",
    tip1: "सही गुणवत्ता चुनें: सोशल मीडिया पुनः पोस्ट करने के लिए, HD गुणवत्ता (720p) आमतौर पर पर्याप्त होती है। संग्रह या पेशेवर उपयोग के लिए, उच्चतम उपलब्ध गुणवत्ता का चयन करें।",
    tip2: "वीडियो ओरिएंटेशन जांचें: TikTok वीडियो आमतौर पर ऊर्ध्वाधर (9:16) होते हैं। सुनिश्चित करें कि आपका डाउनलोड आपके इच्छित उपयोग के लिए सही पक्षानुपात बनाए रखता है।",
    tip3: "ट्रेंडिंग सामग्री जल्दी डाउनलोड करें: वायरल वीडियो हटाए या निजी किए जा सकते हैं। यह सुनिश्चित करने के लिए ट्रेंडिंग सामग्री को तुरंत डाउनलोड करें कि आप इसे मिस न करें।",
    tip4: "ऑडियो एक्सट्रैक्शन का बुद्धिमानी से उपयोग करें: जब आपको केवल ऑडियो की आवश्यकता हो (ट्रेंडिंग गाने, साउंड इफेक्ट्स), स्टोरेज स्पेस बचाने के लिए हमारी MP3 एक्सट्रैक्शन सुविधा का उपयोग करें।",
    tip5: "अपने डाउनलोड व्यवस्थित करें: बाद में अपने डाउनलोड किए गए TikTok वीडियो को आसानी से खोजने के लिए श्रेणी के अनुसार फ़ोल्डर बनाएं (ट्यूटोरियल, मनोरंजन, प्रेरणा)।"
  },
  closing: {
    title: "आज ही TikTok वीडियो डाउनलोड करना शुरू करें",
    para1: "लाखों संतुष्ट उपयोगकर्ताओं में शामिल हों जो Snap Save Pro को अपने बिना वॉटरमार्क के TikTok वीडियो डाउनलोडर के रूप में भरोसा करते हैं। मुफ्त, तेज़ और उच्च-गुणवत्ता डाउनलोड प्रदान करने की हमारी प्रतिबद्धता ने हमें दुनिया भर में TikTok उत्साही लोगों के लिए #1 पसंद बना दिया है।",
    para2: "चाहे आप एक सामग्री लाइब्रेरी बना रहे हों, यादें सहेज रहे हों, या संकलन वीडियो बना रहे हों, Snap Save Pro सर्वोत्तम डाउनलोडिंग अनुभव प्रदान करता है। कोई विज्ञापन नहीं, कोई सीमा नहीं, कोई परेशानी नहीं - बस शुद्ध, सरल कार्यक्षमता जो हर बार काम करती है।",
    para3: "डाउनलोड करने के लिए तैयार हैं? अपना TikTok वीडियो लिंक ऊपर पेस्ट करें और अंतर का अनुभव करें। आपका अगला पसंदीदा वीडियो बस एक क्लिक दूर है!"
  }
};

// Update Hindi file
const hiPath = path.join(__dirname, '../../messages/hi.json');
const hiData = JSON.parse(fs.readFileSync(hiPath, 'utf8'));
hiData.seo = hiData.seo || {};
hiData.seo.tiktokContent = hiTikTokContent;
fs.writeFileSync(hiPath, JSON.stringify(hiData, null, 2), 'utf8');
console.log('✅ Hindi TikTok content translations added!');

console.log('\n🎉 All TikTok content section translations added for English and Hindi!');
console.log('Note: Chinese and Urdu translations are very large. They will be added in the component update step.');
