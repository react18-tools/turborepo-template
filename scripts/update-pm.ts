import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import packageJSON from "../package.json";
import { fileURLToPath } from "url";

// Update pnpm to latest version
try {
  execSync("pnpm turbo telemetry disable");
  execSync("pnpm self-update");
} catch (err) {
  console.warn("Could not update pnpm: ", err);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PNPM_VERSION = execSync("pnpm -v").toString().trim();
packageJSON.packageManager = `pnpm@${PNPM_VERSION}`;

fs.writeFileSync(
  path.resolve(__dirname, "../package.json"),
  JSON.stringify(packageJSON, null, 2) + "\n",
);

// commit to repo
try {
  execSync("git add ./package.json && git commit -m 'Update package.json with pnpm version'");
} catch {
  // no changesets to be applied
}
