import YouTubeDownloadGuide from '@/components/details/YtDetails'
import TikTokDownloader from '@/components/home/TikTokDownloader'

import React from 'react'

const page = () => {
  return (
    <div className=''>
      <TikTokDownloader/>
      <YouTubeDownloadGuide/>
    </div>
  )
}

export default page