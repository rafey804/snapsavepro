const fs = require('fs');
const path = require('path');

const files = [
  'src/components/SEO/PinterestContentSection.tsx',
  'src/components/SEO/RedditContentSection.tsx',
  'src/components/SEO/TikTokContentSection.tsx',
];

function replaceInJSX(content) {
  // Replace common contractions with escaped entities
  const replacements = [
    [/([>][^<]*?)don't([^<]*?[<])/g, '$1don&apos;t$2'],
    [/([>][^<]*?)can't([^<]*?[<])/g, '$1can&apos;t$2'],
    [/([>][^<]*?)won't([^<]*?[<])/g, '$1won&apos;t$2'],
    [/([>][^<]*?)it's([^<]*?[<])/g, '$1it&apos;s$2'],
    [/([>][^<]*?)you're([^<]*?[<])/g, '$1you&apos;re$2'],
    [/([>][^<]*?)we're([^<]*?[<])/g, '$1we&apos;re$2'],
    [/([>][^<]*?)they're([^<]*?[<])/g, '$1they&apos;re$2'],
    [/([>][^<]*?)that's([^<]*?[<])/g, '$1that&apos;s$2'],
    [/([>][^<]*?)what's([^<]*?[<])/g, '$1what&apos;s$2'],
    [/([>][^<]*?)here's([^<]*?[<])/g, '$1here&apos;s$2'],
    [/([>][^<]*?)there's([^<]*?[<])/g, '$1there&apos;s$2'],
    [/([>][^<]*?)who's([^<]*?[<])/g, '$1who&apos;s$2'],
    [/([>][^<]*?)where's([^<]*?[<])/g, '$1where&apos;s$2'],
    [/([>][^<]*?)let's([^<]*?[<])/g, '$1let&apos;s$2'],
    [/([>][^<]*?)TikTok's([^<]*?[<])/g, '$1TikTok&apos;s$2'],
    [/([>][^<]*?)Pinterest's([^<]*?[<])/g, '$1Pinterest&apos;s$2'],
    [/([>][^<]*?)Reddit's([^<]*?[<])/g, '$1Reddit&apos;s$2'],
    [/([>][^<]*?)platform's([^<]*?[<])/g, '$1platform&apos;s$2'],
    [/([>][^<]*?)user's([^<]*?[<])/g, '$1user&apos;s$2'],
    [/([>][^<]*?)creator's([^<]*?[<])/g, '$1creator&apos;s$2'],
    [/([>][^<]*?)We've([^<]*?[<])/g, '$1We&apos;ve$2'],
    [/([>][^<]*?)we've([^<]*?[<])/g, '$1we&apos;ve$2'],
  ];

  let result = content;
  replacements.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });

  return result;
}

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    content = replaceInJSX(content);

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Fixed: ${file}`);
    } else {
      console.log(`- No changes: ${file}`);
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log('\nDone!');
