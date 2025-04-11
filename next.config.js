/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Enable React 19 features
    serverActions: true,
    serverComponents: true,
  }
}

module.exports = nextConfig 