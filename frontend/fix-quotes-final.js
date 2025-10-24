const fs = require('fs');
const path = require('path');

const files = [
  'src/components/SEO/PinterestContentSection.tsx',
  'src/components/SEO/RedditContentSection.tsx',
  'src/components/SEO/TikTokContentSection.tsx',
];

function fixQuotesInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const fixed = lines.map((line, index) => {
    // Skip import statements and other non-JSX lines
    if (line.trim().startsWith('import ') || line.trim().startsWith('//') || line.trim().startsWith('/*')) {
      return line;
    }

    // Fix unescaped quotes in JSX text content (between > and <)
    // This is a simple heuristic - only fix if line contains > and <
    if (line.includes('>') && line.includes('<')) {
      // Replace apostrophes not already escaped
      line = line.replace(/([>][^<]*?)([''])/g, (match, before, quote) => {
        // Don't replace if already escaped
        if (before.endsWith('&apos;') || before.endsWith('&#39;')) {
          return match;
        }
        return before + '&apos;';
      });

      // Replace double quotes in JSX content (but not in className or other attributes)
      // Only replace quotes that are clearly in content, not attributes
      line = line.replace(/([>][^<]*?)"([^<]*?[<])/g, (match, before, after) => {
        // Don't replace if it's part of className or other attribute
        if (before.includes('className=') || before.includes('href=') || before.includes('src=')) {
          return match;
        }
        return before + '&quot;' + after;
      });
    }

    return line;
  });

  return fixed.join('\n');
}

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  try {
    const original = fs.readFileSync(filePath, 'utf8');
    const fixed = fixQuotesInFile(filePath);

    if (fixed !== original) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`✓ Fixed: ${file}`);
    } else {
      console.log(`- No changes needed: ${file}`);
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log('\nDone!');
