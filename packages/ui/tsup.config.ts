import { defineConfig } from "tsup";
import reactUseClientPlugin from "esbuild-react18-useclient";

export default defineConfig(options => ({
  format: ["cjs", "esm"],
  target: "es2019",
  sourcemap: false,
  clean: true,
  minify: !options.watch,
  esbuildPlugins: [reactUseClientPlugin],
  legacyOutput: true,
}));
