import fs from "fs";
import path from "path";

const DOCS_DIR = "./docs"; // Root folder for TypeDoc output

/**
 * Adds Just the Docs–compatible frontmatter to a file if missing.
 */
function addFrontmatter(filePath, navOrder) {
  const content = fs.readFileSync(filePath, "utf8");

  // Skip if file already has frontmatter
  if (content.startsWith("---")) return;

  const relPath = path.relative(DOCS_DIR, filePath);
  const parts = relPath.split(path.sep);
  const baseName = path.basename(filePath, ".md");

  let title, parent;
  if (relPath.toLowerCase() === "index.md") {
    // Root index.md
    title = "React18 Loaders"; // or "Home"
  } else if (/^index$/i.test(baseName)) {
    // index.md inside a subfolder → use folder name as title
    title = capitalize(parts[parts.length - 2]);
    if (parts.length > 2) parent = capitalize(parts[parts.length - 3] || ""); // parent folder’s parent
  } else {
    // Regular file
    title = capitalize(baseName);
    if (parts.length > 1) {
      parent = capitalize(parts[parts.length - 2]);
    }
  }

  const frontmatter = `---
layout: default
title: ${title}
${parent ? `parent: ${parent}\n` : ""}nav_order: ${navOrder}
---

`;

  fs.writeFileSync(filePath, frontmatter + content, "utf8");
  console.log(`✅ Added frontmatter to: ${filePath}`);
}

function capitalize(str) {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Recursively process directory contents, sorting so:
 * 1. Files before directories
 * 2. index.md first among files
 * 3. Alphabetical order otherwise
 */
function processDir(dir, startOrder = 1) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.sort((e1, e2) => {
    if (e1.isFile() && !e2.isFile()) return -1;
    if (!e1.isFile() && e2.isFile()) return 1;

    if (e1.isFile() && e2.isFile()) {
      if (e1.name.toLowerCase() === "index.md") return -1;
      if (e2.name.toLowerCase() === "index.md") return 1;
    }

    return e1.name.localeCompare(e2.name, undefined, { sensitivity: "base" });
  });

  let order = startOrder;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isFile() && entry.name.endsWith(".md")) {
      addFrontmatter(fullPath, order++);
    } else if (entry.isDirectory()) {
      order = processDir(fullPath, order); // Continue order sequence
    }
  }

  return order;
}

processDir(DOCS_DIR);
