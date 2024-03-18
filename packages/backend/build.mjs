import esbuild from "esbuild";
import { copyFile } from "fs/promises";

esbuild
  .build({
    bundle: true,
    platform: "node",
    target: "node18",
    outdir: "dist",
    sourcemap: true,
    entryPoints: ["src/main.ts"],
    plugins: [],
    external: ["newrelic"],
  })
  .then(
    () => {
      return Promise.all([
        copyFile("prisma/schema.prisma", "dist/schema.prisma"),
        copyFile("newrelic.js", "dist/newrelic.js"),
        copyFile(
          "src/__generated__/prisma/libquery_engine-linux-arm64-openssl-1.1.x.so.node",
          "dist/libquery_engine-linux-arm64-openssl-1.1.x.so.node"
        ),
      ]).then(() => process.exit(0));
    },
    (err) => {
      console.error(err);
      process.exit(1);
    }
  );
