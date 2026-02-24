/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['three'],
    images: {
        domains: ['images.unsplash.com', 'github.com', 'avatars.githubusercontent.com'],
    },
    webpack: (config) => {
        config.externals = [...(config.externals || []), { canvas: 'canvas' }]
        return config
    },
}

module.exports = nextConfig
