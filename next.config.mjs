/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'api.twillink.com', 'api.dev.twillink.com'],
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  output: 'standalone',
};

export default nextConfig;
