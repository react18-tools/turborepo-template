const fs = require("fs");
const path = require("path");
const rebrandConfig = require("./rebrand.config.json");
const packageJSON = require("../lib/package.json");

const rootDir = process.cwd();

// Delete old changelogs
["examples", "packages"].forEach(dir => {
  fs.readdirSync(path.resolve(rootDir, dir)).forEach(f => {
    try {
      fs.unlinkSync(path.resolve(rootDir, dir, f, "CHANGELOG.md"));
    } catch {}
  });
});

try {
  fs.unlinkSync(path.resolve(rootDir, "lib", "CHANGELOG.md"));
} catch {}

if (!rebrandConfig.keepRebrandingScripts) {
  const rootPackageJSON = require("../package.json");
  try {
    fs.unlinkSync(path.resolve(rootDir, "rebrand.config.json"));
    fs.unlinkSync(path.resolve(rootDir, "rebrand.js"));
  } catch (e) {
    console.error(e);
  }
}
