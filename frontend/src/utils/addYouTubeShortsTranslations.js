const fs = require('fs');
const path = require('path');

// YouTube Shorts translations
const youtubeTranslations = {
  en: {
    seo: {
      youtube: {
        mainTitle: "YouTube Shorts Downloader - Save Shorts Videos in HD Quality",
        intro: "Our YouTube Shorts Downloader is the best free tool to download YouTube Shorts videos in HD 1080p, 4K quality without any watermark. Save your favorite Shorts content directly to your device with just a few clicks.",
        howTo: {
          title: "How to Download YouTube Shorts",
          step1: "Copy the Shorts link: Open YouTube app or website, find the Short video you want to download, and copy its URL",
          step2: "Paste the URL: Paste the YouTube Shorts link in the input box above",
          step3: "Click 'Get Video': Our tool will analyze the video and fetch all available formats",
          step4: "Choose quality: Select your preferred video quality (4K, 1080p, 720p) or audio format",
          step5: "Download: Click the download button and save the file to your device"
        },
        features: {
          title: "Key Features",
          highQuality: "High Quality Downloads: Download YouTube Shorts in 4K, Full HD 1080p, and HD 720p quality",
          noWatermark: "No Watermark: All downloads are completely watermark-free and clean",
          multipleFormats: "Multiple Formats: Choose from various video formats (MP4, WebM) and audio formats (MP3, M4A)",
          fastSecure: "Fast & Secure: Lightning-fast downloads with encrypted secure connections",
          free: "Free Forever: Completely free to use with no hidden charges or premium plans",
          noRegistration: "No Registration: Download without creating an account or signing in",
          allDevices: "All Devices: Works perfectly on desktop, mobile, tablet, and all devices",
          audioExtraction: "Audio Extraction: Extract and download audio from YouTube Shorts in high quality MP3"
        },
        whyChoose: {
          title: "Why Choose Our YouTube Shorts Downloader?",
          description: "Unlike other YouTube Shorts downloaders, our tool provides the highest quality downloads up to 4K resolution without any watermarks. We support all types of Shorts content and offer the fastest processing speeds. Our advanced technology ensures seamless downloading, making it the most reliable YouTube Shorts downloader available online."
        },
        faq: {
          title: "Frequently Asked Questions",
          q1: {
            question: "Is it legal to download YouTube Shorts?",
            answer: "Downloading YouTube Shorts for personal use is generally acceptable, but you should respect copyright laws and content creator rights. Always get permission before reposting or using content commercially."
          },
          q2: {
            question: "Can I download private or age-restricted Shorts?",
            answer: "No, our tool only works with publicly accessible YouTube Shorts content. Private and age-restricted videos cannot be downloaded to protect user privacy and comply with YouTube's terms."
          },
          q3: {
            question: "Do I need to install any software?",
            answer: "No installation required! Our YouTube Shorts downloader is completely web-based. Just paste the link and download - it works directly in your browser on any device."
          },
          q4: {
            question: "What video quality can I download?",
            answer: "We provide the highest quality available from YouTube, up to 4K Ultra HD. Available qualities include 4K (2160p), Full HD (1080p), HD (720p), and lower resolutions depending on the original upload."
          },
          q5: {
            question: "Is there a download limit?",
            answer: "No limits at all! You can download unlimited YouTube Shorts videos completely free. No daily restrictions, no premium plans required."
          },
          q6: {
            question: "Does it work on mobile devices?",
            answer: "Yes! Our YouTube Shorts downloader is fully responsive and works perfectly on all devices including smartphones (iPhone, Android), tablets (iPad), and desktop computers."
          }
        },
        proTip: {
          title: "Pro Tip:",
          description: "For best results, always copy the full YouTube Shorts URL including 'https://'. You can easily get the link by tapping the Share button on any Short and selecting 'Copy Link'."
        }
      }
    }
  },
  hi: {
    seo: {
      youtube: {
        mainTitle: "YouTube Shorts डाउनलोडर - HD गुणवत्ता में Shorts वीडियो सेव करें",
        intro: "हमारा YouTube Shorts डाउनलोडर बिना किसी वॉटरमार्क के HD 1080p, 4K गुणवत्ता में YouTube Shorts वीडियो डाउनलोड करने का सबसे अच्छा मुफ्त टूल है। अपने पसंदीदा Shorts कंटेंट को बस कुछ क्लिक में सीधे अपने डिवाइस में सेव करें।",
        howTo: {
          title: "YouTube Shorts कैसे डाउनलोड करें",
          step1: "Shorts लिंक कॉपी करें: YouTube ऐप या वेबसाइट खोलें, जिस Short वीडियो को आप डाउनलोड करना चाहते हैं उसे ढूंढें, और उसका URL कॉपी करें",
          step2: "URL पेस्ट करें: YouTube Shorts लिंक को ऊपर दिए गए इनपुट बॉक्स में पेस्ट करें",
          step3: "'गेट वीडियो' पर क्लिक करें: हमारा टूल वीडियो का विश्लेषण करेगा और सभी उपलब्ध फॉर्मेट लाएगा",
          step4: "गुणवत्ता चुनें: अपनी पसंदीदा वीडियो गुणवत्ता (4K, 1080p, 720p) या ऑडियो फॉर्मेट चुनें",
          step5: "डाउनलोड: डाउनलोड बटन पर क्लिक करें और फाइल को अपने डिवाइस में सेव करें"
        },
        features: {
          title: "मुख्य विशेषताएं",
          highQuality: "उच्च गुणवत्ता डाउनलोड: 4K, Full HD 1080p, और HD 720p गुणवत्ता में YouTube Shorts डाउनलोड करें",
          noWatermark: "बिना वॉटरमार्क: सभी डाउनलोड पूरी तरह से वॉटरमार्क-मुक्त और साफ हैं",
          multipleFormats: "एकाधिक फॉर्मेट: विभिन्न वीडियो फॉर्मेट (MP4, WebM) और ऑडियो फॉर्मेट (MP3, M4A) में से चुनें",
          fastSecure: "तेज़ और सुरक्षित: एन्क्रिप्टेड सुरक्षित कनेक्शन के साथ बिजली की तेज़ डाउनलोड",
          free: "हमेशा के लिए मुफ्त: बिना किसी छिपे शुल्क या प्रीमियम प्लान के पूरी तरह से मुफ्त उपयोग",
          noRegistration: "बिना पंजीकरण: बिना खाता बनाए या साइन इन किए डाउनलोड करें",
          allDevices: "सभी डिवाइस: डेस्कटॉप, मोबाइल, टैबलेट और सभी डिवाइस पर पूरी तरह से काम करता है",
          audioExtraction: "ऑडियो निष्कर्षण: उच्च गुणवत्ता MP3 में YouTube Shorts से ऑडियो निकालें और डाउनलोड करें"
        },
        whyChoose: {
          title: "हमारा YouTube Shorts डाउनलोडर क्यों चुनें?",
          description: "अन्य YouTube Shorts डाउनलोडर के विपरीत, हमारा टूल बिना किसी वॉटरमार्क के 4K रेज़ोल्यूशन तक उच्चतम गुणवत्ता डाउनलोड प्रदान करता है। हम सभी प्रकार के Shorts कंटेंट का समर्थन करते हैं और सबसे तेज़ प्रसंस्करण गति प्रदान करते हैं। हमारी उन्नत तकनीक सहज डाउनलोडिंग सुनिश्चित करती है, जिससे यह ऑनलाइन उपलब्ध सबसे विश्वसनीय YouTube Shorts डाउनलोडर बन जाता है।"
        },
        faq: {
          title: "अक्सर पूछे जाने वाले प्रश्न",
          q1: {
            question: "क्या YouTube Shorts डाउनलोड करना कानूनी है?",
            answer: "व्यक्तिगत उपयोग के लिए YouTube Shorts डाउनलोड करना आम तौर पर स्वीकार्य है, लेकिन आपको कॉपीराइट कानूनों और कंटेंट निर्माता के अधिकारों का सम्मान करना चाहिए। व्यावसायिक रूप से कंटेंट को पुनः पोस्ट करने या उपयोग करने से पहले हमेशा अनुमति प्राप्त करें।"
          },
          q2: {
            question: "क्या मैं निजी या आयु-प्रतिबंधित Shorts डाउनलोड कर सकता हूं?",
            answer: "नहीं, हमारा टूल केवल सार्वजनिक रूप से सुलभ YouTube Shorts कंटेंट के साथ काम करता है। उपयोगकर्ता गोपनीयता की रक्षा और YouTube की शर्तों का पालन करने के लिए निजी और आयु-प्रतिबंधित वीडियो डाउनलोड नहीं किए जा सकते।"
          },
          q3: {
            question: "क्या मुझे कोई सॉफ़्टवेयर इंस्टॉल करने की आवश्यकता है?",
            answer: "किसी इंस्टॉलेशन की आवश्यकता नहीं! हमारा YouTube Shorts डाउनलोडर पूरी तरह से वेब-आधारित है। बस लिंक पेस्ट करें और डाउनलोड करें - यह किसी भी डिवाइस पर आपके ब्राउज़र में सीधे काम करता है।"
          },
          q4: {
            question: "मैं किस वीडियो गुणवत्ता में डाउनलोड कर सकता हूं?",
            answer: "हम YouTube से उपलब्ध उच्चतम गुणवत्ता प्रदान करते हैं, 4K Ultra HD तक। उपलब्ध गुणवत्ताओं में 4K (2160p), Full HD (1080p), HD (720p), और मूल अपलोड के आधार पर कम रेज़ोल्यूशन शामिल हैं।"
          },
          q5: {
            question: "क्या कोई डाउनलोड सीमा है?",
            answer: "बिल्कुल कोई सीमा नहीं! आप पूरी तरह से मुफ्त असीमित YouTube Shorts वीडियो डाउनलोड कर सकते हैं। कोई दैनिक प्रतिबंध नहीं, कोई प्रीमियम प्लान की आवश्यकता नहीं।"
          },
          q6: {
            question: "क्या यह मोबाइल डिवाइस पर काम करता है?",
            answer: "हां! हमारा YouTube Shorts डाउनलोडर पूरी तरह से उत्तरदायी है और स्मार्टफोन (iPhone, Android), टैबलेट (iPad), और डेस्कटॉप कंप्यूटर सहित सभी डिवाइस पर पूरी तरह से काम करता है।"
          }
        },
        proTip: {
          title: "प्रो टिप:",
          description: "सर्वोत्तम परिणामों के लिए, हमेशा 'https://' सहित पूर्ण YouTube Shorts URL कॉपी करें। आप किसी भी Short पर शेयर बटन पर टैप करके और 'Copy Link' चुनकर आसानी से लिंक प्राप्त कर सकते हैं।"
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

    // Merge youtube translations with existing data
    if (!existingData.seo) {
      existingData.seo = {};
    }
    existingData.seo.youtube = youtubeTranslations[locale].seo.youtube;

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
    console.log(`✅ ${locale.toUpperCase()} YouTube Shorts translations added!`);
  });

  console.log('\n🎉 YouTube Shorts translations completed!');
}

updateTranslations();
