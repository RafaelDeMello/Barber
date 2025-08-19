/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "utfs.io",
            },
            {
                hostname: "exemplo.com",
            }
        ],
    },
};

export default nextConfig;
