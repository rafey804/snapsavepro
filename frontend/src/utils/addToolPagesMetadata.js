const fs = require('fs');
const path = require('path');

// Comprehensive metadata for all tool pages in all 4 languages
const toolPagesMetadata = {
  en: {
    facebook: {
      title: "Facebook Video Downloader - Download Facebook Videos in HD Free | Snap Save Pro",
      description: "Download Facebook videos in HD quality for free. Save Facebook videos, reels, and stories without watermark. Fast, secure, and no registration required.",
      keywords: "facebook video downloader, download facebook videos, facebook downloader, save facebook videos, facebook video download, facebook reels downloader, facebook story downloader, facebook video saver, download facebook videos hd, facebook downloader online, free facebook downloader, fb video downloader, fb downloader, download fb videos, facebook video download free"
    },
    twitter: {
      title: "Twitter/X Video Downloader - Download X Videos Without Watermark | Snap Save Pro",
      description: "Download Twitter and X videos in HD quality without watermark. Fast, free, and easy Twitter video downloader. Supports all video formats from Twitter/X posts.",
      keywords: "twitter video downloader, x video downloader, download twitter videos, x video download, twitter video download without watermark, twitter downloader, x downloader, save twitter videos, twitter video saver, x video saver, download x videos, twitter video download hd, x video download hd, twitter video downloader online, free twitter downloader"
    },
    instagramReels: {
      title: "Instagram Reels Downloader - Download Reels & Videos in HD 1080p | No Watermark",
      description: "Best free Instagram Reels downloader online. Download Instagram Reels, Posts, IGTV, Stories in HD 1080p without watermark. Fast, secure, no registration required.",
      keywords: "instagram reels downloader, download instagram reels, instagram downloader, instagram video downloader, save instagram reels, instagram video download, instagram reels download, download reels, instagram no watermark, instagram HD download 1080p, instagram reels to mp4, instagram reels to mp3, download instagram posts, IGTV downloader, instagram story downloader"
    },
    youtubeShorts: {
      title: "YouTube Shorts Downloader - Download Shorts in HD 1080p, 4K Quality | No Watermark",
      description: "Best free YouTube Shorts downloader online. Download YouTube Shorts videos in HD 1080p, 4K without watermark. Fast, secure, no registration required.",
      keywords: "youtube shorts downloader, download youtube shorts, youtube shorts download, save youtube shorts, youtube shorts video downloader, youtube shorts saver, download shorts, youtube shorts HD download, youtube shorts no watermark, youtube shorts to mp4, youtube shorts to mp3, download youtube shorts 4k, youtube shorts downloader online"
    }
  },
  hi: {
    facebook: {
      title: "फेसबुक वीडियो डाउनलोडर - HD में मुफ्त डाउनलोड करें | Snap Save Pro",
      description: "फेसबुक वीडियो मुफ्त में HD गुणवत्ता में डाउनलोड करें। फेसबुक वीडियो, रील्स, और स्टोरीज बिना वॉटरमार्क के सेव करें। तेज़, सुरक्षित, कोई रजिस्ट्रेशन नहीं।",
      keywords: "फेसबुक वीडियो डाउनलोडर, फेसबुक वीडियो डाउनलोड, फेसबुक डाउनलोडर, फेसबुक वीडियो सेव, फेसबुक रील्स डाउनलोडर, फेसबुक स्टोरी डाउनलोडर, एफबी वीडियो डाउनलोडर, facebook video downloader, download facebook videos, fb video downloader, save facebook videos, facebook downloader online"
    },
    twitter: {
      title: "ट्विटर/X वीडियो डाउनलोडर - बिना वॉटरमार्क डाउनलोड | Snap Save Pro",
      description: "ट्विटर और X वीडियो बिना वॉटरमार्क HD गुणवत्ता में डाउनलोड करें। तेज़, मुफ्त, और आसान ट्विटर वीडियो डाउनलोडर।",
      keywords: "ट्विटर वीडियो डाउनलोडर, एक्स वीडियो डाउनलोडर, ट्विटर वीडियो डाउनलोड, एक्स वीडियो डाउनलोड, ट्विटर डाउनलोडर, twitter video downloader, x video downloader, download twitter videos, twitter downloader, x downloader"
    },
    instagramReels: {
      title: "इंस्टाग्राम रील्स डाउनलोडर - HD 1080p में डाउनलोड | बिना वॉटरमार्क",
      description: "सबसे अच्छा मुफ्त इंस्टाग्राम रील्स डाउनलोडर। इंस्टाग्राम रील्स, पोस्ट, IGTV, स्टोरीज HD 1080p में बिना वॉटरमार्क डाउनलोड करें।",
      keywords: "इंस्टाग्राम रील्स डाउनलोडर, इंस्टाग्राम डाउनलोडर, इंस्टाग्राम वीडियो डाउनलोड, रील्स डाउनलोड, इंस्टाग्राम वीडियो डाउनलोडर, instagram reels downloader, download instagram reels, instagram downloader, save instagram reels"
    },
    youtubeShorts: {
      title: "यूट्यूब शॉर्ट्स डाउनलोडर - HD 1080p, 4K में डाउनलोड | बिना वॉटरमार्क",
      description: "सबसे अच्छा मुफ्त यूट्यूब शॉर्ट्स डाउनलोडर। यूट्यूब शॉर्ट्स वीडियो HD 1080p, 4K में बिना वॉटरमार्क डाउनलोड करें।",
      keywords: "यूट्यूब शॉर्ट्स डाउनलोडर, यूट्यूब शॉर्ट्स डाउनलोड, शॉर्ट्स डाउनलोड, यूट्यूब शॉर्ट्स वीडियो डाउनलोडर, youtube shorts downloader, download youtube shorts, youtube shorts download, save youtube shorts"
    }
  },
  zh: {
    facebook: {
      title: "Facebook视频下载器 - 免费下载HD视频 | Snap Save Pro",
      description: "免费下载Facebook视频高清质量。保存Facebook视频、Reels和Stories无水印。快速、安全、无需注册。",
      keywords: "facebook视频下载器, 下载facebook视频, facebook下载器, 保存facebook视频, facebook视频下载, facebook reels下载器, fb视频下载器, facebook video downloader, download facebook videos, save facebook videos, fb downloader"
    },
    twitter: {
      title: "Twitter/X视频下载器 - 无水印下载 | Snap Save Pro",
      description: "下载Twitter和X视频无水印高清质量。快速、免费、易用的Twitter视频下载器。",
      keywords: "twitter视频下载器, x视频下载器, 下载twitter视频, x视频下载, twitter下载器, x下载器, twitter video downloader, x video downloader, download twitter videos, x video download"
    },
    instagramReels: {
      title: "Instagram Reels下载器 - 下载HD 1080p视频 | 无水印",
      description: "最佳免费Instagram Reels下载器。下载Instagram Reels、帖子、IGTV、Stories HD 1080p无水印。",
      keywords: "instagram reels下载器, instagram下载器, instagram视频下载, reels下载, instagram视频下载器, instagram reels downloader, download instagram reels, instagram downloader, save instagram reels"
    },
    youtubeShorts: {
      title: "YouTube Shorts下载器 - 下载HD 1080p, 4K视频 | 无水印",
      description: "最佳免费YouTube Shorts下载器。下载YouTube Shorts视频HD 1080p, 4K无水印。",
      keywords: "youtube shorts下载器, 下载youtube shorts, youtube shorts下载, 保存youtube shorts, youtube shorts视频下载器, youtube shorts downloader, download youtube shorts, youtube shorts download"
    }
  },
  ur: {
    facebook: {
      title: "فیس بک ویڈیو ڈاؤن لوڈر - HD میں مفت ڈاؤن لوڈ | Snap Save Pro",
      description: "فیس بک ویڈیوز مفت میں HD معیار میں ڈاؤن لوڈ کریں۔ فیس بک ویڈیوز، ریلز، اور سٹوریز بغیر واٹرمارک کے محفوظ کریں۔",
      keywords: "فیس بک ویڈیو ڈاؤن لوڈر, فیس بک ویڈیو ڈاؤن لوڈ, فیس بک ڈاؤن لوڈر, فیس بک ویڈیو سیو, ایف بی ویڈیو ڈاؤن لوڈر, facebook video downloader, download facebook videos, fb video downloader, save facebook videos"
    },
    twitter: {
      title: "ٹویٹر/X ویڈیو ڈاؤن لوڈر - بغیر واٹرمارک ڈاؤن لوڈ | Snap Save Pro",
      description: "ٹویٹر اور X ویڈیوز بغیر واٹرمارک HD معیار میں ڈاؤن لوڈ کریں۔ تیز، مفت، اور آسان ٹویٹر ویڈیو ڈاؤن لوڈر۔",
      keywords: "ٹویٹر ویڈیو ڈاؤن لوڈر, ایکس ویڈیو ڈاؤن لوڈر, ٹویٹر ویڈیو ڈاؤن لوڈ, ایکس ویڈیو ڈاؤن لوڈ, twitter video downloader, x video downloader, download twitter videos, twitter downloader"
    },
    instagramReels: {
      title: "انسٹاگرام ریلز ڈاؤن لوڈر - HD 1080p میں ڈاؤن لوڈ | بغیر واٹرمارک",
      description: "بہترین مفت انسٹاگرام ریلز ڈاؤن لوڈر۔ انسٹاگرام ریلز، پوسٹس، IGTV، سٹوریز HD 1080p میں بغیر واٹرمارک ڈاؤن لوڈ کریں۔",
      keywords: "انسٹاگرام ریلز ڈاؤن لوڈر, انسٹاگرام ڈاؤن لوڈر, انسٹاگرام ویڈیو ڈاؤن لوڈ, ریلز ڈاؤن لوڈ, instagram reels downloader, download instagram reels, instagram downloader, save instagram reels"
    },
    youtubeShorts: {
      title: "یوٹیوب شارٹس ڈاؤن لوڈر - HD 1080p, 4K میں ڈاؤن لوڈ | بغیر واٹرمارک",
      description: "بہترین مفت یوٹیوب شارٹس ڈاؤن لوڈر۔ یوٹیوب شارٹس ویڈیوز HD 1080p, 4K میں بغیر واٹرمارک ڈاؤن لوڈ کریں۔",
      keywords: "یوٹیوب شارٹس ڈاؤن لوڈر, یوٹیوب شارٹس ڈاؤن لوڈ, شارٹس ڈاؤن لوڈ, یوٹیوب شارٹس ویڈیو ڈاؤن لوڈر, youtube shorts downloader, download youtube shorts, youtube shorts download"
    }
  }
};

// Add to each language file
['en', 'hi', 'zh', 'ur'].forEach(lang => {
  const filePath = path.join(__dirname, `../../messages/${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Add tool pages metadata
  if (!data.metadata) {
    data.metadata = {};
  }

  data.metadata.facebook = toolPagesMetadata[lang].facebook;
  data.metadata.twitter = toolPagesMetadata[lang].twitter;
  data.metadata.instagramReels = toolPagesMetadata[lang].instagramReels;
  data.metadata.youtubeShorts = toolPagesMetadata[lang].youtubeShorts;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ Added tool pages metadata to ${lang}.json`);
});

console.log('\n✅ All tool pages metadata added successfully!');
