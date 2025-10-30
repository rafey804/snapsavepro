const fs = require('fs');
const path = require('path');

// Instagram page translations
const instagramTranslations = {
  en: {
    seo: {
      instagram: {
        mainTitle: "Instagram Reels Downloader - Save Instagram Videos Easily",
        intro: "Our Instagram Reels Downloader is the best free tool to download Instagram Reels, Posts, and IGTV videos in high quality without any watermark. Save your favorite Instagram content directly to your device with just a few clicks.",
        howTo: {
          title: "How to Download Instagram Reels",
          step1: "Copy the Instagram link: Open Instagram app or website, find the Reel or video you want to download, and copy its URL",
          step2: "Paste the URL: Paste the Instagram link in the input box above",
          step3: "Click \"Get Video\": Our tool will analyze the video and fetch all available formats",
          step4: "Choose quality: Select your preferred video quality or audio format",
          step5: "Download: Click the download button and save the file to your device"
        },
        features: {
          title: "Key Features",
          highQuality: "High Quality Downloads: Download Instagram Reels in the best available quality including HD and Full HD",
          noWatermark: "No Watermark: All downloads are watermark-free, giving you clean videos",
          multipleFormats: "Multiple Formats: Choose from various video formats (MP4, WebM) and audio formats (MP3, M4A)",
          fastSecure: "Fast & Secure: Lightning-fast downloads with secure connections",
          free: "Free Forever: Completely free to use with no hidden charges or subscriptions",
          noRegistration: "No Registration: Download without creating an account or logging in",
          allDevices: "All Devices: Works on desktop, mobile, and tablet devices",
          audioExtraction: "Audio Extraction: Extract and download audio from Instagram videos in high quality"
        },
        whyChoose: {
          title: "Why Choose Our Instagram Downloader?",
          description: "Unlike other Instagram downloaders, our tool offers the highest quality downloads without any watermarks or branding. We support all types of Instagram content including Reels, regular posts, IGTV videos, and more. Our advanced technology ensures fast processing and downloading, making it the most efficient Instagram video downloader available online."
        },
        supportedTypes: {
          title: "Supported Instagram Content Types",
          reels: "Instagram Reels: Download trending Reels in HD quality",
          posts: "Instagram Posts: Save video posts from any public account",
          igtv: "IGTV Videos: Download long-form IGTV content",
          stories: "Instagram Stories: Save stories before they disappear (if shared as posts)"
        },
        faq: {
          title: "Frequently Asked Questions",
          q1: {
            question: "Is it legal to download Instagram videos?",
            answer: "Downloading Instagram videos for personal use is generally acceptable, but you should respect copyright laws and the content creator's rights. Always obtain permission before reposting or using someone else's content commercially."
          },
          q2: {
            question: "Can I download private Instagram videos?",
            answer: "No, our tool only works with publicly accessible Instagram content. Private accounts and age-restricted content cannot be downloaded to protect user privacy."
          },
          q3: {
            question: "Do I need to install any software?",
            answer: "No installation required! Our Instagram downloader is entirely web-based. Just paste the link and download - it works directly in your browser on any device."
          },
          q4: {
            question: "What video quality can I download?",
            answer: "We provide the highest quality available from Instagram, typically up to 1080p Full HD. The available qualities depend on how the original video was uploaded."
          },
          q5: {
            question: "Is there a download limit?",
            answer: "No, there are no limits! You can download as many Instagram videos and Reels as you want, completely free."
          },
          q6: {
            question: "Does it work on mobile devices?",
            answer: "Yes! Our Instagram downloader is fully responsive and works perfectly on all devices including smartphones, tablets, and desktop computers."
          }
        },
        proTip: {
          title: "Pro Tip:",
          description: "For the best experience, always copy the full Instagram URL including \"https://\". You can get the link by clicking the three dots menu on any Instagram post and selecting \"Copy Link\" or \"Share to...\" and then copying the URL."
        }
      }
    }
  },
  hi: {
    seo: {
      instagram: {
        mainTitle: "इंस्टाग्राम रील्स डाउनलोडर - इंस्टाग्राम वीडियो आसानी से सेव करें",
        intro: "हमारा इंस्टाग्राम रील्स डाउनलोडर बिना किसी वॉटरमार्क के उच्च गुणवत्ता में इंस्टाग्राम रील्स, पोस्ट और IGTV वीडियो डाउनलोड करने का सबसे अच्छा मुफ्त टूल है। अपने पसंदीदा इंस्टाग्राम कंटेंट को सीधे अपने डिवाइस में बस कुछ क्लिक में सेव करें।",
        howTo: {
          title: "इंस्टाग्राम रील्स कैसे डाउनलोड करें",
          step1: "इंस्टाग्राम लिंक कॉपी करें: इंस्टाग्राम ऐप या वेबसाइट खोलें, जिस रील या वीडियो को आप डाउनलोड करना चाहते हैं उसे ढूंढें, और उसका URL कॉपी करें",
          step2: "URL पेस्ट करें: इंस्टाग्राम लिंक को ऊपर दिए गए इनपुट बॉक्स में पेस्ट करें",
          step3: "\"गेट वीडियो\" पर क्लिक करें: हमारा टूल वीडियो का विश्लेषण करेगा और सभी उपलब्ध फॉर्मेट लाएगा",
          step4: "गुणवत्ता चुनें: अपना पसंदीदा वीडियो गुणवत्ता या ऑडियो फॉर्मेट चुनें",
          step5: "डाउनलोड: डाउनलोड बटन पर क्लिक करें और फाइल को अपने डिवाइस में सेव करें"
        },
        features: {
          title: "मुख्य विशेषताएं",
          highQuality: "उच्च गुणवत्ता डाउनलोड: HD और Full HD सहित सर्वोत्तम उपलब्ध गुणवत्ता में इंस्टाग्राम रील्स डाउनलोड करें",
          noWatermark: "बिना वॉटरमार्क: सभी डाउनलोड वॉटरमार्क-मुक्त हैं, आपको साफ वीडियो मिलते हैं",
          multipleFormats: "एकाधिक फॉर्मेट: विभिन्न वीडियो फॉर्मेट (MP4, WebM) और ऑडियो फॉर्मेट (MP3, M4A) में से चुनें",
          fastSecure: "तेज़ और सुरक्षित: सुरक्षित कनेक्शन के साथ बिजली की तेज़ डाउनलोड",
          free: "हमेशा के लिए मुफ्त: बिना किसी छिपे शुल्क या सदस्यता के पूरी तरह से मुफ्त उपयोग",
          noRegistration: "बिना पंजीकरण: बिना खाता बनाए या लॉगिन किए डाउनलोड करें",
          allDevices: "सभी डिवाइस: डेस्कटॉप, मोबाइल और टैबलेट डिवाइस पर काम करता है",
          audioExtraction: "ऑडियो निष्कर्षण: उच्च गुणवत्ता में इंस्टाग्राम वीडियो से ऑडियो निकालें और डाउनलोड करें"
        },
        whyChoose: {
          title: "हमारा इंस्टाग्राम डाउनलोडर क्यों चुनें?",
          description: "अन्य इंस्टाग्राम डाउनलोडर के विपरीत, हमारा टूल बिना किसी वॉटरमार्क या ब्रांडिंग के उच्चतम गुणवत्ता डाउनलोड प्रदान करता है। हम रील्स, नियमित पोस्ट, IGTV वीडियो और अधिक सहित सभी प्रकार के इंस्टाग्राम कंटेंट का समर्थन करते हैं। हमारी उन्नत तकनीक तेज़ प्रसंस्करण और डाउनलोडिंग सुनिश्चित करती है, जिससे यह ऑनलाइन उपलब्ध सबसे कुशल इंस्टाग्राम वीडियो डाउनलोडर बन जाता है।"
        },
        supportedTypes: {
          title: "समर्थित इंस्टाग्राम कंटेंट प्रकार",
          reels: "इंस्टाग्राम रील्स: HD गुणवत्ता में ट्रेंडिंग रील्स डाउनलोड करें",
          posts: "इंस्टाग्राम पोस्ट: किसी भी सार्वजनिक खाते से वीडियो पोस्ट सेव करें",
          igtv: "IGTV वीडियो: लंबे फॉर्म IGTV कंटेंट डाउनलोड करें",
          stories: "इंस्टाग्राम स्टोरीज: स्टोरीज़ गायब होने से पहले सेव करें (अगर पोस्ट के रूप में शेयर की गई हों)"
        },
        faq: {
          title: "अक्सर पूछे जाने वाले प्रश्न",
          q1: {
            question: "क्या इंस्टाग्राम वीडियो डाउनलोड करना कानूनी है?",
            answer: "व्यक्तिगत उपयोग के लिए इंस्टाग्राम वीडियो डाउनलोड करना आम तौर पर स्वीकार्य है, लेकिन आपको कॉपीराइट कानूनों और कंटेंट निर्माता के अधिकारों का सम्मान करना चाहिए। किसी और के कंटेंट को व्यावसायिक रूप से पुनः पोस्ट करने या उपयोग करने से पहले हमेशा अनुमति प्राप्त करें।"
          },
          q2: {
            question: "क्या मैं निजी इंस्टाग्राम वीडियो डाउनलोड कर सकता हूं?",
            answer: "नहीं, हमारा टूल केवल सार्वजनिक रूप से सुलभ इंस्टाग्राम कंटेंट के साथ काम करता है। उपयोगकर्ता गोपनीयता की रक्षा के लिए निजी खाते और आयु-प्रतिबंधित कंटेंट डाउनलोड नहीं किया जा सकता।"
          },
          q3: {
            question: "क्या मुझे कोई सॉफ़्टवेयर इंस्टॉल करने की आवश्यकता है?",
            answer: "किसी इंस्टॉलेशन की आवश्यकता नहीं! हमारा इंस्टाग्राम डाउनलोडर पूरी तरह से वेब-आधारित है। बस लिंक पेस्ट करें और डाउनलोड करें - यह किसी भी डिवाइस पर आपके ब्राउज़र में सीधे काम करता है।"
          },
          q4: {
            question: "मैं किस वीडियो गुणवत्ता में डाउनलोड कर सकता हूं?",
            answer: "हम इंस्टाग्राम से उपलब्ध उच्चतम गुणवत्ता प्रदान करते हैं, आमतौर पर 1080p Full HD तक। उपलब्ध गुणवत्ता इस बात पर निर्भर करती है कि मूल वीडियो कैसे अपलोड किया गया था।"
          },
          q5: {
            question: "क्या कोई डाउनलोड सीमा है?",
            answer: "नहीं, कोई सीमा नहीं है! आप जितने चाहें उतने इंस्टाग्राम वीडियो और रील्स पूरी तरह से मुफ्त डाउनलोड कर सकते हैं।"
          },
          q6: {
            question: "क्या यह मोबाइल डिवाइस पर काम करता है?",
            answer: "हां! हमारा इंस्टाग्राम डाउनलोडर पूरी तरह से उत्तरदायी है और स्मार्टफोन, टैबलेट और डेस्कटॉप कंप्यूटर सहित सभी डिवाइस पर पूरी तरह से काम करता है।"
          }
        },
        proTip: {
          title: "प्रो टिप:",
          description: "सर्वोत्तम अनुभव के लिए, हमेशा \"https://\" सहित पूर्ण इंस्टाग्राम URL कॉपी करें। आप किसी भी इंस्टाग्राम पोस्ट पर तीन डॉट्स मेनू पर क्लिक करके और \"Copy Link\" या \"Share to...\" चुनकर और फिर URL कॉपी करके लिंक प्राप्त कर सकते हैं।"
        }
      }
    }
  }
};

// Function to update JSON files
function updateTranslations() {
  const messagesDir = path.join(__dirname, '..', '..', 'messages');

  ['en', 'hi'].forEach(locale => {
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

  console.log('\n🎉 Instagram content translations completed!');
}

updateTranslations();
