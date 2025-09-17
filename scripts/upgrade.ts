import { execSync } from "child_process";
import pkgJSON from "../package.json";
import { writeFileSync } from "fs";
import { resolve } from "path";

// Ensure all global deps are devDeps only for easier management.
// @ts-expect-error -- dependencies should not exist
pkgJSON.devDependencies = { ...pkgJSON.dependencies, ...pkgJSON.devDependencies };
// @ts-expect-error -- dependencies should not exist
delete pkgJSON.dependencies;

writeFileSync(resolve(__dirname, "..", "package.json"), JSON.stringify(pkgJSON, null, 2));

execSync("pnpx @turbo/codemod update . && pnpm update --latest -r");

execSync("pnpm format");
