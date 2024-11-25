import './env-config.mjs';

/** @type {import('next').NextConfig} */

const nextConfig = {

    env: { 
        NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
        NEXT_PUBLIC_AWS_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
    output: 'export',
    distDir: "_static",
    images: {
        unoptimized: true
    },
};

export default nextConfig;
