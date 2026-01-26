export const linkedinFAQs = [
    {
        question: "Is it legal to download LinkedIn videos?",
        answer: "Downloading LinkedIn videos for personal use is generally acceptable, but you should respect copyright laws and the content creator's rights. Always obtain permission before reposting or using someone else's content commercially."
    },
    {
        question: "Can I download private LinkedIn videos?",
        answer: "No, our tool only works with publicly accessible LinkedIn content. Private posts and restricted content cannot be downloaded to protect user privacy and maintain professional standards."
    },
    {
        question: "Do I need to install any software?",
        answer: "No installation required! Our LinkedIn downloader is entirely web-based. Just paste the link and download - it works directly in your browser on any device."
    },
    {
        question: "What video quality can I download?",
        answer: "We provide the highest quality available from LinkedIn, typically up to 1080p Full HD. The available qualities depend on how the original video was uploaded."
    },
    {
        question: "Is there a download limit?",
        answer: "No, there are no limits! You can download as many LinkedIn videos as you want, completely free."
    },
    {
        question: "Does it work on mobile devices?",
        answer: "Yes! Our LinkedIn downloader is fully responsive and works perfectly on all devices including smartphones, tablets, and desktop computers."
    },
    {
        question: "Can I download audio only from LinkedIn videos?",
        answer: "Yes! Our tool supports audio extraction. Simply switch to \"Audio\" mode after fetching the video information, and you can download the audio in MP3 format."
    }
];

export const linkedinFeatures = [
    {
        title: "High Quality Downloads",
        description: "Download LinkedIn videos in the best available quality including HD and Full HD"
    },
    {
        title: "Multiple Formats",
        description: "Choose from various video formats (MP4, WebM) and audio formats (MP3, M4A)"
    },
    {
        title: "Fast & Secure",
        description: "Lightning-fast downloads with secure connections"
    },
    {
        title: "Free Forever",
        description: "Completely free to use with no hidden charges or subscriptions"
    },
    {
        title: "No Registration",
        description: "Download without creating an account or logging in"
    },
    {
        title: "All Devices",
        description: "Works on desktop, mobile, and tablet devices"
    },
    {
        title: "Audio Extraction",
        description: "Extract and download audio from LinkedIn videos in high quality"
    },
    {
        title: "Professional Grade",
        description: "Perfect for saving educational content, webinars, and professional presentations"
    }
];

export const linkedinInfo = {
    title: "Why Choose Our LinkedIn Video Downloader?",
    description: [
        "LinkedIn is the world's leading professional network with 900+ million users. Our LinkedIn Video Downloader helps you save valuable business content, educational videos, webinars, and professional insights in HD quality.",
        "Download professional development videos, industry expert talks, business presentations, and career advice for offline viewing. Perfect for building knowledge libraries and continuous learning."
    ],
    features: {
        quality: {
            title: "Professional HD Quality",
            description: "Download LinkedIn videos in 1080p Full HD, 720p HD, and 480p SD quality options."
        },
        speed: {
            title: "Lightning Fast Downloads",
            description: "Get your professional videos downloaded in seconds with our optimized servers."
        },
        security: {
            title: "Secure & Private",
            description: "Your downloads are processed securely with encrypted connections. We never store your data."
        },
        noWatermark: {
            title: "Original Quality",
            description: "Maintain the original LinkedIn video quality without any compression or watermarks."
        }
    }
};

export const linkedinSEOContent = {
    whatIs: {
        title: "LinkedIn Video Downloader - Save LinkedIn Videos Professionally",
        content: "Our LinkedIn Video Downloader is the best free tool to download LinkedIn videos in high quality. Save professional content, educational videos, and inspiring posts directly to your device with just a few clicks."
    },
    howItWorks: {
        title: "How to Download LinkedIn Videos",
        content: `1. Copy the LinkedIn link: Open LinkedIn, find the video post you want to download, and copy its URL.
    2. Paste the URL: Paste the LinkedIn link in the input box above.
    3. Click "Get Video Info": Our tool will analyze the video and fetch all available formats.
    4. Choose quality: Select your preferred video quality or audio format.
    5. Download: Click the download button and save the file to your device.`
    },
    whyChoose: {
        title: "Why Choose Our LinkedIn Downloader?",
        content: "Unlike other LinkedIn downloaders, our tool offers the highest quality downloads with a professional and user-friendly interface. We support all types of LinkedIn video content including professional posts, educational videos, webinars, and more. Our advanced technology ensures fast processing and downloading, making it the most efficient LinkedIn video downloader available online."
    },
    benefits: {
        title: "Perfect For",
        content: `Professional Development: Save educational videos and training content for offline viewing.
    Research & Learning: Download industry insights and expert presentations.
    Content Creators: Reference and study successful LinkedIn video content.
    Marketing Teams: Analyze competitor videos and industry trends.
    Business Professionals: Keep important webinars and conference videos.`
    },
    features: {
        title: "Key Features",
        list: linkedinFeatures.map(f => `${f.title}: ${f.description}`)
    },
    faqs: {
        title: "Frequently Asked Questions",
        items: linkedinFAQs
    }
};
