const { execSync } = require("child_process");
const pkgJSON = require("../package.json");
const { writeFileSync } = require("fs");
const { resolve } = require("path");

// Ensure all global deps are devDeps only for easier management.
pkgJSON.devDependencies = { ...pkgJSON.dependencies, ...pkgJSON.devDependencies };
delete pkgJSON.dependencies;

writeFileSync(resolve(__dirname, "..", "package.json"), JSON.stringify(pkgJSON, null, 2));

execSync(`pnpm update --latest -r`);

execSync("pnpm format");
