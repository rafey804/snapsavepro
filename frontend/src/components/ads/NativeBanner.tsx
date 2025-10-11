// components/ads/NativeBanner.tsx

import Script from 'next/script';

export default function NativeBanner() {
  return (
    <div className="my-8 flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Native Banner Ad */}
        <Script 
          async 
          data-cfasync="false" 
          src="//pl27827728.effectivegatecpm.com/f595d5ce02fc74bfca36369385b3136a/invoke.js" 
          strategy="afterInteractive"
        />
        <div id="container-f595d5ce02fc74bfca36369385b3136a"></div>
      </div>
    </div>
  );
}