/**
 * allow only patch changes from release branches.
 * Major and minor changes allowed only from main branch.
 * pre-release only from branch containing dev or alpha in the branchname
 */

/** Let the following error be thrown by npm. There are situations where publish could have failed for different reasons. */
// throws an exception if process.env.oldv === process.env.v The library version is not up to date, error(" Not able to release to the same version.

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const BRANCH = process.env.BRANCH;
const DEFAULT_BRANCH = process.env.DEFAULT_BRANCH;

const isLatestRelease = BRANCH === DEFAULT_BRANCH || BRANCH.includes("release-");
let tag = "latest";

const OLD_VERSION = require("../lib/package.json").version;
if (!isLatestRelease) {
  /** pre-release branch name should be the tag name (e.g., beta, canery, etc.) or tag name followed by a '-' and version or other specifiers. e.g. beta-2.0 */
  tag = BRANCH.split("-")[0];
  try {
    execSync(`pnpm changeset pre enter ${tag}`);
  } catch (e) {
    console.log({ e });
  }
}
/** Apply changeset */
execSync("pnpm changeset version");

// exit pre mode -- to avoid collision with full releases
try {
  execSync("pnpm changeset pre exit");
} catch {
  // empty
}

/** not requiring as require is cached by npm/node */
const NEW_VERSION = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "..", "lib", "package.json")),
).version;

const [newMajor, newMinor] = NEW_VERSION.split(".");
const [oldMajor, oldMinor] = OLD_VERSION.split(".");

const isNotPatch = newMajor !== oldMajor || newMinor !== oldMinor;

const pushCmd = `git add . && git commit -m "Apply changesets and update CHANGELOG" && git push origin ${BRANCH}`;

if (isNotPatch && BRANCH === DEFAULT_BRANCH) {
  execSync(pushCmd);
  /** Create new release branch for every Major or Minor release */
  const releaseBranch = `release-${newMajor}.${newMinor}`;
  execSync(`git checkout -b ${releaseBranch} && git push origin ${releaseBranch}`);
} else if (isLatestRelease) {
  /** New version must be valid SEMVER version. No pre-release (beta/alpha etc.) */
  if (!/^\d+\.\d+.\d+$/.test(NEW_VERSION)) throw new Error("Invalid version");

  if (isNotPatch)
    throw new Error("Major or Minor changes can be published only from the default branch.");

  // Push changes back to the repo
  execSync(pushCmd);
} else {
  execSync(pushCmd);
}

/** Create release */
execSync(`cd lib && pnpm build && npm publish --provenance --access public --tag ${tag}`);

/** Create GitHub release */
execSync(
  `gh release create ${NEW_VERSION} --generate-notes${isLatestRelease ? " --latest" : ""} -n "$(sed '1,/^## /d;/^## /,$d' CHANGELOG.md)" --title "Release v${NEW_VERSION}"`,
);
