import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
	swSrc: "app/sw.ts",
	swDest: "public/sw.js",
});

/** @type {import('next').NextConfig} */
const nextConfig = withSerwist({
	output: "standalone",
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
		swcPlugins: [["@lingui/swc-plugin", {}]],
	},
});

export default nextConfig;
