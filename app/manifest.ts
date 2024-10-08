import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		theme_color: "#693396",
		background_color: "#1a1b1e",
		display: "standalone",
		scope: "/",
		start_url: "/",
		name: "Health App",
		short_name: "Health App",
		icons: [
			{
				src: "/icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/icon-256x256.png",
				sizes: "256x256",
				type: "image/png",
			},
			{
				src: "/icon-384x384.png",
				sizes: "384x384",
				type: "image/png",
			},
			{
				src: "/icon-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/icon-512x512-maskable.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
	};
}
