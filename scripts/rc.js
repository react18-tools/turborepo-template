const fs = require("fs");
const path = require("path");

const __dir = path.resolve(__dirname, "..");
const TEMPLATE_DIR = "scripts/templates/";

/**
 * @typedef {Object} InquirerDataType
 * @property {string} pkgPath - Target package path (e.g., "lib" or "packages/shared").
 * @property {string} name - Component name, possibly nested under subdirectories.
 * @property {boolean} isClient - Whether this is a client component (adds "use client" directive).
 * @property {boolean} createScss - Whether to create an accompanying `.module.scss` file.
 * @property {boolean} createTestStub - Whether to generate a test stub file.
 * @property {string} description - Description of the component to be added as a JSDoc comment.
 */

/**
 * Adds export entries to package.json for a given target directory.
 * @param {Object} pkgJSON - The parsed contents of package.json.
 * @param {string} target - Relative path inside the `src` directory (e.g., "client/button").
 * @param {InquirerDataType} data - Collected CLI prompt data.
 */
function createExportsEntry(pkgJSON, target, data) {
  const entry = {
    types: `./dist/${target}/index.d.ts`,
    import: `./dist/${target}/index.mjs`,
    require: `./dist/${target}/index.js`,
  };
  pkgJSON.exports = pkgJSON.exports ?? {};
  pkgJSON.exports[`./${target}`] = entry;
  pkgJSON.exports[`./dist/${target}`] = entry;

  if (data.createScss) {
    pkgJSON.exports[`./${target}/index.css`] = `./dist/${target}/index.css`;
    pkgJSON.exports[`./dist/${target}/index.css`] = `./dist/${target}/index.css`;
  }
}

/**
 * Ensures nested directories have `index.ts` files and proper exports.
 * @param {import('plop').ActionType[]} nestedRouteActions - Action array to be populated.
 * @param {string[]} rootSegments - Base path segments (e.g., `["lib", "src", "client"]`).
 * @param {string[]} currentDirSegments - Current nested path segments.
 * @param {InquirerDataType} data - CLI prompt data.
 * @param {Object} pkgJSON - Parsed package.json content.
 */
function updateIndexFilesIfNeeded(
  nestedRouteActions,
  rootSegments,
  currentDirSegments,
  data,
  pkgJSON,
) {
  const indexFilePath = path.resolve(__dir, ...rootSegments, ...currentDirSegments, "index.ts");
  const root = rootSegments.join("/");

  if (!fs.existsSync(indexFilePath)) {
    const content = `${data.isClient ? '"use client";\n' : ""}// ${currentDirSegments.join("/")} component exports\n`;
    const dirPath = `${root + currentDirSegments.join("/")}`;

    nestedRouteActions.push({
      type: "add",
      path: `${dirPath}/index.ts`,
      template: content,
    });

    const length = currentDirSegments.length;
    nestedRouteActions.push({
      type: "append",
      pattern: /(?<insertion> component exports)/,
      path: `${root + (length === 1 ? "" : `${currentDirSegments.slice(0, length - 1).join("/")}/`)}index.ts`,
      template: `export * from "./${currentDirSegments[length - 1]}"`,
    });

    createExportsEntry(pkgJSON, dirPath.split("src/")[1], data);
  }
}

/**
 * Converts a string to kebab-case format.
 * @param {string} str - Input string.
 * @returns {string} - Kebab-cased string.
 */
function toKebabCase(str) {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/ +/g, "-");
}

/**
 * Initializes root-level files and exports for the target package.
 * @param {InquirerDataType} data - CLI input values.
 * @param {Object} pkgJSON - Parsed package.json.
 * @returns {{nestedRouteActions: import('plop').ActionType[], root: string}}
 */
function createRootIndexAndDeclarations(data, pkgJSON) {
  const nestedRouteActions = [];
  const { isClient } = data;
  const srcDir = path.resolve(__dir, `${data.pkgPath}/src`);
  const [banner, target] = isClient ? ['"use client";\n\n', "client"] : ["", "server"];
  const root = `${data.pkgPath}/src/${target}/`;

  // Create src/index.ts
  if (!fs.existsSync(path.resolve(srcDir, "index.ts"))) {
    nestedRouteActions.push({
      type: "add",
      path: `${data.pkgPath}/src/index.ts`,
      template: `${banner}export * from "./${target}";\n`,
    });

    pkgJSON.exports = {
      ".": {
        types: "./dist/index.d.ts",
        import: "./dist/index.mjs",
        require: "./dist/index.js",
      },
      ...(data.createScss
        ? {
            "./index.css": "./dist/index.css",
            "./dist/index.css": "./dist/index.css",
            "./styles": "./dist/index.css",
            "./css": "./dist/index.css",
          }
        : {}),
    };
  }

  // Create src/declaration.d.ts
  if (!fs.existsSync(path.resolve(srcDir, "declaration.d.ts"))) {
    nestedRouteActions.push({
      type: "add",
      path: `${data.pkgPath}/src/declaration.d.ts`,
      template: 'declare module "*.module.css";\ndeclare module "*.module.scss";\n',
    });
  }

  // Create src/client|server/index.ts
  if (!fs.existsSync(path.resolve(__dir, root, "index.ts"))) {
    nestedRouteActions.push({
      type: "add",
      path: `${root}index.ts`,
      template: `${banner}/**\n * Server and client components must be exported from separate files.\n * This ensures correct behavior of the "use client" directive.\n */\n\n// ${target} component exports\n`,
    });
    createExportsEntry(pkgJSON, target, data);
  }

  return { nestedRouteActions, root };
}

/**
 * Generates directory structure and nested index files.
 * @param {InquirerDataType} data
 * @param {Object} pkgJSON
 * @returns {{nestedRouteActions: import('plop').ActionType[], parentDir: string}}
 */
function getNestedRouteActions(data, pkgJSON) {
  const name = data.name.replace(/\/+/g, "/").replace(/\/$/, "").trim();
  const { nestedRouteActions, root } = createRootIndexAndDeclarations(data, pkgJSON);

  if (!name.includes("/")) return { nestedRouteActions, parentDir: root };

  const lastSlashInd = name.lastIndexOf("/") || name.lastIndexOf("\\");
  data.name = name.slice(lastSlashInd + 1);

  const directories = toKebabCase(name.slice(0, lastSlashInd)).split(/\/|\\/);
  const rootSegments = [...root.split(/\/|\\/)];

  for (let i = 1; i <= directories.length; i++) {
    updateIndexFilesIfNeeded(
      nestedRouteActions,
      rootSegments,
      directories.slice(0, i),
      data,
      pkgJSON,
    );
  }

  return { nestedRouteActions, parentDir: `${root + directories.join("/")}/` };
}

/**
 * Adds or updates the component-level index file.
 * @param {InquirerDataType} data
 * @param {string} parentDir
 * @param {Object} pkgJSON
 * @returns {import('plop').ActionType}
 */
function getIndexAction(data, parentDir, pkgJSON) {
  const dirPath = path.resolve(__dir, parentDir, toKebabCase(data.name));
  const indFilePath = path.resolve(dirPath, "index.ts");

  if (fs.existsSync(indFilePath)) {
    return {
      type: "append",
      pattern: /(?<insertion> component exports)/,
      path: `${parentDir}{{kebabCase name}}/index.ts`,
      template: 'export * from "./{{kebabCase name}}";',
    };
  }

  createExportsEntry(pkgJSON, dirPath.split("src")[1].slice(1).replace(/\\/g, "/"), data);

  return {
    type: "add",
    path: `${parentDir}{{kebabCase name}}/index.ts`,
    template: `${data.isClient ? '"use client";\n\n' : ""}// component exports\nexport * from "./{{kebabCase name}}";\n`,
  };
}

/**
 * Main generator logic – builds all actions for Plop.
 * @param {InquirerDataType} data
 * @returns {import('plop').ActionType[]}
 */
function getActions(data) {
  const packageJSONPath = path.resolve(__dirname, "..", data.pkgPath, "package.json");
  const pkgJSON = JSON.parse(fs.readFileSync(packageJSONPath, "utf8"));
  const { nestedRouteActions, parentDir } = getNestedRouteActions(data, pkgJSON);
  const indexAction = getIndexAction(data, parentDir, pkgJSON);

  fs.writeFileSync(packageJSONPath, JSON.stringify(pkgJSON, null, 2) + "\n");

  const filesActions = [];

  if (data.createScss) {
    filesActions.push({
      type: "add",
      path: `${parentDir}{{kebabCase name}}/{{kebabCase name}}.tsx`,
      templateFile: `${TEMPLATE_DIR}component.hbs`,
    });
    filesActions.push({
      type: "add",
      path: `${parentDir}{{kebabCase name}}/{{kebabCase name}}.module.scss`,
      templateFile: `${TEMPLATE_DIR}component.module.hbs`,
    });
  } else {
    filesActions.push({
      type: "add",
      path: `${parentDir}{{kebabCase name}}/{{kebabCase name}}.tsx`,
      templateFile: `${TEMPLATE_DIR}component-noscss.hbs`,
    });
  }

  if (data.createTestStub) {
    filesActions.push({
      type: "add",
      path: `${parentDir}{{kebabCase name}}/{{kebabCase name}}.test.tsx`,
      templateFile: `${TEMPLATE_DIR}component.test.hbs`,
    });
  }

  return nestedRouteActions.concat([
    indexAction,
    ...filesActions,
    {
      type: "append",
      pattern: /(?<insertion> component exports)/,
      path: `${parentDir}index.ts`,
      template: 'export * from "./{{kebabCase name}}";',
    },
  ]);
}

/**
 * Plop generator configuration for adding React components.
 */
module.exports = {
  description: "Scaffold a new React component inside the selected package.",
  prompts: [
    {
      type: "list",
      name: "pkgPath",
      choices: ["lib", "packages/shared"],
      default: "lib",
      message: "Choose the target package:",
    },
    {
      type: "input",
      name: "name",
      message: "Enter component name (with optional nested path):",
    },
    {
      type: "confirm",
      name: "isClient",
      message: 'Is this a client component? (Adds `"use client"` directive)',
    },
    {
      type: "confirm",
      name: "createScss",
      message: "Do you want to create a .module.scss file?",
      default: true,
    },
    {
      type: "confirm",
      name: "createTestStub",
      message: "Should we include a unit test file?",
      default: true,
    },
    {
      type: "input",
      name: "description",
      message: "Provide a brief description (used in JSDoc comment):",
    },
  ],
  actions: data => (data ? getActions(data) : []),
};
