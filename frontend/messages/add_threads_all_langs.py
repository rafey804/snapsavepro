import json

# Hindi translations
hi_threads = {
    "threads": {
        "title": "Threads वीडियो डाउनलोडर",
        "subtitle": "HD गुणवत्ता में Threads वीडियो डाउनलोड करें - तेज़, मुफ़्त और आसान - सभी वीडियो प्रकारों का समर्थन करता है",
        "placeholder": "यहां Threads वीडियो URL पेस्ट करें...",
        "downloadButton": "डाउनलोड करें",
        "videoMode": "वीडियो",
        "audioMode": "ऑडियो",
        "noFormats": "इस वीडियो के लिए कोई वीडियो प्रारूप उपलब्ध नहीं है",
        "errorFetch": "वीडियो जानकारी प्राप्त करने में विफल। कृपया URL जांचें और पुनः प्रयास करें।",
        "howToUse": "उपयोग कैसे करें",
        "step1": "अपने ब्राउज़र से Threads वीडियो URL कॉपी करें",
        "step2": "ऊपर इनपुट फ़ील्ड में URL पेस्ट करें",
        "step3": "डाउनलोड पर क्लिक करें और अपनी पसंदीदा गुणवत्ता चुनें",
        "features": {
            "title": "हमारे Threads डाउनलोडर को क्यों चुनें?",
            "quality": "HD गुणवत्ता",
            "qualityDesc": "उच्च परिभाषा गुणवत्ता में वीडियो डाउनलोड करें",
            "speed": "तेज़ डाउनलोड",
            "speedDesc": "त्वरित प्रसंस्करण और तत्काल डाउनलोड",
            "free": "100% मुफ़्त",
            "freeDesc": "कोई शुल्क नहीं, कोई सदस्यता नहीं, पूरी तरह से मुफ़्त",
            "safe": "सुरक्षित और संरक्षित",
            "safeDesc": "आपकी गोपनीयता सुरक्षित है, कोई डेटा एकत्र नहीं किया गया"
        }
    }
}

# Urdu translations
ur_threads = {
    "threads": {
        "title": "Threads ویڈیو ڈاؤن لوڈر",
        "subtitle": "HD کوالٹی میں Threads ویڈیوز ڈاؤن لوڈ کریں - تیز، مفت اور آسان - تمام ویڈیو اقسام کو سپورٹ کرتا ہے",
        "placeholder": "یہاں Threads ویڈیو URL پیسٹ کریں...",
        "downloadButton": "ڈاؤن لوڈ کریں",
        "videoMode": "ویڈیو",
        "audioMode": "آڈیو",
        "noFormats": "اس ویڈیو کے لیے کوئی ویڈیو فارمیٹس دستیاب نہیں ہیں",
        "errorFetch": "ویڈیو کی معلومات حاصل کرنے میں ناکام۔ براہ کرم URL چیک کریں اور دوبارہ کوشش کریں۔",
        "howToUse": "استعمال کیسے کریں",
        "step1": "اپنے براؤزر سے Threads ویڈیو URL کاپی کریں",
        "step2": "اوپر انپٹ فیلڈ میں URL پیسٹ کریں",
        "step3": "ڈاؤن لوڈ پر کلک کریں اور اپنی پسندیدہ کوالٹی منتخب کریں",
        "features": {
            "title": "ہمارے Threads ڈاؤن لوڈر کو کیوں منتخب کریں؟",
            "quality": "HD کوالٹی",
            "qualityDesc": "ہائی ڈیفینیشن کوالٹی میں ویڈیوز ڈاؤن لوڈ کریں",
            "speed": "تیز ڈاؤن لوڈ",
            "speedDesc": "فوری پروسیسنگ اور فوری ڈاؤن لوڈز",
            "free": "100% مفت",
            "freeDesc": "کوئی فیس نہیں، کوئی سبسکرپشن نہیں، مکمل طور پر مفت",
            "safe": "محفوظ اور محفوظ",
            "safeDesc": "آپ کی رازداری محفوظ ہے، کوئی ڈیٹا جمع نہیں کیا گیا"
        }
    }
}

# Chinese translations
zh_threads = {
    "threads": {
        "title": "Threads 视频下载器",
        "subtitle": "下载 HD 画质 Threads 视频 - 快速、免费且简单 - 支持所有视频类型",
        "placeholder": "在此粘贴 Threads 视频 URL...",
        "downloadButton": "下载",
        "videoMode": "视频",
        "audioMode": "音频",
        "noFormats": "此视频没有可用的视频格式",
        "errorFetch": "无法获取视频信息。请检查 URL 并重试。",
        "howToUse": "如何使用",
        "step1": "从浏览器复制 Threads 视频 URL",
        "step2": "将 URL 粘贴到上面的输入框中",
        "step3": "点击下载并选择您喜欢的画质",
        "features": {
            "title": "为什么选择我们的 Threads 下载器？",
            "quality": "HD 画质",
            "qualityDesc": "下载高清画质视频",
            "speed": "快速下载",
            "speedDesc": "快速处理和即时下载",
            "free": "100% 免费",
            "freeDesc": "无费用、无订阅、完全免费",
            "safe": "安全可靠",
            "safeDesc": "您的隐私受到保护，不收集数据"
        }
    }
}

# Process Hindi
with open('hi.json', 'r', encoding='utf-8') as f:
    hi_data = json.load(f)
hi_data['threads'] = hi_threads['threads']
if 'downloaders' not in hi_data:
    hi_data['downloaders'] = {}
hi_data['downloaders']['threads'] = {
    "name": "Threads वीडियो डाउनलोडर",
    "description": "HD गुणवत्ता में Threads वीडियो डाउनलोड करें"
}
with open('hi.json', 'w', encoding='utf-8') as f:
    json.dump(hi_data, f, ensure_ascii=False, indent=2)
print("Hindi translations added!")

# Process Urdu
with open('ur.json', 'r', encoding='utf-8') as f:
    ur_data = json.load(f)
ur_data['threads'] = ur_threads['threads']
if 'downloaders' not in ur_data:
    ur_data['downloaders'] = {}
ur_data['downloaders']['threads'] = {
    "name": "Threads ویڈیو ڈاؤن لوڈر",
    "description": "HD کوالٹی میں Threads ویڈیوز ڈاؤن لوڈ کریں"
}
with open('ur.json', 'w', encoding='utf-8') as f:
    json.dump(ur_data, f, ensure_ascii=False, indent=2)
print("Urdu translations added!")

# Process Chinese
with open('zh.json', 'r', encoding='utf-8') as f:
    zh_data = json.load(f)
zh_data['threads'] = zh_threads['threads']
if 'downloaders' not in zh_data:
    zh_data['downloaders'] = {}
zh_data['downloaders']['threads'] = {
    "name": "Threads 视频下载器",
    "description": "下载 HD 画质 Threads 视频"
}
with open('zh.json', 'w', encoding='utf-8') as f:
    json.dump(zh_data, f, ensure_ascii=False, indent=2)
print("Chinese translations added!")

print("\nAll translations added successfully!")
