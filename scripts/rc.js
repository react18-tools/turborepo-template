const fs = require("fs");
const path = require("path");

const __dir = path.resolve(__dirname, "..");
const TEMPLATE_DIR = "scripts/templates/";

/**
 * @typedef {Object} InquirerDataType
 * @property {boolean} isClient - Indicates whether a client component should be created.
 * @property {string} name - Component name along with the relative path from either the client or server directory.
 * @property {string} pkgPath - Package path.
 */

/**
 * Updates index files if needed based on the provided parameters.
 * @param {import('plop').ActionType} nestedRouteActions - Nested route actions.
 * @param {string[]} rootSegments - Root segments.
 * @param {string[]} currentDirSegments - Current directory segments.
 * @param {boolean} isClient - Indicates whether it's a client component.
 */
function updateIndexFilesIfNeeded(nestedRouteActions, rootSegments, currentDirSegments, isClient) {
  const indexFilePath = path.resolve(__dir, ...rootSegments, ...currentDirSegments, "index.ts");
  const root = rootSegments.join("/");
  if (!fs.existsSync(indexFilePath)) {
    const content =
      `${isClient ? '"use client";\n' : ""}// ${currentDirSegments.join("/")}` +
      " component exports\n";
    nestedRouteActions.push({
      type: "add",
      path: `${root + currentDirSegments.join("/")}/index.ts`,
      template: content,
    });
    const length = currentDirSegments.length;
    nestedRouteActions.push({
      type: "append",
      pattern: /(?<insertion> component exports)/,
      path: `${
        root + (length === 1 ? "" : `${currentDirSegments.slice(0, length - 1).join("/")}/`)
      }index.ts`,
      template: `export * from "./${currentDirSegments[length - 1]}"`,
    });
  }
}

/**
 * Converts a string to kebab-case.
 * @param {string} str - The input string.
 * @returns {string} The string in kebab-case.
 */
function toKebabCase(str) {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/ +/g, "-");
}

/**
 * Gets nested route actions based on the provided data.
 * @param {InquirerDataType} data - Input data.
 * @returns {Object} Nested route actions and parent directory.
 */
function getNestedRouteActions(data) {
  const { isClient } = data;
  const name = data.name.replace(/\/+/g, "/").replace(/\/$/, "").trim();
  const root = `${data.pkgPath}/src/${isClient ? "client/" : "server/"}`;
  const nestedRouteActions = [];

  /** Create index.ts in src directory if not present.  */
  if (!fs.existsSync(path.resolve(__dir, `${data.pkgPath}/src`, "index.ts"))) {
    nestedRouteActions.push({
      type: "add",
      path: `${data.pkgPath}/src/index.ts`,
      template: `${isClient ? '"use client";\n\n' : ""}export * from "./${isClient ? "client" : "server"}";\n`,
    });
  }

  /** Create declaration if not present.  */
  if (!fs.existsSync(path.resolve(__dir, `${data.pkgPath}/src`, "declaration.d.ts"))) {
    nestedRouteActions.push({
      type: "add",
      path: `${data.pkgPath}/src/declaration.d.ts`,
      template: 'declare module "*.module.css";\ndeclare module "*.module.scss";\n',
    });
  }

  /** Create index.ts in src/client or src/server directory if not present.  */
  if (!fs.existsSync(path.resolve(__dir, root, "index.ts"))) {
    nestedRouteActions.push({
      type: "add",
      path: `${root}index.ts`,
      template: `${isClient ? '"use client";\n\n' : ""}/**\n * Server components and client components need to be exported from separate files as\n * directive on top of the file from which component is imported takes effect.\n * i.e., server component re-exported from file with "use client" will behave as client component\n */\n\n// ${isClient ? "client" : "server"} component exports\n`,
    });
  }

  if (!name.includes("/")) return { nestedRouteActions, parentDir: root };

  const lastSlashInd = name.lastIndexOf("/") || name.lastIndexOf("\\");
  data.name = name.slice(lastSlashInd + 1);

  const directories = toKebabCase(name.slice(0, lastSlashInd)).split(/\/|\\/);
  const rootSegments = [...root.split(/\/|\\/)];

  for (let i = 1; i <= directories.length; i++)
    updateIndexFilesIfNeeded(nestedRouteActions, rootSegments, directories.slice(0, i), isClient);

  return { nestedRouteActions, parentDir: `${root + directories.join("/")}/` };
}

/**
 * Gets the index action based on the provided data and parent directory.
 * @param {InquirerDataType} data - Input data.
 * @param {string} parentDir - Parent directory.
 * @returns {Object} Index action.
 */
function getIndexAction(data, parentDir) {
  const indFilePath = path.resolve(__dir, parentDir, toKebabCase(data.name), "index.ts");
  if (fs.existsSync(indFilePath))
    return {
      type: "append",
      pattern: /(?<insertion> component exports)/,
      path: `${parentDir}{{kebabCase name}}/index.ts`,
      template: 'export * from "./{{kebabCase name}}";',
    };
  return {
    type: "add",
    path: `${parentDir}{{kebabCase name}}/index.ts`,
    template: `${data.isClient ? '"use client";\n\n' : ""}// component exports\nexport * from "./{{kebabCase name}}";\n`,
  };
}

/**
 * Gets actions based on the provided data.
 * @param {InquirerDataType} data - Input data.
 * @returns {Array} Actions.
 */
function getActions(data) {
  const { nestedRouteActions, parentDir } = getNestedRouteActions(data);

  return nestedRouteActions.concat([
    getIndexAction(data, parentDir),
    {
      type: "add",
      path: `${parentDir}{{kebabCase name}}/{{kebabCase name}}.tsx`,
      templateFile: `${TEMPLATE_DIR}component.hbs`,
    },
    {
      type: "add",
      path: `${parentDir}{{kebabCase name}}/{{kebabCase name}}.test.tsx`,
      templateFile: `${TEMPLATE_DIR}component.test.hbs`,
    },
    {
      type: "add",
      path: `${parentDir}{{kebabCase name}}/{{kebabCase name}}.module.scss`,
      templateFile: `${TEMPLATE_DIR}component.module.hbs`,
    },
    {
      type: "append",
      pattern: /(?<insertion> component exports)/,
      path: `${parentDir}index.ts`,
      template: 'export * from "./{{kebabCase name}}";',
    },
  ]);
}

/** Export rc generator */
module.exports = {
  description: "Adds a new React component to the selected package.",
  prompts: [
    {
      type: "list",
      name: "pkgPath",
      choices: ["lib", "packages/shared"],
      default: "lib",
      message: "Select the package",
    },
    {
      type: "input",
      name: "name",
      message: "What is the name of the component?",
    },
    {
      type: "confirm",
      name: "isClient",
      message: 'Is this a client component? (Should we add "use client" directive?)',
    },
    {
      type: "input",
      name: "description",
      message: "Describe your component. (This will be added as js-doc comment.)",
    },
  ],
  actions: data => (data ? getActions(data) : []),
};
