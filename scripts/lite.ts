import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "./rebrand.config.json";
import packageJson from "../lib/package.json";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ref = packageJson.name;
packageJson.peerDependencies.r18gs = `${packageJson.dependencies.r18gs.split(".")[0]}`;
delete packageJson.dependencies.r18gs;
if (Object.keys(packageJson.dependencies).length === 0) delete packageJson.dependencies;
packageJson.name = `${ref}-lite`;

fs.writeFileSync(
  path.resolve(__dirname, "../lib/package.json"),
  JSON.stringify(packageJson, null, 2),
);

const readMePath = path.resolve(__dirname, "../lib", "README.md");

let readMe = fs.readFileSync(readMePath, { encoding: "utf8" });
const tmp = "!---";
const { owner, repo } = config;
readMe = readMe.replace(new RegExp(`${owner}/${repo}`, "g"), tmp);
readMe = readMe.replace(new RegExp(ref, "g"), packageJson.name);
readMe = readMe.replace(new RegExp(tmp, "g"), `${owner}/${repo}`);
readMe = readMe.replace(
  /## Want Lite Version(.|\\n|\\r)*You need `r18gs` as a peer-dependency/m,
  "",
);
fs.writeFileSync(readMePath, readMe);
