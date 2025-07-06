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
 * create exports entry
 */
function createExportsEntry(pkgJSON, target) {
  const entry = {
    types: `./dist/${target}/index.d.ts`,
    import: `./dist/${target}/index.mjs`,
    require: `./dist/${target}/index.js`,
  };
  pkgJSON.exports[`./${target}`] = entry;
  pkgJSON.exports[`./dist/${target}`] = entry;
  pkgJSON.exports[`./${target}/index.css`] = `./dist/${target}/index.css`;
  pkgJSON.exports[`./dist/${target}/index.css`] = `./dist/${target}/index.css`;
}

/**
 * Updates index files if needed based on the provided parameters.
 * @param {import('plop').ActionType} nestedRouteActions - Nested route actions.
 * @param {string[]} rootSegments - Root segments.
 * @param {string[]} currentDirSegments - Current directory segments.
 * @param {InquirerDataType} data - Input data.
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
    const content =
      `${data.isClient ? '"use client";\n' : ""}// ${currentDirSegments.join("/")}` +
      " component exports\n";
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
      path: `${
        root + (length === 1 ? "" : `${currentDirSegments.slice(0, length - 1).join("/")}/`)
      }index.ts`,
      template: `export * from "./${currentDirSegments[length - 1]}"`,
    });
    // update exports
    createExportsEntry(pkgJSON, dirPath.split("src/")[1]);
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
 * createRootIndexAndDeclarations if not present.
 * @param {InquirerDataType} data - Input data.
 */
function createRootIndexAndDeclarations(data, pkgJSON) {
  const nestedRouteActions = [];
  const { isClient } = data;
  const srcDir = path.resolve(__dir, `${data.pkgPath}/src`);
  const [banner, target] = isClient ? ['"use client";\n\n', "client"] : ["", "server"];
  const root = `${data.pkgPath}/src/${target}/`;

  /** Create index.ts in src directory if not present.  */
  if (!fs.existsSync(path.resolve(srcDir, "index.ts"))) {
    nestedRouteActions.push({
      type: "add",
      path: `${data.pkgPath}/src/index.ts`,
      template: `${banner}export * from "./${target}";\n`,
    });
    // Create entry in package.json exports field
    pkgJSON.exports = {
      ".": {
        types: "./dist/index.d.ts",
        import: "./dist/index.mjs",
        require: "./dist/index.js",
      },
      "./index.css": "./dist/index.css",
      "./dist/index.css": "./dist/index.css",
      "./styles": "./dist/index.css",
      "./css": "./dist/index.css",
    };
  }
  /** Create declaration if not present.  */
  if (!fs.existsSync(path.resolve(srcDir, "declaration.d.ts")))
    nestedRouteActions.push({
      type: "add",
      path: `${data.pkgPath}/src/declaration.d.ts`,
      template: 'declare module "*.module.css";\ndeclare module "*.module.scss";\n',
    });

  /** Create index.ts in src/client or src/server directory if not present.  */
  if (!fs.existsSync(path.resolve(__dir, root, "index.ts"))) {
    nestedRouteActions.push({
      type: "add",
      path: `${root}index.ts`,
      template: `${banner}/**\n * Server components and client components need to be exported from separate files as\n * directive on top of the file from which component is imported takes effect.\n * i.e., server component re-exported from file with "use client" will behave as client component\n */\n\n// ${target} component exports\n`,
    });
    createExportsEntry(pkgJSON, target);
  }

  return { nestedRouteActions, root };
}

/**
 * Gets nested route actions based on the provided data.
 * @param {InquirerDataType} data - Input data.
 * @returns {Object} Nested route actions and parent directory.
 */
function getNestedRouteActions(data, pkgJSON) {
  const name = data.name.replace(/\/+/g, "/").replace(/\/$/, "").trim();
  const { nestedRouteActions, root } = createRootIndexAndDeclarations(data, pkgJSON);

  if (!name.includes("/")) return { nestedRouteActions, parentDir: root };

  const lastSlashInd = name.lastIndexOf("/") || name.lastIndexOf("\\");
  data.name = name.slice(lastSlashInd + 1);

  const directories = toKebabCase(name.slice(0, lastSlashInd)).split(/\/|\\/);
  const rootSegments = [...root.split(/\/|\\/)];

  for (let i = 1; i <= directories.length; i++)
    updateIndexFilesIfNeeded(
      nestedRouteActions,
      rootSegments,
      directories.slice(0, i),
      data,
      pkgJSON,
    );

  return { nestedRouteActions, parentDir: `${root + directories.join("/")}/` };
}

/**
 * Gets the index action based on the provided data and parent directory.
 * @param {InquirerDataType} data - Input data.
 * @param {string} parentDir - Parent directory.
 * @returns {Object} Index action.
 */
function getIndexAction(data, parentDir, pkgJSON) {
  const dirPath = path.resolve(__dir, parentDir, toKebabCase(data.name));
  console.log("dirpath --- ", dirPath);
  const indFilePath = path.resolve(dirPath, "index.ts");
  if (fs.existsSync(indFilePath))
    return {
      type: "append",
      pattern: /(?<insertion> component exports)/,
      path: `${parentDir}{{kebabCase name}}/index.ts`,
      template: 'export * from "./{{kebabCase name}}";',
    };
  // add exports if file did not exists
  createExportsEntry(pkgJSON, dirPath.split("src")[1].slice(1).replace(/\\/g, "/"));
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
  const packageJSONPath = path.resolve(__dirname, "..", data.pkgPath, "package.json");
  const pkgJSON = JSON.parse(fs.readFileSync(packageJSONPath, "utf8"));
  const { nestedRouteActions, parentDir } = getNestedRouteActions(data, pkgJSON);

  const indexAction = getIndexAction(data, parentDir, pkgJSON);

  fs.writeFileSync(packageJSONPath, JSON.stringify(pkgJSON, null, 2) + "\n");

  return nestedRouteActions.concat([
    indexAction,
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
