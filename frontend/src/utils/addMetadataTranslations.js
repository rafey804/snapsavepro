const fs = require('fs');
const path = require('path');

const metadataTranslations = {
  en: {
    metadata: {
      home: {
        title: "TikTok Video Downloader Without Watermark - Free & Fast | Snap Save Pro",
        description: "Download TikTok videos without watermark in HD quality. Fast, free, and easy to use. Support for TikTok, YouTube, Facebook, Instagram, and more.",
        keywords: "video downloader, tiktok downloader, youtube downloader, facebook video download, instagram downloader, download videos online, free video downloader, no watermark, hd video download, snap save pro, tiktok video download, youtube video download, instagram video download, facebook downloader, twitter video download, video saver, online video downloader, download tiktok videos, download youtube videos, download instagram videos",
        ogTitle: "TikTok Video Downloader Without Watermark - Free & Fast | Snap Save Pro",
        ogDescription: "Download TikTok videos without watermark in HD quality. Fast, free, and easy to use.",
        ogImageAlt: "Snap Save Pro - Multi-Platform Video Downloader",
        twitterTitle: "TikTok Video Downloader Without Watermark - Free & Fast",
        twitterDescription: "Download TikTok videos without watermark in HD quality. Fast, free, and easy to use."
      }
    }
  },
  hi: {
    metadata: {
      home: {
        title: "टिकटॉक वीडियो डाउनलोडर बिना वॉटरमार्क - मुफ्त और तेज़ | Snap Save Pro",
        description: "टिकटॉक वीडियो बिना वॉटरमार्क HD गुणवत्ता में डाउनलोड करें। तेज़, मुफ्त, और उपयोग में आसान। TikTok, YouTube, Facebook, Instagram और अधिक के लिए समर्थन।",
        keywords: "वीडियो डाउनलोडर, टिकटॉक डाउनलोडर, यूट्यूब डाउनलोडर, फेसबुक वीडियो डाउनलोड, इंस्टाग्राम डाउनलोडर, ऑनलाइन वीडियो डाउनलोड, मुफ्त वीडियो डाउनलोडर, बिना वॉटरमार्क, एचडी वीडियो डाउनलोड, टिकटॉक वीडियो डाउनलोड, यूट्यूब वीडियो डाउनलोड, इंस्टाग्राम वीडियो डाउनलोड, फेसबुक डाउनलोडर, ट्विटर वीडियो डाउनलोड, video downloader, tiktok downloader, youtube downloader, download videos online, free video downloader, no watermark, hd video download",
        ogTitle: "टिकटॉक वीडियो डाउनलोडर बिना वॉटरमार्क | Snap Save Pro",
        ogDescription: "टिकटॉक वीडियो बिना वॉटरमार्क HD गुणवत्ता में डाउनलोड करें। तेज़, मुफ्त, और उपयोग में आसान।",
        ogImageAlt: "Snap Save Pro - मल्टी-प्लेटफॉर्म वीडियो डाउनलोडर",
        twitterTitle: "टिकटॉक वीडियो डाउनलोडर बिना वॉटरमार्क - मुफ्त और तेज़",
        twitterDescription: "टिकटॉक वीडियो बिना वॉटरमार्क HD गुणवत्ता में डाउनलोड करें। तेज़, मुफ्त, और उपयोग में आसान।"
      }
    }
  },
  zh: {
    metadata: {
      home: {
        title: "TikTok视频下载器无水印 - 免费快速 | Snap Save Pro",
        description: "下载TikTok视频无水印高清质量。快速、免费、易于使用。支持TikTok、YouTube、Facebook、Instagram等。",
        keywords: "视频下载器, TikTok下载器, YouTube下载器, Facebook视频下载, Instagram下载器, 在线视频下载, 免费视频下载器, 无水印, 高清视频下载, TikTok视频下载, YouTube视频下载, Instagram视频下载, Facebook下载器, Twitter视频下载, video downloader, tiktok downloader, youtube downloader, download videos online, free video downloader, no watermark, hd video download",
        ogTitle: "TikTok视频下载器无水印 | Snap Save Pro",
        ogDescription: "下载TikTok视频无水印高清质量。快速、免费、易于使用。",
        ogImageAlt: "Snap Save Pro - 多平台视频下载器",
        twitterTitle: "TikTok视频下载器无水印 - 免费快速",
        twitterDescription: "下载TikTok视频无水印高清质量。快速、免费、易于使用。"
      }
    }
  },
  ur: {
    metadata: {
      home: {
        title: "ٹک ٹاک ویڈیو ڈاؤن لوڈر بغیر واٹرمارک - مفت اور تیز | Snap Save Pro",
        description: "ٹک ٹاک ویڈیوز بغیر واٹرمارک HD معیار میں ڈاؤن لوڈ کریں۔ تیز، مفت، اور استعمال میں آسان۔ TikTok، YouTube، Facebook، Instagram اور مزید کے لیے سپورٹ۔",
        keywords: "ویڈیو ڈاؤن لوڈر, ٹک ٹاک ڈاؤن لوڈر, یوٹیوب ڈاؤن لوڈر, فیس بک ویڈیو ڈاؤن لوڈ, انسٹاگرام ڈاؤن لوڈر, آن لائن ویڈیو ڈاؤن لوڈ, مفت ویڈیو ڈاؤن لوڈر, بغیر واٹرمارک, ایچ ڈی ویڈیو ڈاؤن لوڈ, ٹک ٹاک ویڈیو ڈاؤن لوڈ, یوٹیوب ویڈیو ڈاؤن لوڈ, انسٹاگرام ویڈیو ڈاؤن لوڈ, فیس بک ڈاؤن لوڈر, ٹویٹر ویڈیو ڈاؤن لوڈ, video downloader, tiktok downloader, youtube downloader, download videos online, free video downloader, no watermark, hd video download",
        ogTitle: "ٹک ٹاک ویڈیو ڈاؤن لوڈر بغیر واٹرمارک | Snap Save Pro",
        ogDescription: "ٹک ٹاک ویڈیوز بغیر واٹرمارک HD معیار میں ڈاؤن لوڈ کریں۔ تیز، مفت، اور استعمال میں آسان۔",
        ogImageAlt: "Snap Save Pro - ملٹی پلیٹ فارم ویڈیو ڈاؤن لوڈر",
        twitterTitle: "ٹک ٹاک ویڈیو ڈاؤن لوڈر بغیر واٹرمارک - مفت اور تیز",
        twitterDescription: "ٹک ٹاک ویڈیوز بغیر واٹرمارک HD معیار میں ڈاؤن لوڈ کریں۔ تیز، مفت، اور استعمال میں آسان۔"
      }
    }
  }
};

// Add metadata to each language file
['en', 'hi', 'zh', 'ur'].forEach(lang => {
  const filePath = path.join(__dirname, `../../messages/${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Add metadata section
  data.metadata = metadataTranslations[lang].metadata;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ Added metadata translations to ${lang}.json`);
});

console.log('\n✅ All metadata translations added successfully!');
