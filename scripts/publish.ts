/** It is assumed that this is called only from the default branch. */
import { execSync } from "child_process";
import updateSecurityMd from "./update-security-md";

const BRANCH = process.env.BRANCH!;

// Apply changesets if any -- e.g., coming from pre-release branches
try {
  execSync("pnpm changeset pre exit");
} catch {
  // empty
}
try {
  execSync("pnpm changeset version");
  execSync(
    `git add . && git commit -m "Apply changesets and update CHANGELOG [skip ci]" && git push origin ${BRANCH}`,
  );
} catch {
  // no changesets to be applied
}

const { version: VERSION, name } = require("../lib/package.json");
let LATEST_VERSION = "0.0.-1";

try {
  LATEST_VERSION = execSync(`npm view ${name} version`).toString().trim() ?? "0.0.-1";
} catch {
  // empty
}

console.log({ VERSION, LATEST_VERSION });

const [newMajor, newMinor] = VERSION.split(".");
const [oldMajor, oldMinor] = LATEST_VERSION.split(".");

const isPatch = newMajor === oldMajor && newMinor === oldMinor;
const releaseBranch = `release-${newMajor}.${newMinor}`;

if (isPatch) {
  // update release branch
  try {
    execSync(
      `git checkout ${releaseBranch} && git merge ${BRANCH} && git push origin ${releaseBranch}`,
    );
  } catch {}
} else {
  try {
    updateSecurityMd(`${newMajor}.${newMinor}`, `${oldMajor}.${oldMinor}`);
    /** Create new release branch for every Major or Minor release */
    execSync(`git checkout -b ${releaseBranch} && git push origin ${releaseBranch}`);
  } catch (err) {
    console.error("Error pushing to release branch: ", err);
  }
}

const { visibility } = JSON.parse(execSync("gh repo view --json visibility").toString());
const provenance = visibility.toLowerCase() === "public" ? "--provenance" : "";

/** Create release */
execSync(`cd lib && pnpm build && npm publish ${provenance} --access public`);

/** Create GitHub release */
try {
  execSync(
    `gh release create ${VERSION} --generate-notes --latest -n "$(sed '1,/^## /d;/^## /,$d' lib/CHANGELOG.md)" --title "Release v${VERSION}"`,
  );
} catch {
  try {
    execSync(
      `gh release create ${VERSION} --generate-notes --latest --title "Release v${VERSION}"`,
    );
  } catch {
    // ignore
  }
}

try {
  // Publish canonical packages
  execSync("tsx scripts/publish-canonical.ts");
} catch {
  console.error("Failed to publish canonical packages");
}

execSync("tsx ./scripts/lite.ts");
execSync(`cd lib && pnpm build && npm publish ${provenance} --access public`);
