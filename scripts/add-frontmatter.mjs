import fs from "fs";
import path from "path";

const DOCS_DIR = "./docs"; // adjust to your TypeDoc output folder

function addFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  // Skip if it already has frontmatter
  if (content.startsWith("---")) return;

  const fileName = path.basename(filePath, ".md");
  const title = fileName.replace(/-/g, " ");

  const frontmatter = `---
layout: default
title: ${title}
---

`;

  fs.writeFileSync(filePath, frontmatter + content, "utf8");
  console.log(`✅ Added frontmatter to: ${filePath}`);
}

function processDir(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry, i) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      addFrontmatter(fullPath);
    }
  });
}

processDir(DOCS_DIR);
