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
    config.cache = false;
    
    // Completely disable file system watching and scanning
    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.next/**',
        '**/C:/Users/Tatka/Cookies/**',
        '**/C:/Users/Tatka/AppData/**',
        '**/C:/Users/*/Cookies/**',
        '**/C:/Users/*/AppData/**'
      ]
    };
    
    // Override resolve modules to avoid scanning system directories
    config.resolve.modules = ['node_modules'];
    
    // Disable snapshot for file system
    config.snapshot = {
      managedPaths: [],
      immutablePaths: [],
      buildDependencies: { hash: false, timestamp: false },
      module: { hash: false, timestamp: false },
      resolve: { hash: false, timestamp: false },
      resolveBuildDependencies: { hash: false, timestamp: false }
    };

    if (!isServer) {
      config.resolve.fallback = { ...config.resolve.fallback, fs: false, net: false, tls: false };
    }
    return config;
  }
};

export default nextConfig;
