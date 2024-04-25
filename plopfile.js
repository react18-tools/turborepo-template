const fs = require("fs");
const path = require("path");

/**
 * @typedef {Object} InquirerDataType
 * @property {boolean} isClient - Whether we want to create client component. I.e., add "use client" or not
 * @property {string} name - Component name along with relative path --- TODO
 */

function updateIndexFilesIfNeeded(
  /** @type {import('plop').ActionType} */
  nestedRouteActions,
  /** @type {[string]} */
  rootSegments,
  /** @type {[string]} */
  currentDirSegments,
  /** @type {boolean} */
  isClient,
) {
  const indexFilePath = path.resolve(__dirname, ...rootSegments, ...currentDirSegments, "index.ts");
  const root = rootSegments.join("/");
  if (!fs.existsSync(indexFilePath)) {
    const content = `${isClient ? '"use client";\n' : ""}// ${currentDirSegments.join(
      "/",
    )} component exports\n`;
    nestedRouteActions.push({
      type: "add",
      path: `${root + currentDirSegments.join("/")}/index.ts`,
      template: content,
    });
    const length = currentDirSegments.length;
    nestedRouteActions.push({
      type: "append",
      // pattern: /(?<insertion> component exports)/g,
      path: `${
        root + (length === 1 ? "" : `${currentDirSegments.slice(0, length - 1).join("/")}/`)
      }index.ts`,
      template: `export * from "./${currentDirSegments[length - 1]}"`,
    });
  }
}

/**
 *
 * @param {string} str
 * @returns {string} string in kebab-case
 */
function toKebabCase(str) {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/ +/g, "-");
}

/**
 *
 * @param {InquirerDataType} data
 * @returns
 */
function getNestedRouteActions(data) {
  const { isClient } = data;
  // remove multiple '/' and trailing '/' if any
  const name = data.name.replace(/\/+/g, "/").replace(/\/$/, "").trim();

  const root = `lib/src/${isClient ? "client/" : "server/"}`;
  /** @type {[import('plop').ActionType]} */
  const nestedRouteActions = [];

  if (!fs.existsSync(path.resolve(__dirname, root, "index.ts"))) {
    nestedRouteActions.push({
      type: "add",
      path: `${root}index.ts`,
      template: `${isClient ? '"use client";\n\n' : ""}/**
 * need to export server components and client components from separate files as
 * directive on top of the file from which component is imported takes effect.
 * i.e., server component re-exported from file with "use client" will behave as client component
 * */

// ${isClient ? "client" : "server"} component exports\n`,
    });
  }

  /** Return early if no nested routes */
  if (!name.includes("/")) return { nestedRouteActions, parentDir: root };

  const lastSlashInd = name.lastIndexOf("/") || name.lastIndexOf("\\");
  /** following is required to make sure appropreate name is used while creating components */
  data.name = name.slice(lastSlashInd + 1);

  const directories = toKebabCase(name.slice(0, lastSlashInd)).split(/\/|\\/);
  const rootSegments = [...root.split(/\/|\\/)];

  for (let i = 1; i <= directories.length; i++)
    updateIndexFilesIfNeeded(nestedRouteActions, rootSegments, directories.slice(0, i), isClient);

  return { nestedRouteActions, parentDir: `${root + directories.join("/")}/` };
}

/**
 *
 * @param {InquirerDataType} data
 * @param {string} parentDir
 * @returns
 */
function getIndexAction(data, parentDir) {
  const indFilePath = path.resolve(__dirname, parentDir, toKebabCase(data.name), "index.ts");
  if (fs.existsSync(indFilePath))
    return {
      type: "append",
      path: `${parentDir}{{kebabCase name}}/index.ts`,
      template: 'export * from "./{{kebabCase name}}";',
    };
  return {
    type: "add",
    path: `${parentDir}{{kebabCase name}}/index.ts`,
    template: `${data.isClient ? '"use client";\n\n' : ""}export * from "./{{kebabCase name}}";\n`,
  };
}

/**
 *
 * @param {InquirerDataType} data
 * @returns
 */
function getActions(data) {
  const { nestedRouteActions, parentDir } = getNestedRouteActions(data);

  return nestedRouteActions.concat([
    getIndexAction(data, parentDir),
    {
      type: "add",
      path: `${parentDir}{{kebabCase name}}/{{kebabCase name}}.tsx`,
      templateFile: "templates/component.hbs",
    },
    {
      type: "add",
      path: `${parentDir}{{kebabCase name}}/{{kebabCase name}}.test.tsx`,
      templateFile: "templates/component.test.hbs",
    },
    {
      type: "add",
      path: `${parentDir}{{kebabCase name}}/{{kebabCase name}}.module.scss`,
      templateFile: "templates/component.module.hbs",
    },
    {
      type: "append",
      path: `${parentDir}index.ts`,
      template: 'export * from "./{{kebabCase name}}";',
    },
  ]);
}

/**
 *
 * @param {import('plop').NodePlopAPI} plop
 */
function generator(plop) {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator("lib-rc", {
    description: "Adds a new React component to the lib directory",
    prompts: [
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
  });
}

module.exports = generator;
