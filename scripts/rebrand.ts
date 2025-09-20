import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import Enquirer from "enquirer";
import rootPackageJSON from "../package.json";
import config from "./rebrand.config.json";

const { prompt } = Enquirer;

const isFirstRebrand =
  config.repo === "turborepo-template" && config.owner === "react18-tools";

const ownerAndRepo = execSync(
  'git remote get-url --push origin | sed "s/https:\\/\\/github\\.com\\///" | sed "s/https:\\/\\/[^@]*@github\\.com\\///" | sed "s/\\.git//"',
)
  .toString()
  .trim();

const [owner, repo] = ownerAndRepo
  ? ownerAndRepo.split("/")
  : ["repo-owner", path.basename(process.cwd())];

const packageName = isFirstRebrand ? repo : config.packageName || repo;

/** avoiding IIFE as formettter keeps misformettting IIFEs */
const rebrandFn = async () => {
  const { shouldRebrand } = await prompt<{ shouldRebrand: boolean }>({
    type: "confirm",
    name: "shouldRebrand",
    message: "Do you want to rebrand this repo?",
    initial: true,
  });

  if (!shouldRebrand) return;

  const rootDir = process.cwd();

  // if .tkb is not moved - setup workflow was not triggered or could not create the required commit
  if (fs.existsSync(path.resolve(process.cwd(), "scripts", ".tkb"))) {
    `rm .tkb
     mv ./scripts/.tkb ./.tkb
     rm -rf ./docs
     sed -i '/\\.turborepo-template\\.lst/d' .github/workflows/upgrade.yml
     sed -i '/\\.turborepo-template\\.lst/d' .github/workflows/docs.yml`
      .split("\n")
      .forEach((cmd) => {
        execSync(cmd.trim());
      });
  }

  const defaultInitialTitle = packageName
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
  const { installExt, ...answers } = await prompt<{
    packageName: string;
    owner: string;
    repo: string;
    title: string;
    installExt: boolean;
  }>([
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
      initial: isFirstRebrand
        ? defaultInitialTitle
        : config.title || defaultInitialTitle,
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
    execSync("code --install-extension mayank1513.trello-kanban-task-board", {
      stdio: "inherit",
    });
    execSync("code --install-extension esbenp.prettier-vscode", {
      stdio: "inherit",
    });
  }

  const newConfig = Object.assign({}, answers);
  console.log("\x1b[32m", "Creating rebrand.config.json...");
  fs.writeFileSync(
    path.resolve(process.cwd(), "scripts", "rebrand.config.json"),
    JSON.stringify(newConfig, null, 2),
  );

  console.log("\x1b[32m", "rebranding...");
  execSync("tsx ./scripts/rebrander.ts", { stdio: "inherit" });

  console.log("\x1b[32m", "...");
  console.log("\x1b[32m", "...");
  console.log("\x1b[32m", "...");
  console.log(
    "\x1b[32m",
    "Clean up repo by removing things that you don't need",
  );

  const { pkgs } = await prompt<{ pkgs: string[] }>({
    type: "multiselect",
    name: "pkgs",
    message: "Select the examples or packages to remove",
    initial: ["examples/express", "packages/logger"],
    // @ts-expect-error: not picked up correctly
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
    ],
  });

  Object.assign(newConfig, { removedPackages: pkgs });

  pkgs.forEach((pkg: string) => {
    execSync(`rm -rf ${pkg}`);
  });

  if (pkgs.length) {
    // packages might have already been deleted during previous rebrand
    try {
      execSync(
        'git add . && git commit -m "Cleaned up 💖 <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a> [skip ci]"',
        { stdio: "inherit" },
      );
    } catch {
      // empty
    }
  }

  /**
   * feats: Rebrander, Docs
   */
  const { feats } = await prompt<{ feats: string[] }>({
    type: "multiselect",
    name: "feats",
    message:
      "Select the features to remove - will help clean up and lighten the build ci/cd",
    initial: ["Rebrander"],
    // @ts-expect-error: not picked up correctly
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

  Object.assign(newConfig, { removedFeatures: feats });

  if (feats.includes("Rebrander")) {
    // @ts-expect-error -- allow delete
    delete rootPackageJSON.scripts.rebrand;
    // @ts-expect-error -- allow delete
    delete rootPackageJSON.devDependencies.enquirer;
    ["./scripts/rebrand.ts", "./scripts/rebrander.ts"].forEach((dirOrFile) => {
      execSync(`rm -rf ${dirOrFile}`);
    });
  } else {
    fs.writeFileSync(
      path.resolve(rootDir, "scripts", "rebrander.ts"),
      fs
        .readFileSync(path.resolve(rootDir, "scripts", "rebrander.ts"), "utf-8")
        .replace("rm -rf ./lib/src/ && ", ""),
    );

    execSync(
      `sed -i -e 's/const packageName = repo/const packageName = config.packageName/' scripts/rebrand.ts`,
      { stdio: "inherit" },
    );
  }

  if (feats.includes("Docs")) {
    // @ts-expect-error -- allow delete
    delete rootPackageJSON.scripts.doc;
    // @ts-expect-error -- allow delete
    delete rootPackageJSON.devDependencies.typedoc;
    Object.keys(rootPackageJSON.devDependencies).forEach((dep) => {
      if (dep.startsWith("typedoc-plugin-")) {
        // @ts-expect-error -- allow delete
        delete rootPackageJSON.devDependencies[dep];
      }
    });
    [
      ".github/workflows/docs.yml",
      "./docs",
      "./scripts/doc.ts",
      "./typedoc.config.js",
      "./tsconfig.docs.json",
    ].forEach((dirOrFile) => {
      execSync(`rm -rf ${dirOrFile}`);
    });
    const publishWorkflowFile = path.resolve(
      process.cwd(),
      ".github/workflows/publish.yml",
    );
    fs.writeFileSync(
      publishWorkflowFile,
      `${fs
        .readFileSync(publishWorkflowFile, "utf8")
        .split("\n")
        .slice(0, -5)
        .join("\n")}\n`,
    );
  }

  if (feats.includes("Generators")) {
    // @ts-expect-error -- allow delete
    delete rootPackageJSON.devDependencies.plop;
    [
      "./scripts/templates",
      "./scripts/hook.ts",
      "./scripts/rc.ts",
      "./plopfile.js",
    ].forEach((dirOrFile) => {
      execSync(`rm -rf ${dirOrFile}`);
    });
    // update vitest scripts
    execSync(
      `sed -i -e 's/"src\\/\\*\\*\\/index\\.ts", //' lib/vitest.config.mts`,
    );

    // update docs config if docs is there
    if (!feats.includes("Docs")) {
      execSync(`sed -i -e 's/"\\*\\*\\/index\\.ts", //' typedoc.config.js`);
    }
  }

  if (feats.includes("LiteMode")) {
    ["./scripts/lite.ts"].forEach((dirOrFile) => {
      execSync(`rm -rf ${dirOrFile}`);
    });
    ["publish.ts", "manual-publish.ts"].forEach((src) => {
      const filePath = path.resolve(process.cwd(), "scripts", src);
      fs.writeFileSync(
        filePath,
        fs.readFileSync(filePath, "utf-8").split("\n").slice(0, -3).join("\n"),
      );
    });
  }

  try {
    fs.writeFileSync(
      path.resolve(rootDir, "package.json"),
      JSON.stringify(rootPackageJSON, null, 2),
    );
  } catch (e) {
    console.error(e);
  }

  console.log("\x1b[32m", "Updating rebrand.config.json...");
  fs.writeFileSync(
    path.resolve(process.cwd(), "scripts", "rebrand.config.json"),
    JSON.stringify(newConfig, null, 2),
  );

  console.log("\x1b[32m", "re-installing dependencies after updates...");
  // reinstall dependencies --> this will update the pnpm-lock file as well which we need to add to commit
  execSync("pnpm i");

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
  console.log(
    "\x1b[36m",
    "  1. Press `Ctrl/command` + `Shift` + `P` to open the command palette.",
  );
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
