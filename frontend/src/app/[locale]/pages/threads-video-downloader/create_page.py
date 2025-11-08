with open('C:/Users/rafey1/Desktop/youtude video final/snapsavepro/frontend/src/app/[locale]/pages/dailymotion-video-downloader/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace all occurrences
content = content.replace('Dailymotion', 'Threads')
content = content.replace('dailymotion', 'threads')
content = content.replace('DailymotionDownloader', 'ThreadsDownloader')
content = content.replace('orange', 'green')
content = content.replace('yellow', 'teal')

with open('page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Threads page created successfully!")
