/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["i.pinimg.com"],
  },
  devIndicators: {
    buildActivity: false,
  },
  // trailingSlash: true,
  // output: "standalone",
  // reactStrictMode: false,
  // swcMinify: true,
};

export default nextConfig;
