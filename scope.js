/* eslint-disable -- no need - external file */
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const owner = "mayank1513";
const repo = "fork-me";
const pkgPath = path.resolve(process.cwd(), "lib", repo, "package.json");
const packageJson = require(pkgPath);
const ref = packageJson.name;
if (!ref.startsWith(`@${owner}`)) {
  /** Update lib package.json */
  packageJson.name = `@${owner}/${packageJson.name}`;
  fs.writeFileSync(pkgPath, JSON.stringify(packageJson, null, 2));

  /** Update README */
  const readMePath = path.resolve(process.cwd(), "README.md");
  let readMe = fs.readFileSync(readMePath, { encoding: "utf8" });
  const tmp = "!---!";
  readMe = readMe.replace(new RegExp(`${owner}/${ref}`, "g"), tmp);
  readMe = readMe.replace(new RegExp(ref, "g"), packageJson.name);
  readMe = readMe.replace(new RegExp(tmp, "g"), `${owner}/${ref}`);
  fs.writeFileSync(readMePath, readMe);

  /** Update examples */
  const examplesPath = path.resolve(process.cwd(), "examples");
  fs.readdirSync(examplesPath).forEach(dir => {
    const examplePkgPath = path.resolve(examplesPath, dir, "package.json");
    let examplePkg = require(examplePkgPath);
    delete examplePkg.dependencies[repo];
    examplePkg.dependencies[`@${owner}/${repo}`] = "workspace:*";
    fs.writeFileSync(examplePkgPath, JSON.stringify(examplePkg, null, 2));
  });

  /** Update shared-ui package.json */
  const sharedPkgPath = path.resolve(process.cwd(), "packages", "shared-ui", "package.json");
  let sharedUIPkg = require(sharedPkgPath);
  delete sharedUIPkg.devDependencies[repo];
  sharedUIPkg.devDependencies[`@${owner}/${repo}`] = "workspace:*";
  fs.writeFileSync(sharedPkgPath, JSON.stringify(sharedUIPkg, null, 2));

  /** Update Remix server config */
  const remixConfigPath = path.resolve(examplesPath, "remix", "remix.config.js");
  let remixConfig = fs.readFileSync(remixConfigPath, { encoding: "utf8" });
  remixConfig = remixConfig.replace(new RegExp(ref, "g"), packageJson.name);
  fs.writeFileSync(remixConfigPath, remixConfig);
}
