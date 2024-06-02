/** It is assumed that this is called only from the default branch. */
const { execSync } = require("child_process");

// Apply changesets if any -- e.g., coming from pre-release branches
try {
  execSync("pnpm changeset pre exit");
} catch {
  // empty
}
try {
  execSync("pnpm changeset version");
  execSync(
    `git add . && git commit -m "Apply changesets and update CHANGELOG" && git push origin ${process.env.BRANCH}`,
  );
} catch {
  // no changesets to be applied
}

const { version: VERSION, name } = require("../lib/package.json");
let LATEST_VERSION;

try {
  LATEST_VERSION = execSync(`npm view ${name} version`).toString() ?? "0.0.-1";
} catch {
  LATEST_VERSION = "0.0.-1";
}

console.log({ VERSION, LATEST_VERSION });

const [newMajor, newMinor] = VERSION.split(".");
const [oldMajor, oldMinor] = LATEST_VERSION.split(".");

const isPatch = newMajor === oldMajor && newMinor === oldMinor;

if (!isPatch) {
  /** Create new release branch for every Major or Minor release */
  const releaseBranch = `release-${newMajor}.${newMinor}`;
  execSync(`git checkout -b ${releaseBranch} && git push origin ${releaseBranch}`);
}

/** Create release */
execSync("cd lib && pnpm build && npm publish --provenance --access public");

/** Create GitHub release */
execSync(
  `gh release create ${VERSION} --generate-notes --latest -n "$(sed '1,/^## /d;/^## /,$d' CHANGELOG.md)" --title "Release v${VERSION}"`,
);
