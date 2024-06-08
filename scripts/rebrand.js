const fs = require("node:fs");
const path = require("node:path");
const { prompt } = require("enquirer");
const { execSync } = require("child_process");
const { packageName, owner, repo } = require("./rebrand.config.json");

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
    execSync(`git rm .tkb
          mv ./scripts/.tkb ./.tkb
          rm -rf ./docs
          git add .
          git commit -m 'Craete rebrand config 💖 <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a> [skip ci]'
          git push origin main`);
  }

  const answers = await prompt([
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
  ]);

  fs.writeFileSync(
    path.resolve(process.cwd(), "scripts", "rebrand.config.json"),
    JSON.stringify(answers, null, 2),
  );

  execSync("node ./scripts/rebrander.js");
})();
