/** Let the following error be thrown by npm. There are situations where publish could have failed for different reasons. */
// throws an exception if process.env.oldv === process.env.v The library version is not up to date, error(" Not able to release to the same version.

const newV = process.env.v;
const oldV = process.env.oldv;

/** New version must be valid SEMVER version. No pre-release (beta/alpha etc.) */
if (!/^\d+\.\d+.\d+$/.test(newV)) throw new Error("Invalid version");

const [major, minor] = newV.split(".");
const [major1, minor1] = oldV.split(".");

if (major !== major1 || minor !== minor1)
  throw new Error("Major or Minor changes can be published only from the default branch.");
