/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'api.twillink.com', 'api.dev.twillink.com'],
  },
  output: 'standalone',
};

export default nextConfig;
