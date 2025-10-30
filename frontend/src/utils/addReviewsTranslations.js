const fs = require('fs');
const path = require('path');

// Reviews section translations
const reviewsTranslations = {
  en: {
    seo: {
      reviews: {
        title: "User Reviews",
        subtitle: "See what our users say about Snap Save Pro",
        rating: "{rating}/5 ({count}+ reviews)",
        platformUser: "{platform} User"
      }
    }
  },
  hi: {
    seo: {
      reviews: {
        title: "उपयोगकर्ता समीक्षाएं",
        subtitle: "देखें कि हमारे उपयोगकर्ता Snap Save Pro के बारे में क्या कहते हैं",
        rating: "{rating}/5 ({count}+ समीक्षाएं)",
        platformUser: "{platform} उपयोगकर्ता"
      }
    }
  },
  zh: {
    seo: {
      reviews: {
        title: "用户评论",
        subtitle: "看看我们的用户对 Snap Save Pro 的评价",
        rating: "{rating}/5 ({count}+ 条评论)",
        platformUser: "{platform} 用户"
      }
    }
  },
  ur: {
    seo: {
      reviews: {
        title: "صارف کے جائزے",
        subtitle: "دیکھیں کہ ہمارے صارفین Snap Save Pro کے بارے میں کیا کہتے ہیں",
        rating: "{rating}/5 ({count}+ جائزے)",
        platformUser: "{platform} صارف"
      }
    }
  }
};

// Function to update JSON files
function updateTranslations() {
  const messagesDir = path.join(__dirname, '..', '..', 'messages');

  ['en', 'hi', 'zh', 'ur'].forEach(locale => {
    const filePath = path.join(messagesDir, `${locale}.json`);
    const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Merge reviews translations with existing data
    if (!existingData.seo) {
      existingData.seo = {};
    }
    existingData.seo.reviews = reviewsTranslations[locale].seo.reviews;

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf8');
    console.log(`✅ ${locale.toUpperCase()} Reviews translations added!`);
  });

  console.log('\n🎉 Reviews section translations completed!');
}

updateTranslations();
