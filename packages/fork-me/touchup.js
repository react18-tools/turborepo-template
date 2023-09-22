/* eslint-disable -- no need - external file */
"use strict";

const fs = require("fs");
const path = require("path");
const packageJson = require(path.resolve(__dirname, "package.json"));
if (process.env.TOKEN) {
	const { Octokit } = require("octokit");
	// Octokit.js
	// https://github.com/octokit/core.js#readme
	const octokit = new Octokit({
		auth: process.env.TOKEN,
	});

	const octoOptions = {
		owner: process.env.OWNER,
		repo: process.env.REPO,
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	};
	const tag_name = `v${packageJson.version}`;
	const name = `Release ${tag_name}`;
	/** Create a release */
	octokit.request("POST /repos/{owner}/{repo}/releases", {
		...octoOptions,
		tag_name,
		target_commitish: "main",
		name,
		draft: false,
		prerelease: false,
		generate_release_notes: true,
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});
}
delete packageJson.devDependencies;
delete packageJson.scripts;

packageJson.main = "index.js";
packageJson.types = "index.d.ts";

fs.writeFileSync(
	path.resolve(__dirname, "dist", "package.json"),
	JSON.stringify(packageJson, null, 2),
);

fs.copyFileSync(path.resolve(__dirname, "README.md"), path.resolve(__dirname, "dist", "README.md"));

const dirs = [path.resolve(__dirname, "dist")];

while (dirs.length) {
	const dir = dirs.shift();
	fs.readdirSync(dir).forEach(f => {
		const f1 = path.resolve(dir, f);
		if (f.includes(".test.")) fs.unlink(f1, () => {});
		else if (fs.lstatSync(f1).isDirectory()) {
			dirs.push(f1);
		}
	});
}
