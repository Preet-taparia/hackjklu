export default {
  compiler: {
    removeConsole: true,
    styledComponents: true,
  },
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
    ],
  },
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        "*.js": ["ecmascript"],
        "*.tsx": ["typescript"],
      },
    },
    optimizeCss: true,
  },
};
