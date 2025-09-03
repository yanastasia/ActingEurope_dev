import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  // output: 'standalone', // Disabled to avoid symlink EPERM issues
  serverExternalPackages: ['prisma', '@prisma/client'],
  experimental: { serverActions: { allowedOrigins: [] } },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false
      };
    }
    return config;
  }
};

export default nextConfig;
