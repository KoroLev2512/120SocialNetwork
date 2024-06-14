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
  }
  // trailingSlash: true,
  // output: "standalone",
  // reactStrictMode: true,
  // swcMinify: true,
};

export default nextConfig;
