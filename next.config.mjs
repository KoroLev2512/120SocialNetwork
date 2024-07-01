/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["i.pinimg.com"],
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
