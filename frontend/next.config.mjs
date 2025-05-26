// next.config.js
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   transpilePackages: ["@refinedev/antd"],
//   output: "standalone",
// };

// module.exports = withBundleAnalyzer(nextConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@refinedev/antd"],
  output: "standalone",
};

export default nextConfig;
