/**
 * allow only patch changes from release branches.
 * Major and minor changes allowed only from main branch.
 * pre-release only from branch containing dev or alpha in the branchname
 */

/** Let the following error be thrown by npm. There are situations where publish could have failed for different reasons. */
// throws an exception if process.env.oldv === process.env.v The library version is not up to date, error(" Not able to release to the same version.

const { exec } = require("child_process");

const BRANCH = process.env.BRANCH;
const DEFAULT_BRANCH = process.env.DEFAULT_BRANCH;

const isLatestRelease = BRANCH === DEFAULT_BRANCH || BRANCH.includes("release-");
let tag = "latest";

const OLD_VERSION = require("../lib/package.json").version;
if (!isLatestRelease) {
  /** pre-release branch name should be the tag name (e.g., beta, canery, etc.) or tag name followed by a '-' and version or other specifiers. e.g. beta-2.0 */
  tag = BRANCH.split("-")[0];
  console.log({ tag });
  exec(`pnpm changeset pre enter ${tag} && pnpm changeset version`, console.log);
} else {
  /** Apply changeset */
  exec("pnpm changeset version");
}
const NEW_VERSION = require("../lib/package.json").version;

const [newMajor, newMinor] = NEW_VERSION.split(".");
const [oldMajor, oldMinor] = OLD_VERSION.split(".");

const isNotPatch = newMajor !== oldMajor && newMinor !== oldMinor;

const pushCmd = `git add . && git commit -m "Apply changesets and update CHANGELOG" && git push origin ${BRANCH}`;

if (isNotPatch && BRANCH === DEFAULT_BRANCH) {
  exec(pushCmd);
  /** Create new release branch for every Major or Minor release */
  const releaseBranch = `release-${newMajor}.${newMinor}`;
  exec(`git checkout -b ${releaseBranch} && git push origin ${releaseBranch}`);
} else if (isLatestRelease) {
  /** New version must be valid SEMVER version. No pre-release (beta/alpha etc.) */
  if (!/^\d+\.\d+.\d+$/.test(NEW_VERSION)) throw new Error("Invalid version");

  if (isNotPatch)
    throw new Error("Major or Minor changes can be published only from the default branch.");

  // Push changes back to the repo
  exec(pushCmd);
} else {
  exec(pushCmd, console.log);
}

/** Create release */
exec(`cd lib && pnpm build && npm publish --provenance --access public --tag ${tag}`, console.log);

console.log({ NEW_VERSION });

/** Create GitHub release */
exec(
  `gh release create ${NEW_VERSION} --generate-notes${isLatestRelease ? " --latest" : ""} -n "$(sed '1,/^## /d;/^## /,$d' CHANGELOG.md)" --title "Release v${NEW_VERSION}"`,
  console.log,
);

console.log("post", { OLD_VERSION, NEW_VERSION });
