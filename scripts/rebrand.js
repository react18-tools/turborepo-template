const fs = require("fs");
const path = require("path");
const rebrandConfig = require("./rebrand.config.json");
const packageJSON = require("../lib/package.json");

const rootDir = process.cwd();
const oldPkgName = packageJSON.name;

const { packageName, owner, repo } = rebrandConfig;

// Rebrand lib packageJSON
packageJSON.name = packageName;
packageJSON.description = "";
packageJSON.version = "0.0.0";
packageJSON.repository = `github:${owner}/${repo}`;
packageJSON.funding.pop();
packageJSON.bugs = `https://github.com/${owner}/${repo}/issues`;
packageJSON.homepage = `https://github.com/${owner}/${repo}/#readme`;
packageJSON.funding.unshift({
  type: "github",
  url: `https://github.com/sponsors/${owner}`,
});
packageJSON.keywords = packageJSON.keywords.slice(2);

fs.writeFileSync(
  path.resolve(rootDir, "lib", "package.json"),
  JSON.stringify(packageJSON, null, 2),
);

const updatePkgAndRemoveChangelogs = dir => {
  // update package.json for packages and examples
  const pkgPath = path.resolve(dir, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath));
  if (pkg.dependencies[oldPkgName]) {
    pkg.dependencies[oldPkgName] = "latest";
    pkg.dependencies[packageJSON.name] = "workspace:*";
  } else if (pkg.devDependencies[oldPkgName]) {
    pkg.devDependencies[oldPkgName] = "latest";
    pkg.dependencies[packageJSON.name] = "workspace:*";
  }

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

  // Delete old changelogs
  try {
    fs.unlinkSync(path.resolve(dir, "CHANGELOG.md"));
  } catch {}
};

["examples", "packages"].forEach(dir => {
  fs.readdirSync(path.resolve(rootDir, dir)).forEach(f =>
    updatePkgAndRemoveChangelogs(path.resolve(rootDir, dir, f)),
  );
});

try {
  fs.unlinkSync(path.resolve(rootDir, "lib", "CHANGELOG.md"));
} catch {}

if (!rebrandConfig.keepRebrandingScripts) {
  const rootPackageJSON = require("../package.json");
  delete rootPackageJSON.scripts.rebrand;
  delete rootPackageJSON.scripts.postinstall;
  try {
    fs.writeFileSync(
      path.resolve(rootDir, "package.json"),
      JSON.stringify(rootPackageJSON, null, 2),
    );
    fs.unlinkSync(path.resolve(rootDir, "rebrand.js"));
  } catch (e) {
    console.error(e);
  }
}
