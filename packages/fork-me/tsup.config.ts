import { defineConfig } from "tsup";
import reactUseClientPlugin from "esbuild-react18-useclient";
import ignoretestsPlugin from "esbuild-plugin-ignoretests";
import removeTestidPlugin from "esbuild-plugin-removetestid";

export default defineConfig(options => ({
	format: ["cjs", "esm"],
	target: "es2019",
	sourcemap: false,
	clean: true,
	minify: !options.watch,
	esbuildPlugins: [reactUseClientPlugin, ignoretestsPlugin(), removeTestidPlugin()],
	legacyOutput: true,
}));
