const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const packageJSON = require("../package.json");

const PNPM_VERSION = execSync("pnpm -v").toString().trim();
packageJSON.packageManager = `pnpm@${PNPM_VERSION}`;

fs.writeFileSync(path.resolve(__dirname, "../package.json"), JSON.stringify(packageJSON, null, 2));

// commit to repo
try {
  execSync("git add . && git commit -m 'Update package.json with pnpm version'");
} catch {
  // no changesets to be applied
}
