/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow development requests from local network
  ...(process.env.NODE_ENV === 'development' && {
    allowedDevOrigins: ['192.168.1.140'],
  }),
};

module.exports = nextConfig;
