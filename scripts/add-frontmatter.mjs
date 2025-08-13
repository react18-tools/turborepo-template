/**
 * Script to add Just the Docs–compatible frontmatter to all Markdown files,
 * auto-create missing index.md with TOC, and set correct parent relationships.
 *
 * Special rules:
 * - Root index.md title is "Home" (no parent)
 * - Files in root have no parent
 * - Subfolder index.md has parent = parent folder name (unless root)
 */

import fs from "fs";
import path from "path";

const DOCS_DIR = "./docs";

/** Capitalizes and prettifies a string (e.g., "foo_bar" → "Foo Bar") */
function capitalize(str) {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Adds frontmatter to a given Markdown file if missing.
 */
function addFrontmatter(filePath, navOrder, parent = "", isIndex = false) {
  const content = fs.readFileSync(filePath, "utf8");
  if (content.startsWith("---")) return;

  const baseName = path.basename(filePath, ".md");
  let title;

  if (filePath === path.join(DOCS_DIR, "index.md")) {
    title = "Home";
    parent = "";
  } else if (isIndex) {
    title = capitalize(path.basename(path.dirname(filePath)));
  } else {
    title = capitalize(baseName);
  }

  const fmLines = [
    "---",
    "layout: default",
    `title: ${title}`,
    parent && !isIndex ? `parent: ${parent}` : "",
    `nav_order: ${navOrder}`,
    isIndex ? "has_children: true" : "",
    "---",
  ].filter(Boolean);

  fs.writeFileSync(filePath, fmLines.join("\n") + "\n" + content, "utf8");
}

/**
 * Creates an index.md file if missing, with a TOC of the directory's contents.
 */
function ensureIndexMd(dir, navOrder, parent = "") {
  const indexPath = path.join(dir, "index.md");

  if (!fs.existsSync(indexPath)) {
    let title;
    if (dir === DOCS_DIR) {
      title = "Home";
      parent = "";
    } else {
      title = capitalize(path.basename(dir));
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    const fileLinks = entries
      .filter(e => e.isFile() && e.name.endsWith(".md") && e.name.toLowerCase() !== "index.md")
      .map(e => `- [${capitalize(path.basename(e.name, ".md"))}](${e.name})`);

    const folderLinks = entries
      .filter(e => e.isDirectory())
      .map(e => `- [${capitalize(e.name)}](${e.name}/)`);

    const links = [...fileLinks, ...folderLinks].join("\n");

    const fmLines = [
      "---",
      "layout: default",
      `title: ${title}`,
      parent ? `parent: ${parent}` : "",
      `nav_order: ${navOrder}`,
      "has_children: true",
      "---",
      "",
      `# ${title}`,
      "",
      links || "_No pages yet._",
    ].filter(Boolean);

    fs.writeFileSync(indexPath, fmLines.join("\n"), "utf8");
    console.log(`📄 Created index.md in ${dir}`);
  }
}

/**
 * Recursively processes directories:
 * - Creates missing index.md
 * - Adds frontmatter to files
 * - Preserves sequential nav_order
 */
function processDir(dir, startOrder = 1, parent = "") {
  let order = startOrder;

  // Determine current folder's parent
  const isRoot = dir === DOCS_DIR;
  const currentTitle = isRoot ? "Home" : capitalize(path.basename(dir));

  // Ensure index.md exists first
  ensureIndexMd(dir, order, isRoot ? "" : parent);
  order++;

  // Sort files before directories, index.md first
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => {
    if (a.isFile() && !b.isFile()) return -1;
    if (!a.isFile() && b.isFile()) return 1;

    if (a.isFile() && b.isFile()) {
      if (a.name.toLowerCase() === "index.md") return -1;
      if (b.name.toLowerCase() === "index.md") return 1;
    }
    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });

  // Process files
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isFile() && entry.name.endsWith(".md")) {
      const isIndex = entry.name.toLowerCase() === "index.md";
      addFrontmatter(fullPath, order++, isRoot ? "" : currentTitle, isIndex);
    } else if (entry.isDirectory()) {
      order = processDir(fullPath, order, currentTitle);
    }
  }

  return order;
}

processDir(DOCS_DIR);
