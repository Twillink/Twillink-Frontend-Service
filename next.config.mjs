/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'api.dev.twillink.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'api.twillink.com',
        pathname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  output: 'standalone',
};

export default nextConfig;
