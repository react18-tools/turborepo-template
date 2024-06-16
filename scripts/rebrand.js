const fs = require("node:fs");
const path = require("node:path");
const { prompt } = require("enquirer");
const { execSync } = require("child_process");

const [owner, repo] = execSync(
  'git remote get-url --push origin | sed "s/https:\\/\\/github.com\\///" | sed "s/.git//"',
)
  .toString()
  .trim()
  .split("/");

const packageName = repo;

if (repo === "turborepo-template" && /(mayank1513|react18-tools)/.test(owner)) return; // silently ignore

(async () => {
  const { shouldRebrand } = await prompt({
    type: "confirm",
    name: "shouldRebrand",
    message: "Do you want to rebrand this repo?",
    initial: true,
  });

  if (!shouldRebrand) return;

  // if .tkb is not moved - setup workflow was not triggered or could not create the required commit
  if (fs.existsSync(path.resolve(process.cwd(), "scripts", ".tkb"))) {
    `git rm .tkb
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
      type: "confirm",
      name: "installExt",
      message: "Do you want to install the recommended VS Code extensions?",
      initial: true,
    },
  ]);

  if (installExt) {
    execSync("code --install-extension mayank1513.trello-kanban-task-board");
    execSync("code --install-extension esbenp.prettier-vscode");
  }

  fs.writeFileSync(
    path.resolve(process.cwd(), "scripts", "rebrand.config.json"),
    JSON.stringify(answers, null, 2),
  );

  execSync("node ./scripts/rebrander.js");

  prompt({
    type: "list",
    message:
      "Please open TKB (Workspace) [`Ctrl/command` + `Shift` + `P` -> type 'TrelloKanban: Workspace' -> hit Enter] and clear the Kanban Board to complete setting up your repo.",
    choices: ["Ok"],
  });
})();
