import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import pkgJSON from "../package.json";

// Ensure all global deps are devDeps only for easier management.
pkgJSON.devDependencies = {
  // @ts-expect-error -- dependencies should not exist
  ...pkgJSON.dependencies,
  ...pkgJSON.devDependencies,
};
// @ts-expect-error -- dependencies should not exist
delete pkgJSON.dependencies;

const __dirname = dirname(fileURLToPath(import.meta.url));

writeFileSync(
  resolve(__dirname, "..", "package.json"),
  JSON.stringify(pkgJSON, null, 2),
);

execSync("pnpx @turbo/codemod update . && pnpm update --latest -r");

execSync("pnpm format");
