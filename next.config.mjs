import withSerwistInit from "@serwist/next";
import nrExternals from "newrelic/load-externals.js";

const withSerwist = withSerwistInit({
	disable: process.env.NODE_ENV === "development",
	swSrc: "app/sw.ts",
	swDest: "public/sw.js",
});

/** @type {import('next').NextConfig} */
const nextConfig = withSerwist({
	output: "standalone",
	experimental: {
		optimizePackageImports: [
			"@mantine/core",
			"@mantine/hooks",
			"@mantine/notifications",
			"@mantine/dates",
			"@mantine/charts",
		],
		swcPlugins: [["@lingui/swc-plugin", {}]],
	},
	serverExternalPackages: ["newrelic"],
	webpack: (config) => {
		nrExternals(config);
		if (config.target.includes("node")) {
			config.externals.push("pino");
		}
		return config;
	},
});

export default nextConfig;
