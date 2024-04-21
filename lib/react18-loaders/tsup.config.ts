import { defineConfig, type Options } from "tsup";
import react18Plugin from "esbuild-plugin-react18";
import cssPlugin from "esbuild-plugin-react18-css";

export default defineConfig(
  options =>
    ({
      format: ["cjs", "esm"],
      target: "es2019",
      sourcemap: false,
      clean: true,
      bundle: true,
      minify: !options.watch,
      esbuildPlugins: [react18Plugin(), cssPlugin()],
      legacyOutput: true,
    }) as Options,
);
