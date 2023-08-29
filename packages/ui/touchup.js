"use strict";

const fs = require("fs");
const path = require("path");
const packageJson = require(path.resolve(__dirname, "package.json"));

delete packageJson.devDependencies;
delete packageJson.scripts;

packageJson.main = "index.js";
packageJson.types = "index.d.ts";

fs.writeFileSync(
	path.resolve(__dirname, "dist", "package.json"),
	JSON.stringify(packageJson, null, 2),
);

fs.copyFileSync(path.resolve(__dirname, "README.md"), path.resolve(__dirname, "dist", "README.md"));
