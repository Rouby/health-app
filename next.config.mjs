import withSerwistInit from "@serwist/next";
import nrExternals from "newrelic/load-externals.js";

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
	serverExternalPackages: ["newrelic"],
	webpack: (config) => {
		nrExternals(config);
		return config;
	},
});

export default nextConfig;
