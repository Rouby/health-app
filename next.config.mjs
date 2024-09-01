/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
	},
};

export default nextConfig;
