const fs = require("fs");
const path = require("path");
const rebrandConfig = require("./rebrand.config.json");
const packageJSON = require("../lib/package.json");

const rootDir = process.cwd();
const oldPkgName = packageJSON.name;
const [oldOwner, oldRepo] = packageJSON.repository.split(":")[1].split("/");

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
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  if (pkg.dependencies?.[oldPkgName]) {
    pkg.dependencies[oldPkgName] = "latest";
    pkg.dependencies[packageJSON.name] = "workspace:*";
  } else if (pkg.devDependencies?.[oldPkgName]) {
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

// Update README
let readme = fs.readFileSync(path.resolve(rootDir, "lib", "README.md"), "utf-8");
readme = readme.replace(new RegExp(oldPkgName, "g"), packageName);
readme = readme.replace(new RegExp(oldOwner, "g"), owner);
readme = readme.replace(new RegExp(oldRepo, "g"), repo);
readme = readme.replace(
  new RegExp(oldPkgName.replace("-", " "), "ig"),
  packageName
    .split("-")
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(" "),
);
readme = readme.replace(/> This package also.*[^\n]/, "");
fs.writeFileSync(path.resolve(rootDir, "README.md"), readme);

const rootPackageJSON = require("../package.json");
delete rootPackageJSON.scripts.postinstall;
try {
  fs.writeFileSync(path.resolve(rootDir, "package.json"), JSON.stringify(rootPackageJSON, null, 2));
} catch (e) {
  console.error(e);
}
