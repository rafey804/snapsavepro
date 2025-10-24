const fs = require('fs');
const path = require('path');

const files = [
  'src/components/SEO/PinterestContentSection.tsx',
  'src/components/SEO/RedditContentSection.tsx',
  'src/components/SEO/TikTokContentSection.tsx',
  'src/components/SEO/TwitterContentSection.tsx',
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace apostrophes and quotes in JSX content (not in JSX attributes or JS strings)
  // This is a simplified approach - manually fix complex cases
  content = content
    .replace(/([>][\s\S]*?)don't([\s\S]*?[<])/g, '$1don&apos;t$2')
    .replace(/([>][\s\S]*?)can't([\s\S]*?[<])/g, '$1can&apos;t$2')
    .replace(/([>][\s\S]*?)won't([\s\S]*?[<])/g, '$1won&apos;t$2')
    .replace(/([>][\s\S]*?)it's([\s\S]*?[<])/g, '$1it&apos;s$2')
    .replace(/([>][\s\S]*?)you're([\s\S]*?[<])/g, '$1you&apos;re$2')
    .replace(/([>][\s\S]*?)we're([\s\S]*?[<])/g, '$1we&apos;re$2')
    .replace(/([>][\s\S]*?)they're([\s\S]*?[<])/g, '$1they&apos;re$2')
    .replace(/([>][\s\S]*?)that's([\s\S]*?[<])/g, '$1that&apos;s$2')
    .replace(/([>][\s\S]*?)what's([\s\S]*?[<])/g, '$1what&apos;s$2')
    .replace(/([>][\s\S]*?)here's([\s\S]*?[<])/g, '$1here&apos;s$2')
    .replace(/([>][\s\S]*?)there's([\s\S]*?[<])/g, '$1there&apos;s$2')
    .replace(/([>][\s\S]*?)who's([\s\S]*?[<])/g, '$1who&apos;s$2')
    .replace(/([>][\s\S]*?)where's([\s\S]*?[<])/g, '$1where&apos;s$2')
    .replace(/([>][\s\S]*?)let's([\s\S]*?[<])/g, '$1let&apos;s$2')
    .replace(/([>][\s\S]*?)TikTok's([\s\S]*?[<])/g, '$1TikTok&apos;s$2')
    .replace(/([>][\s\S]*?)Pinterest's([\s\S]*?[<])/g, '$1Pinterest&apos;s$2')
    .replace(/([>][\s\S]*?)Reddit's([\s\S]*?[<])/g, '$1Reddit&apos;s$2')
    .replace(/([>][\s\S]*?)platform's([\s\S]*?[<])/g, '$1platform&apos;s$2')
    .replace(/([>][\s\S]*?)user's([\s\S]*?[<])/g, '$1user&apos;s$2')
    .replace(/([>][\s\S]*?)creator's([\s\S]*?[<])/g, '$1creator&apos;s$2');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed: ${file}`);
});

console.log('Done!');
