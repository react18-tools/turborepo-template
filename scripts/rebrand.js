const fs = require("node:fs");
const path = require("node:path");
// skipcq: JS-0258
const { prompt } = require("enquirer");
const { execSync } = require("child_process");

const [owner, repo] = execSync(
  'git remote get-url --push origin | sed "s/https:\\/\\/github.com\\///" | sed "s/.git//"',
)
  .toString()
  .trim()
  .split("/");

const packageName = repo;

/** avoiding IIFE as formettter keeps misformettting IIFEs */
const rebrandFn = async () => {
  const { shouldRebrand } = await prompt({
    type: "confirm",
    name: "shouldRebrand",
    message: "Do you want to rebrand this repo?",
    initial: true,
  });

  if (!shouldRebrand) return;

  // if .tkb is not moved - setup workflow was not triggered or could not create the required commit
  if (fs.existsSync(path.resolve(process.cwd(), "scripts", ".tkb"))) {
    `rm .tkb
          mv ./scripts/.tkb ./.tkb
          rm -rf ./docs`
      .split("\n")
      .forEach(cmd => execSync(cmd.trim()));
  }

  const { installExt, ...answers } = await prompt([
    {
      type: "input",
      name: "packageName",
      message: "What is the name of your library?",
      initial: packageName,
    },
    {
      type: "input",
      name: "owner",
      message:
        "Who is the owner of this repo? (GitHub user or organization login, .e.g, mayank1513)",
      initial: owner,
    },
    {
      type: "input",
      name: "repo",
      message: "What is the name of your repository?",
      initial: repo,
    },
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?",
      initial: packageName
        .split("-")
        .map(w => w[0].toUpperCase() + w.slice(1))
        .join(" "),
    },
    {
      type: "confirm",
      name: "installExt",
      message: "Do you want to install the recommended VS Code extensions?",
      initial: true,
    },
  ]);

  if (installExt) {
    console.log("\x1b[32m", "Installing recommended VS Code extensions...");
    execSync("code --install-extension mayank1513.trello-kanban-task-board");
    execSync("code --install-extension esbenp.prettier-vscode");
  }

  console.log("\x1b[32m", "Creating rebrand.config.json...");
  fs.writeFileSync(
    path.resolve(process.cwd(), "scripts", "rebrand.config.json"),
    JSON.stringify(answers, null, 2),
  );

  console.log("\x1b[32m", "rebranding...");
  execSync("node ./scripts/rebrander.js");

  console.log("\x1b[32m", "...");
  console.log("\x1b[32m", "...");
  console.log("\x1b[32m", "...");
  console.log("\x1b[32m", "Clean up repo by removing things that you don't need");

  const { pkgs } = await prompt({
    type: "multiselect",
    name: "pkgs",
    message: "Select the examples or packages to remove",
    initial: ["examples/express", "packages/logger", "packages/jest-presets"],
    choices: [
      {
        name: "examples/express",
        message:
          "Express.js example at examples/express -- You might want to keep this for server or API related functionality provided by your app.",
      },
      {
        name: "packages/logger",
        message:
          "Logger package at packages/logger. The express example uses logger - handle it if needed.",
      },
      {
        name: "packages/jest-presets",
        message:
          "We use vitest. You can keep this in case you want to use Jest. Note that the express example and logger package are set up to use jest with this jest-presets.",
      },
    ],
  });

  pkgs.forEach(pkg => execSync(`rm -rf ${pkg}`));

  if (pkgs.length)
    execSync(
      'git add . && git commit -m "Cleaned up 💖 <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a> [skip ci]"',
    );

  /**
   * feats: Rebrander, Docs
   */
  const { feats } = await prompt({
    type: "multiselect",
    name: "feats",
    message: "Select the features to remove - will help clean up and lighten the build ci/cd",
    initial: ["Rebrander"],
    choices: [
      {
        name: "Rebrander",
        message:
          "After rebranding is done, usually it is not required to run rebranding scripts again unless you change your package and repo names.",
      },
      {
        name: "Docs",
        message: "Some libraries do not require docs generated by typedoc.",
      },
      {
        name: "Generators",
        message:
          "Generators are used to generate boilerplate code for new packages. They might not be required for a few libraries.",
      },
      {
        name: "LiteMode",
        message: "If you do not want to create a lite version of your lib",
      },
    ],
  });

  const rootPackageJSON = require("../package.json");

  if (feats.includes("Rebrander")) {
    delete rootPackageJSON.scripts.rebrand;
    delete rootPackageJSON.devDependencies.enquirer;
    ["./scripts/rebrand.js", "./scripts/rebrander.js", "./scripts/rebrand.config.json"].forEach(
      dirOrfile => execSync("rm -rf " + dirOrfile),
    );
  }

  if (feats.includes("Docs")) {
    delete rootPackageJSON.scripts.doc;
    delete rootPackageJSON.devDependencies["typedoc"];
    delete rootPackageJSON.devDependencies["typedoc-plugin-missing-exports"];
    delete rootPackageJSON.devDependencies["typedoc-plugin-rename-defaults"];
    delete rootPackageJSON.devDependencies["typedoc-plugin-inline-sources"];
    delete rootPackageJSON.devDependencies["typedoc-plugin-mdn-links"];
    delete rootPackageJSON.devDependencies["typedoc-plugin-extras"];
    delete rootPackageJSON.devDependencies["typedoc-plugin-zod"];
    [
      ".github/workflows/docs.yml",
      "./docs",
      "./scripts/doc.js",
      "./typedoc.config.js",
      "./tsconfig.docs.json",
    ].forEach(dirOrfile => execSync("rm -rf " + dirOrfile));
  }

  if (feats.includes("Generators")) {
    delete rootPackageJSON.devDependencies.plop;
    ["./scripts/templates", "./scripts/hook.js", "./scripts/rc.js", "./plopfile.js"].forEach(
      dirOrfile => execSync("rm -rf " + dirOrfile),
    );
  }

  if (feats.includes("LiteMode")) {
    ["./scripts/lite.js"].forEach(dirOrfile => execSync("rm -rf " + dirOrfile));
    ["publish.js", "manual-publish.js"].forEach(src =>
      fs.writeFileSync(
        fs
          .readFileSync(path.resolve(process.cwd(), "scripts", src), "utf-8")
          .split("\n")
          .slice(-3)
          .join("\n"),
      ),
    );
  }

  const rootDir = process.cwd();
  try {
    fs.writeFileSync(
      path.resolve(rootDir, "package.json"),
      JSON.stringify(rootPackageJSON, null, 2),
    );
  } catch (e) {
    console.error(e);
  }

  if (feats.length)
    execSync(
      'git add . && git commit -m "Cleaned up features 💖 <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a> [skip ci]"',
    );

  console.log("\x1b[32m", "90% of rebranding completed!");
  console.log("\x1b[36m%s", ".");
  console.log("\x1b[36m%s", ".");
  console.log(
    "\x1b[36m",
    "Please open TKB (Workspace) and clear the Kanban Board to complete setting up your repo.",
  );
  console.log("\x1b[36m", ".");
  console.log(
    "\x1b[35m",
    "To open TKB (Workspace) click on the `TKB (Workspace)` button on the vscode taskbar or follow these steps.",
  );
  console.log("\x1b[36m", ".");
  console.log("\x1b[36m", "  1. Press `Ctrl/command` + `Shift` + `P` to open the command palette.");
  console.log(
    "\x1b[36m",
    "  2. Type 'TrelloKanban: Workspace' and hit Enter to open the TKB (Workspace).",
  );
  console.log("\x1b[36m", ".");
  console.log("\x1b[36m", ".");
  console.log(
    "\x1b[33m",
    "If you have any issues, please raise an issue at https://github.com/react18-tools/turborepo-template/issues",
  );
};

rebrandFn();
