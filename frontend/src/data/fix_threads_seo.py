# Read the file
with open('threadsSEOData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace capitalized exports with lowercase
content = content.replace('export const ThreadsFAQs', 'export const threadsFAQs')
content = content.replace('export const ThreadsReviews', 'export const threadsReviews')
content = content.replace('export const ThreadsStats', 'export const threadsStats')
content = content.replace('export const ThreadsFeatures', 'export const threadsFeatures')
content = content.replace('export const ThreadsSEOContent', 'export const threadsSEOContent')

# Write back
with open('threadsSEOData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed threadsSEOData.ts exports!")
