import fs from "fs";
import path from "path";

const DOCS_DIR = "./docs"; // adjust to your TypeDoc output folder

function addFrontmatter(filePath, navOrder) {
  const content = fs.readFileSync(filePath, "utf8");

  // Skip if it already has frontmatter
  if (content.startsWith("---")) return;

  const fileName = path.basename(filePath, ".md");
  const title = fileName.replace(/-/g, " ");

  const frontmatter = `---
layout: default
title: ${title}
nav_order: ${navOrder}
---

`;

  fs.writeFileSync(filePath.replace(/readme/gi, "index"), frontmatter + content, "utf8");
  console.log(`✅ Added frontmatter to: ${filePath}`);
}

function processDir(dir, navOrder = 1) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry, i) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath, navOrder + i);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      addFrontmatter(fullPath, navOrder + i);
    }
  });
}

processDir(DOCS_DIR);
