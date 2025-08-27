import BlogSection from '@/components/blog/BlogSection'
import YouTubeDownloadGuide from '@/components/details/YtDetails'
import YouTubeDownloader from '@/components/home/YtDownloader'
import React from 'react'

const page = () => {
  return (
    <div>
      <YouTubeDownloader/>
      <YouTubeDownloadGuide/>
    </div>
  )
}

export default page