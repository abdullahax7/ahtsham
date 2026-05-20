/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Don't bundle better-sqlite3 — it's a native module that must remain external.
  webpack: (config) => {
    config.externals = config.externals || [];
    if (Array.isArray(config.externals)) {
      config.externals.push({ 'better-sqlite3': 'commonjs better-sqlite3' });
    }
    return config;
  },
};

export default nextConfig;
