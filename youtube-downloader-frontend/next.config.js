/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000',
  },
  // Railway static hosting optimization
  output: process.env.RAILWAY_ENVIRONMENT === 'production' ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: process.env.RAILWAY_ENVIRONMENT === 'production'
  },
  // Disable server-side features for static export on Railway
  ...(process.env.RAILWAY_ENVIRONMENT === 'production' && {
    experimental: {
      esmExternals: false
    }
  })
}

module.exports = nextConfig