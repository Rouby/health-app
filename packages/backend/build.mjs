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
        copyFile("newrelic.js", "dist/newrelic.js"),
      ]).then(() => process.exit(0));
    },
    (err) => {
      console.error(err);
      process.exit(1);
    }
  );
