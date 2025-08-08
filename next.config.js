/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/cart/:path*',
         destination: `http://cart-app:3001/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;