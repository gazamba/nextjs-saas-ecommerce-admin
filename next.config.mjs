/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
       remotePatterns: [
        {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '**'
        }
    ]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
