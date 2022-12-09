import react from "@vitejs/plugin-react";
import formatJs from "babel-plugin-formatjs";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";
import { defineConfig } from "vite";

export default defineConfig({
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
              ast: true,
            },
          ],
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/trpc": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
