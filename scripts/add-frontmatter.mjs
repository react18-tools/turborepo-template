import fs from "fs";
import path from "path";

const DOCS_DIR = "./docs"; // adjust to your TypeDoc output folder
const PARENT_SECTION = "API Reference"; // top-level sidebar section

function addFrontmatter(filePath, navOrder) {
  const content = fs.readFileSync(filePath, "utf8");

  // Skip if it already has frontmatter
  if (content.startsWith("---")) return;

  const fileName = path.basename(filePath, ".md");
  const title = fileName.replace(/-/g, " ");

  const frontmatter = `---
layout: default
title: ${title}
parent: ${PARENT_SECTION}
nav_order: ${navOrder}
---

`;

  fs.writeFileSync(filePath, frontmatter + content, "utf8");
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
