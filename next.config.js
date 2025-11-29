/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Temporarily disable image optimization to avoid IPX ESM/CommonJS conflicts on Netlify
    // Images will still be served via Netlify's CDN
    // TODO: Re-enable once IPX ESM compatibility is resolved
    unoptimized: true,
  },
}

export default nextConfig

