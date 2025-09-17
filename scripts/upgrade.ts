import { execSync } from "child_process";
import pkgJSON from "../package.json";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import path from "path";

// Ensure all global deps are devDeps only for easier management.
// @ts-expect-error -- dependencies should not exist
pkgJSON.devDependencies = { ...pkgJSON.dependencies, ...pkgJSON.devDependencies };
// @ts-expect-error -- dependencies should not exist
delete pkgJSON.dependencies;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

writeFileSync(resolve(__dirname, "..", "package.json"), JSON.stringify(pkgJSON, null, 2));

execSync("pnpx @turbo/codemod update . && pnpm update --latest -r");

execSync("pnpm format");
