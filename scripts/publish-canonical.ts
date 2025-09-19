import { execSync } from "node:child_process";

// Set up npm authentication
if (process.env.NODE_AUTH_TOKEN) {
  execSync(
    `npm config set //registry.npmjs.org/:_authToken ${process.env.NODE_AUTH_TOKEN}`,
  );
}

// Publish canonical packages
const canonicals: string[] = [];

canonicals.forEach((pkg) => {
  try {
    execSync(
      `sed -i -e "s/name.*/name\\": \\"${pkg.replace(/\//g, "\\\\/")}\\",/" lib/package.json`,
    );
    execSync("cd lib && npm publish --provenance --access public");
  } catch (err) {
    console.error(`Error publishing ${pkg}: `, err);
  }
});
