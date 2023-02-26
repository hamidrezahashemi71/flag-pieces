/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DEFAULT_FLAG: '/assets/images/unknown-flag.svg'
  },
  images: {
    domains: ['svgsilh.com', 'mainfacts.com'],
  },
}

module.exports = nextConfig
