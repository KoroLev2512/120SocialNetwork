/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**/**'
      }
    ],
  },
  devIndicators: {
    buildActivity: false,
  },
  env: {
    API_PATH: process.env.API_PATH,
  },
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
    localeDetection: false,
  },
  // trailingSlash: true,
  // output: "standalone",
  // reactStrictMode: true,
  // swcMinify: true,
};

export default nextConfig;
