// components/ads/SmallBanner.tsx

import Script from 'next/script';

export default function SmallBanner() {
  return (
    <div className="my-8 flex justify-center">
      <div>
        {/* Banner Ad Config */}
        <Script id="banner-ad-config" strategy="afterInteractive">
          {`
            atOptions = {
              'key' : 'f2b62509158b2383b0a6e2cc75d0c921',
              'format' : 'iframe',
              'height' : 50,
              'width' : 320,
              'params' : {}
            };
          `}
        </Script>
        
        {/* Banner Ad Script */}
        <Script 
          type='text/javascript' 
          src='//www.highperformanceformat.com/f2b62509158b2383b0a6e2cc75d0c921/invoke.js' 
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
}