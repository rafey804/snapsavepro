'use client';

import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // Google Tag Manager
    if (typeof window !== 'undefined') {
      (function(w: any, d: any, s: any, l: any, i: any) {
        w[l] = w[l] || [];
        w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-593VWXRV');

      // Google Analytics GA4
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-65R0ST3T4E';
      script.async = true;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'G-65R0ST3T4E', {
        page_path: window.location.pathname,
      });
    }
  }, []);

  return null;
}
