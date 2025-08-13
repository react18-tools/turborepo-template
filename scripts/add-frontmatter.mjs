/**
 * Enhance TypeDoc-generated Markdown files with Just the Docs frontmatter.
 *
 * Key Features:
 * - Creates missing `index.md` for each folder (except root) with a TOC.
 * - Adds correct `parent` for hierarchical navigation.
 * - Sequential `nav_order` across the entire documentation tree.
 * - Root-level files and folders appear as top-level items (no nesting under Home).
 * - Skips overwriting files that already have frontmatter.
 *
 * Author: Mayank Chaudhari style, refactored for clarity & maintainability
 */

import fs from "fs";
import path from "path";

// Root folder where TypeDoc markdown output exists
const DOCS_DIR = "./docs";

/**
 * Prettify a string:
 * - Replace hyphens/underscores with spaces
 * - Capitalize first letter of each word
 * @param {string} str
 * @returns {string}
 */
function prettify(str) {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Writes frontmatter to a markdown file if missing.
 *
 * @param {string} filePath - Full file path
 * @param {number} navOrder - Navigation order for Just the Docs
 * @param {string} parent - Parent page title, if applicable
 * @param {boolean} isIndex - Whether the file is an index.md
 */
function addFrontmatter(filePath, navOrder, parent = "", isIndex = false) {
  const content = fs.readFileSync(filePath, "utf8");

  // Skip files with existing frontmatter
  if (content.startsWith("---")) return;

  const baseName = path.basename(filePath, ".md");
  let title;

  if (filePath === path.join(DOCS_DIR, "index.md")) {
    // Root index.md → Home page
    title = "Home";
  } else if (isIndex) {
    // Folder's index page → folder name
    title = prettify(path.basename(path.dirname(filePath)));
  } else {
    // Regular file → file name
    title = prettify(baseName);
  }

  const fmLines = [
    "---",
    "layout: default",
    `title: ${title}`,
    parent ? `parent: ${parent}` : "",
    `nav_order: ${navOrder}`,
    // has_children only if it's not root index
    isIndex && filePath !== path.join(DOCS_DIR, "index.md") ? "has_children: true" : "",
    "---",
    "",
  ].filter(Boolean);

  fs.writeFileSync(filePath, fmLines.join("\n") + "\n" + content, "utf8");
}

/**
 * Creates an index.md for a folder if missing.
 * Excludes root folder from this behavior to avoid "Home" nesting.
 *
 * @param {string} dir - Folder path
 * @param {number} navOrder - Navigation order
 * @param {string} parent - Parent title (empty for root-level folders)
 * @returns {string} The title of this folder for child items to reference
 */
function ensureIndexMd(dir, navOrder, parent = "") {
  const isRoot = dir === DOCS_DIR;
  const indexPath = path.join(dir, "index.md");

  if (!fs.existsSync(indexPath) && !isRoot) {
    const title = prettify(path.basename(dir));

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    const fileLinks = entries
      .filter(e => e.isFile() && e.name.endsWith(".md") && e.name.toLowerCase() !== "index.md")
      .map(e => `- [${prettify(path.basename(e.name, ".md"))}](${e.name})`);

    const folderLinks = entries
      .filter(e => e.isDirectory())
      .map(e => `- [${prettify(e.name)}](${e.name}/)`);

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
  }

  return isRoot ? "" : prettify(path.basename(dir));
}

/**
 * Recursively processes the documentation folder.
 *
 * Rules:
 * - Root index.md → Home (no has_children, no parent)
 * - Root-level folders → top-level sections (no parent)
 * - Subfolders → nested under their parent
 *
 * @param {string} dir - Directory path
 * @param {number} startOrder - Starting nav_order
 * @param {string} parent - Parent title
 * @returns {number} - Next available nav_order after processing this directory
 */
function processDir(dir, startOrder = 1, parent = "") {
  let order = startOrder;
  const isRoot = dir === DOCS_DIR;

  // Ensure folder has index.md if not root
  const currentTitle = ensureIndexMd(dir, order, isRoot ? "" : parent);
  if (!isRoot) order++;

  // Sort entries: files first (index.md first), then directories
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => {
    if (a.isFile() && !b.isFile()) return -1;
    if (!a.isFile() && b.isFile()) return 1;
    if (a.isFile() && b.isFile()) {
      if (a.name.toLowerCase() === "index.md") return -1;
      if (b.name.toLowerCase() === "index.md") return 1;
    }
    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isFile() && entry.name.endsWith(".md")) {
      const isIndex = entry.name.toLowerCase() === "index.md";
      addFrontmatter(fullPath, order++, isRoot ? "" : currentTitle, isIndex);
    } else if (entry.isDirectory()) {
      // Root folders have no parent
      order = processDir(fullPath, order, isRoot ? "" : currentTitle);
    }
  }

  return order;
}

function flattenDirs(rootDir) {
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });

  if (entries.length < 2) return;

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);

    if (entry.isDirectory()) {
      // Recursively flatten the subdirectory first
      flattenDirs(fullPath);

      // Move all files in subdir to rootDir
      const subEntries = fs.readdirSync(fullPath, { withFileTypes: true });
      for (const subEntry of subEntries) {
        const src = path.join(fullPath, subEntry.name);
        const dest = path.join(rootDir, subEntry.name);
        fs.renameSync(src, dest);
      }

      // Remove the now-empty subdirectory
      fs.rmdirSync(fullPath);
    }
  }
}

// flatten docs output
flattenDirs(DOCS_DIR);

// Run script
processDir(DOCS_DIR);
