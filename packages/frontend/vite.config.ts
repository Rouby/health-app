import react from "@vitejs/plugin-react";
import formatJs from "babel-plugin-formatjs";
import { build } from "esbuild";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";
import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: [
          jotaiDebugLabel,
          jotaiReactRefresh,
          [
            formatJs,
            {
              idInterpolationPattern: "[sha512:contenthash:base64:6]",
              removeDefaultMessage: mode === "production",
              ast: true,
            },
          ],
        ],
      },
    }),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      registerType: "prompt",
      manifest: {
        theme_color: "#693396",
        background_color: "#1a1b1e",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "Sex App",
        short_name: "Sex App",
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
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        clientsClaim: true,
        importScripts: ["sw-webpush.js"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.origin === self.location.origin &&
              url.pathname.includes("lang/"),
            handler: "StaleWhileRevalidate",
          },
        ],
      },
    }),
    (function CompileTsServiceWorker() {
      return {
        name: "compile-typescript-service-worker",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url?.endsWith("sw-webpush.js")) {
              build({
                entryPoints: ["src/sw-webpush.ts"],
                bundle: true,
                minify: false,
                outfile: "dev-dist/sw-webpush.js",
              }).then((value) => {
                res.setHeader(
                  "Content-Type",
                  "application/javascript; charset=utf-8"
                );
                res.end(readFileSync("dev-dist/sw-webpush.js"));
              });
              return true;
            } else {
              return next();
            }
          });
        },
        async writeBundle(_options, _outputBundle) {
          await build({
            entryPoints: ["src/sw-webpush.ts"],
            bundle: true,
            minify: true,
            outfile: "dist/sw-webpush.js",
          });
        },
      };
    })(),
    createHtmlPlugin({
      template: "index.html",
      inject: {
        data: {
          head: mode === "development" ? `` : readFileSync("newrelic", "utf-8"),
        },
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@formatjs/icu-messageformat-parser":
        "@formatjs/icu-messageformat-parser/no-parser",
    },
  },
  server: {
    proxy: {
      "/trpc": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
}));
