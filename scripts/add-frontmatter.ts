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

import fs from "node:fs";
import path from "node:path";

// Root folder where TypeDoc markdown output exists
const DOCS_DIR = "./docs";

/**
 * Prettify a string:
 * - Replace hyphens/underscores with spaces
 * - Capitalize first letter of each word
 * @param {string} str
 * @returns {string}
 */
function prettify(str: string) {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Writes frontmatter to a markdown file if missing.
 *
 * @param {string} filePath - Full file path
 * @param {number} navOrder - Navigation order for Just the Docs
 * @param {string} parent - Parent page title, if applicable
 * @param {boolean} isIndex - Whether the file is an index.md
 */
function addFrontmatter(filePath: string, navOrder: number, parent = "") {
  const content = fs.readFileSync(filePath, "utf8");

  // Skip files with existing frontmatter
  if (content.startsWith("---")) return;

  const baseName = path.basename(filePath, ".md");
  let title: string;

  if (filePath === path.join(DOCS_DIR, "index.md")) {
    // Root index.md → Home page
    title = "Home";
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
    "---",
    "",
  ].filter(Boolean);

  fs.writeFileSync(filePath, `${fmLines.join("\n")}\n\n${content}`, "utf8");
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
function ensureIndexMd(dir: string, navOrder: number, parent = "") {
  const isRoot = dir === DOCS_DIR;
  const indexPath = path.join(dir, "index.md");

  if (!fs.existsSync(indexPath) && !isRoot) {
    const title = prettify(path.basename(dir));

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
function processDir(dir: string, startOrder = 1, parent = "") {
  let order = startOrder;
  const isRoot = dir === DOCS_DIR;

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

  // Ensure folder has index.md if not root
  const currentTitle =
    !isRoot && entries.length === 1
      ? prettify(parent)
      : ensureIndexMd(dir, order, isRoot ? "" : parent);
  if (!isRoot) order++;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isFile() && entry.name.endsWith(".md")) {
      addFrontmatter(fullPath, order++, isRoot ? "" : currentTitle);
    } else if (entry.isDirectory()) {
      // Root folders have no parent
      order = processDir(fullPath, order, isRoot ? "" : currentTitle);
    }
  }

  return order;
}

// const ModuleTitle = "\n## Modules\n";
// const rootMdFile = path.resolve(DOCS_DIR, "README.md");
// let [staticPart, moduleIndex] = fs.readFileSync(rootMdFile, "utf8").split(ModuleTitle);

// function flattenDirs(dir, parent = "") {
//   const entries = fs.readdirSync(dir, { withFileTypes: true });
//   for (const entry of entries) {
//     const fullPath = path.join(dir, entry.name);
//     if (entry.isDirectory()) {
//       // Recursively flatten the subdirectory first
//       flattenDirs(fullPath, dir);
//     }
//   }

//   if (entries.length === 1 && parent) {
//     try {
//       // to avoid clash when parent directory has same name.
//       const src = path.resolve(dir, entries[0].name);
//       const uuid = crypto.randomUUID();
//       const dest = path.resolve(parent, entries[0].name);
//       const dest1 = dest + uuid;
//       fs.renameSync(src, dest1);
//       fs.rmdirSync(path.resolve(dir));
//       fs.renameSync(dest1, dest);
//       moduleIndex = moduleIndex.replaceAll(
//         `(${path.relative(DOCS_DIR, src).replaceAll(path.sep, "/")})`,
//         `(${path.relative(DOCS_DIR, dest).replaceAll(path.sep, "/")})`,
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   }
// }

// flatten docs output
// flattenDirs(DOCS_DIR);
// fs.writeFileSync(rootMdFile, [staticPart, moduleIndex].join(ModuleTitle));
fs.renameSync(
  path.resolve(DOCS_DIR, "README.md"),
  path.resolve(DOCS_DIR, "index.md"),
);

// Run script
processDir(DOCS_DIR);
