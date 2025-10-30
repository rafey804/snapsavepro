const fs = require('fs');
const path = require('path');

// Facebook and Twitter translations
const platformTranslations = {
  en: {
    seo: {
      facebook: {
        mainTitle: "Facebook Video Downloader - Save Facebook Videos in HD Quality",
        intro: "Our Facebook Video Downloader is the best free tool to download Facebook videos in HD quality without any watermark. Save your favorite Facebook videos directly to your device with just a few clicks.",
        howTo: {
          title: "How to Download Facebook Videos",
          step1: "Copy the Facebook video link: Open Facebook, find the video you want to download, and copy its URL",
          step2: "Paste the URL: Paste the Facebook video link in the input box above",
          step3: "Click 'Get Video': Our tool will analyze the video and fetch all available formats",
          step4: "Choose quality: Select your preferred video quality (HD, SD) or audio format",
          step5: "Download: Click the download button and save the file to your device"
        },
        features: {
          title: "Key Features",
          highQuality: "High Quality Downloads: Download Facebook videos in HD 1080p and 720p quality",
          noWatermark: "No Watermark: All downloads are completely watermark-free",
          multipleFormats: "Multiple Formats: Choose from various video formats (MP4) and audio formats (MP3)",
          fastSecure: "Fast & Secure: Lightning-fast downloads with encrypted connections",
          free: "Free Forever: Completely free to use with no hidden charges",
          noRegistration: "No Registration: Download without creating an account",
          allDevices: "All Devices: Works on desktop, mobile, and tablet devices",
          audioExtraction: "Audio Extraction: Extract audio from Facebook videos in MP3 format"
        },
        whyChoose: {
          title: "Why Choose Our Facebook Video Downloader?",
          description: "Unlike other Facebook video downloaders, our tool provides the highest quality downloads without any watermarks. We support all types of Facebook videos including public posts, pages, and groups. Our advanced technology ensures fast processing and downloading."
        },
        faq: {
          title: "Frequently Asked Questions",
          q1: {
            question: "Is it legal to download Facebook videos?",
            answer: "Downloading Facebook videos for personal use is generally acceptable, but you should respect copyright laws and content creator rights. Always get permission before reposting or using content commercially."
          },
          q2: {
            question: "Can I download private Facebook videos?",
            answer: "No, our tool only works with publicly accessible Facebook content. Private videos cannot be downloaded to protect user privacy."
          },
          q3: {
            question: "Do I need to install any software?",
            answer: "No installation required! Our Facebook video downloader is completely web-based. Just paste the link and download."
          },
          q4: {
            question: "What video quality can I download?",
            answer: "We provide the highest quality available from Facebook, typically up to 1080p HD. Available qualities depend on the original upload."
          },
          q5: {
            question: "Is there a download limit?",
            answer: "No limits! You can download unlimited Facebook videos completely free."
          },
          q6: {
            question: "Does it work on mobile devices?",
            answer: "Yes! Our downloader works perfectly on all devices including smartphones, tablets, and computers."
          }
        },
        proTip: {
          title: "Pro Tip:",
          description: "For best results, copy the full Facebook video URL including 'https://'. You can get the link by clicking the three dots on any Facebook video post."
        }
      },
      twitter: {
        mainTitle: "Twitter Video Downloader - Save Twitter Videos & GIFs",
        intro: "Our Twitter Video Downloader is the best free tool to download Twitter videos and GIFs in high quality. Save your favorite Twitter content directly to your device with just a few clicks.",
        howTo: {
          title: "How to Download Twitter Videos",
          step1: "Copy the Tweet link: Open Twitter, find the video or GIF you want to download, and copy the tweet URL",
          step2: "Paste the URL: Paste the Twitter link in the input box above",
          step3: "Click 'Get Video': Our tool will analyze the content and fetch all available formats",
          step4: "Choose quality: Select your preferred video quality or GIF format",
          step5: "Download: Click the download button and save the file to your device"
        },
        features: {
          title: "Key Features",
          highQuality: "High Quality Downloads: Download Twitter videos in the best available quality up to 1080p",
          noWatermark: "No Watermark: All downloads are watermark-free",
          multipleFormats: "Multiple Formats: Download videos in MP4 format or save GIFs",
          fastSecure: "Fast & Secure: Quick downloads with secure encrypted connections",
          free: "Free Forever: Completely free with no subscription required",
          noRegistration: "No Registration: No account needed to download",
          allDevices: "All Devices: Works seamlessly on all devices",
          audioExtraction: "Audio Extraction: Extract audio from Twitter videos as MP3"
        },
        whyChoose: {
          title: "Why Choose Our Twitter Video Downloader?",
          description: "Our tool provides the fastest and most reliable way to download Twitter videos and GIFs. We support all types of Twitter content including videos, GIFs, and media from tweets. No watermarks, no registration, just simple and fast downloads."
        },
        faq: {
          title: "Frequently Asked Questions",
          q1: {
            question: "Is it legal to download Twitter videos?",
            answer: "Downloading Twitter videos for personal use is generally acceptable. Always respect copyright and get permission before reposting content."
          },
          q2: {
            question: "Can I download videos from private Twitter accounts?",
            answer: "No, our tool only works with publicly accessible tweets. Private account content cannot be downloaded."
          },
          q3: {
            question: "Do I need to install any software?",
            answer: "No! Our Twitter downloader is entirely web-based. Just paste the link and download directly in your browser."
          },
          q4: {
            question: "What video quality can I download?",
            answer: "We provide the best quality available from Twitter, up to 1080p HD depending on the original upload quality."
          },
          q5: {
            question: "Is there a download limit?",
            answer: "No limits at all! Download unlimited Twitter videos and GIFs completely free."
          },
          q6: {
            question: "Does it work on mobile?",
            answer: "Yes! Works perfectly on iPhone, Android, tablets, and all mobile devices."
          }
        },
        proTip: {
          title: "Pro Tip:",
          description: "Copy the full tweet URL by clicking the share icon on any tweet and selecting 'Copy link'. Make sure to include the complete URL for best results."
        }
      }
    }
  },
  hi: {
    seo: {
      facebook: {
        mainTitle: "Facebook वीडियो डाउनलोडर - HD गुणवत्ता में Facebook वीडियो सेव करें",
        intro: "हमारा Facebook वीडियो डाउनलोडर बिना किसी वॉटरमार्क के HD गुणवत्ता में Facebook वीडियो डाउनलोड करने का सबसे अच्छा मुफ्त टूल है। अपने पसंदीदा Facebook वीडियो को बस कुछ क्लिक में सीधे अपने डिवाइस में सेव करें।",
        howTo: {
          title: "Facebook वीडियो कैसे डाउनलोड करें",
          step1: "Facebook वीडियो लिंक कॉपी करें: Facebook खोलें, जिस वीडियो को आप डाउनलोड करना चाहते हैं उसे ढूंढें, और उसका URL कॉपी करें",
          step2: "URL पेस्ट करें: Facebook वीडियो लिंक को ऊपर दिए गए इनपुट बॉक्स में पेस्ट करें",
          step3: "'गेट वीडियो' पर क्लिक करें: हमारा टूल वीडियो का विश्लेषण करेगा और सभी उपलब्ध फॉर्मेट लाएगा",
          step4: "गुणवत्ता चुनें: अपनी पसंदीदा वीडियो गुणवत्ता (HD, SD) या ऑडियो फॉर्मेट चुनें",
          step5: "डाउनलोड: डाउनलोड बटन पर क्लिक करें और फाइल को अपने डिवाइस में सेव करें"
        },
        features: {
          title: "मुख्य विशेषताएं",
          highQuality: "उच्च गुणवत्ता डाउनलोड: HD 1080p और 720p गुणवत्ता में Facebook वीडियो डाउनलोड करें",
          noWatermark: "बिना वॉटरमार्क: सभी डाउनलोड पूरी तरह से वॉटरमार्क-मुक्त हैं",
          multipleFormats: "एकाधिक फॉर्मेट: विभिन्न वीडियो फॉर्मेट (MP4) और ऑडियो फॉर्मेट (MP3) में से चुनें",
          fastSecure: "तेज़ और सुरक्षित: एन्क्रिप्टेड कनेक्शन के साथ बिजली की तेज़ डाउनलोड",
          free: "हमेशा के लिए मुफ्त: बिना किसी छिपे शुल्क के पूरी तरह से मुफ्त",
          noRegistration: "बिना पंजीकरण: बिना खाता बनाए डाउनलोड करें",
          allDevices: "सभी डिवाइस: डेस्कटॉप, मोबाइल और टैबलेट पर काम करता है",
          audioExtraction: "ऑडियो निष्कर्षण: MP3 फॉर्मेट में Facebook वीडियो से ऑडियो निकालें"
        },
        whyChoose: {
          title: "हमारा Facebook वीडियो डाउनलोडर क्यों चुनें?",
          description: "अन्य Facebook वीडियो डाउनलोडर के विपरीत, हमारा टूल बिना किसी वॉटरमार्क के उच्चतम गुणवत्ता डाउनलोड प्रदान करता है। हम सार्वजनिक पोस्ट, पेज और ग्रुप सहित सभी प्रकार के Facebook वीडियो का समर्थन करते हैं। हमारी उन्नत तकनीक तेज़ प्रसंस्करण और डाउनलोडिंग सुनिश्चित करती है।"
        },
        faq: {
          title: "अक्सर पूछे जाने वाले प्रश्न",
          q1: {
            question: "क्या Facebook वीडियो डाउनलोड करना कानूनी है?",
            answer: "व्यक्तिगत उपयोग के लिए Facebook वीडियो डाउनलोड करना आम तौर पर स्वीकार्य है, लेकिन आपको कॉपीराइट कानूनों और कंटेंट निर्माता के अधिकारों का सम्मान करना चाहिए।"
          },
          q2: {
            question: "क्या मैं निजी Facebook वीडियो डाउनलोड कर सकता हूं?",
            answer: "नहीं, हमारा टूल केवल सार्वजनिक रूप से सुलभ Facebook कंटेंट के साथ काम करता है। उपयोगकर्ता गोपनीयता की रक्षा के लिए निजी वीडियो डाउनलोड नहीं किए जा सकते।"
          },
          q3: {
            question: "क्या मुझे कोई सॉफ़्टवेयर इंस्टॉल करने की आवश्यकता है?",
            answer: "किसी इंस्टॉलेशन की आवश्यकता नहीं! हमारा Facebook वीडियो डाउनलोडर पूरी तरह से वेब-आधारित है।"
          },
          q4: {
            question: "मैं किस वीडियो गुणवत्ता में डाउनलोड कर सकता हूं?",
            answer: "हम Facebook से उपलब्ध उच्चतम गुणवत्ता प्रदान करते हैं, आमतौर पर 1080p HD तक।"
          },
          q5: {
            question: "क्या कोई डाउनलोड सीमा है?",
            answer: "कोई सीमा नहीं! आप पूरी तरह से मुफ्त असीमित Facebook वीडियो डाउनलोड कर सकते हैं।"
          },
          q6: {
            question: "क्या यह मोबाइल डिवाइस पर काम करता है?",
            answer: "हां! हमारा डाउनलोडर स्मार्टफोन, टैबलेट और कंप्यूटर सहित सभी डिवाइस पर पूरी तरह से काम करता है।"
          }
        },
        proTip: {
          title: "प्रो टिप:",
          description: "सर्वोत्तम परिणामों के लिए, 'https://' सहित पूर्ण Facebook वीडियो URL कॉपी करें।"
        }
      },
      twitter: {
        mainTitle: "Twitter वीडियो डाउनलोडर - Twitter वीडियो और GIF सेव करें",
        intro: "हमारा Twitter वीडियो डाउनलोडर उच्च गुणवत्ता में Twitter वीडियो और GIF डाउनलोड करने का सबसे अच्छा मुफ्त टूल है। अपने पसंदीदा Twitter कंटेंट को बस कुछ क्लिक में सीधे अपने डिवाइस में सेव करें।",
        howTo: {
          title: "Twitter वीडियो कैसे डाउनलोड करें",
          step1: "Tweet लिंक कॉपी करें: Twitter खोलें, जिस वीडियो या GIF को आप डाउनलोड करना चाहते हैं उसे ढूंढें, और tweet URL कॉपी करें",
          step2: "URL पेस्ट करें: Twitter लिंक को ऊपर दिए गए इनपुट बॉक्स में पेस्ट करें",
          step3: "'गेट वीडियो' पर क्लिक करें: हमारा टूल कंटेंट का विश्लेषण करेगा और सभी उपलब्ध फॉर्मेट लाएगा",
          step4: "गुणवत्ता चुनें: अपनी पसंदीदा वीडियो गुणवत्ता या GIF फॉर्मेट चुनें",
          step5: "डाउनलोड: डाउनलोड बटन पर क्लिक करें और फाइल को अपने डिवाइस में सेव करें"
        },
        features: {
          title: "मुख्य विशेषताएं",
          highQuality: "उच्च गुणवत्ता डाउनलोड: 1080p तक सर्वोत्तम उपलब्ध गुणवत्ता में Twitter वीडियो डाउनलोड करें",
          noWatermark: "बिना वॉटरमार्क: सभी डाउनलोड वॉटरमार्क-मुक्त हैं",
          multipleFormats: "एकाधिक फॉर्मेट: MP4 फॉर्मेट में वीडियो डाउनलोड करें या GIF सेव करें",
          fastSecure: "तेज़ और सुरक्षित: सुरक्षित एन्क्रिप्टेड कनेक्शन के साथ त्वरित डाउनलोड",
          free: "हमेशा के लिए मुफ्त: बिना किसी सदस्यता के पूरी तरह से मुफ्त",
          noRegistration: "बिना पंजीकरण: डाउनलोड करने के लिए कोई खाता आवश्यक नहीं",
          allDevices: "सभी डिवाइस: सभी डिवाइस पर सहजता से काम करता है",
          audioExtraction: "ऑडियो निष्कर्षण: MP3 के रूप में Twitter वीडियो से ऑडियो निकालें"
        },
        whyChoose: {
          title: "हमारा Twitter वीडियो डाउनलोडर क्यों चुनें?",
          description: "हमारा टूल Twitter वीडियो और GIF डाउनलोड करने का सबसे तेज़ और सबसे विश्वसनीय तरीका प्रदान करता है। हम वीडियो, GIF और ट्वीट से मीडिया सहित सभी प्रकार के Twitter कंटेंट का समर्थन करते हैं। कोई वॉटरमार्क नहीं, कोई पंजीकरण नहीं, बस सरल और तेज़ डाउनलोड।"
        },
        faq: {
          title: "अक्सर पूछे जाने वाले प्रश्न",
          q1: {
            question: "क्या Twitter वीडियो डाउनलोड करना कानूनी है?",
            answer: "व्यक्तिगत उपयोग के लिए Twitter वीडियो डाउनलोड करना आम तौर पर स्वीकार्य है। हमेशा कॉपीराइट का सम्मान करें।"
          },
          q2: {
            question: "क्या मैं निजी Twitter खातों से वीडियो डाउनलोड कर सकता हूं?",
            answer: "नहीं, हमारा टूल केवल सार्वजनिक रूप से सुलभ ट्वीट के साथ काम करता है।"
          },
          q3: {
            question: "क्या मुझे कोई सॉफ़्टवेयर इंस्टॉल करने की आवश्यकता है?",
            answer: "नहीं! हमारा Twitter डाउनलोडर पूरी तरह से वेब-आधारित है।"
          },
          q4: {
            question: "मैं किस वीडियो गुणवत्ता में डाउनलोड कर सकता हूं?",
            answer: "हम Twitter से सर्वोत्तम उपलब्ध गुणवत्ता प्रदान करते हैं, 1080p HD तक।"
          },
          q5: {
            question: "क्या कोई डाउनलोड सीमा है?",
            answer: "बिल्कुल कोई सीमा नहीं! पूरी तरह से मुफ्त असीमित Twitter वीडियो डाउनलोड करें।"
          },
          q6: {
            question: "क्या यह मोबाइल पर काम करता है?",
            answer: "हां! iPhone, Android, टैबलेट और सभी मोबाइल डिवाइस पर पूरी तरह से काम करता है।"
          }
        },
        proTip: {
          title: "प्रो टिप:",
          description: "किसी भी ट्वीट पर शेयर आइकन पर क्लिक करके और 'Copy link' चुनकर पूर्ण tweet URL कॉपी करें।"
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

    // Merge facebook and twitter translations
    if (!existingData.seo) {
      existingData.seo = {};
    }
    existingData.seo.facebook = platformTranslations[locale].seo.facebook;
    existingData.seo.twitter = platformTranslations[locale].seo.twitter;

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
    console.log(`✅ ${locale.toUpperCase()} Facebook & Twitter translations added!`);
  });

  console.log('\n🎉 Facebook & Twitter translations completed!');
}

updateTranslations();
