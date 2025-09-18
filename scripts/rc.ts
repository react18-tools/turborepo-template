import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ActionType } from "plop";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
interface InquirerDataType {
  pkgPath: string;
  name: string;
  isClient: boolean;
  createScss: boolean;
  createTestStub: boolean;
  description: string;
}

/**
 * Ensures nested directories have `index.ts` files and proper exports.
 * @param nestedRouteActions - Action array to be populated.
 * @param rootSegments - Base path segments (e.g., `["lib", "src", "client"]`).
 * @param currentDirSegments - Current nested path segments.
 * @param data - CLI prompt data.
 * @param pkgJSON - Parsed package.json content.
 */
function updateIndexFilesIfNeeded(
  nestedRouteActions: ActionType[],
  rootSegments: string[],
  currentDirSegments: string[],
  data: InquirerDataType,
) {
  const indexFilePath = path.resolve(
    __dir,
    ...rootSegments,
    ...currentDirSegments,
    "index.ts",
  );
  const root = rootSegments.join("/");

  if (!fs.existsSync(indexFilePath)) {
    const content = `${data.isClient ? '"use client";\n' : ""}// ${currentDirSegments.join(
      "/",
    )} component exports\n`;
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
        root +
        (length === 1
          ? ""
          : `${currentDirSegments.slice(0, length - 1).join("/")}/`)
      }index.ts`,
      template: `export * from "./${currentDirSegments[length - 1]}"`,
    });
  }
}

/**
 * Converts a string to kebab-case format.
 * @param str - Input string.
 * @returns - Kebab-cased string.
 */
function toKebabCase(str: string): string {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/ +/g, "-");
}

/**
 * Initializes root-level files and exports for the target package.
 * @param data - CLI input values.
 * @param pkgJSON - Parsed package.json.
 * @returns
 */
function createRootIndexAndDeclarations(data: InquirerDataType): {
  nestedRouteActions: ActionType[];
  root: string;
} {
  const nestedRouteActions: ActionType[] = [];
  const { isClient } = data;
  const srcDir = path.resolve(__dir, `${data.pkgPath}/src`);
  const [banner, target] = isClient
    ? ['"use client";\n\n', "client"]
    : ["", "server"];
  const root = `${data.pkgPath}/src/${target}/`;

  // Create src/index.ts
  if (!fs.existsSync(path.resolve(srcDir, "index.ts"))) {
    nestedRouteActions.push({
      type: "add",
      path: `${data.pkgPath}/src/index.ts`,
      template: `${banner}export * from "./${target}";\n`,
    });
  }

  // Create src/declaration.d.ts
  if (!fs.existsSync(path.resolve(srcDir, "declaration.d.ts"))) {
    nestedRouteActions.push({
      type: "add",
      path: `${data.pkgPath}/src/declaration.d.ts`,
      template:
        'declare module "*.module.css";\ndeclare module "*.module.scss";\n',
    });
  }

  // Create src/client|server/index.ts
  if (!fs.existsSync(path.resolve(__dir, root, "index.ts"))) {
    nestedRouteActions.push({
      type: "add",
      path: `${root}index.ts`,
      template: `${banner}/**\n * Server and client components must be exported from separate files.\n * This ensures correct behavior of the "use client" directive.\n */\n\n// ${target} component exports\n`,
    });
  }

  return { nestedRouteActions, root };
}

/**
 * Generates directory structure and nested index files.
 * @param data
 * @param pkgJSON
 * @returns
 */
function getNestedRouteActions(data: InquirerDataType): {
  nestedRouteActions: ActionType[];
  parentDir: string;
} {
  const name = data.name.replace(/\/+/g, "/").replace(/\/$/, "").trim();
  const { nestedRouteActions, root } = createRootIndexAndDeclarations(data);

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
    );
  }

  return { nestedRouteActions, parentDir: `${root + directories.join("/")}/` };
}

/**
 * Adds or updates the component-level index file.
 * @param data
 * @param parentDir
 * @param pkgJSON
 * @returns
 */
function getIndexAction(data: InquirerDataType, parentDir: string): ActionType {
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

  return {
    type: "add",
    path: `${parentDir}{{kebabCase name}}/index.ts`,
    template: `${
      data.isClient ? '"use client";\n\n' : ""
    }// component exports\nexport * from "./{{kebabCase name}}";\n`,
  };
}

/**
 * Main generator logic – builds all actions for Plop.
 * @param data
 * @returns
 */
function getActions(data: InquirerDataType): ActionType[] {
  const { nestedRouteActions, parentDir } = getNestedRouteActions(data);
  const indexAction = getIndexAction(data, parentDir);

  const filesActions: ActionType[] = [];

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
      // @ts-expect-error -- improper type
      pattern: /(?<insertion> component exports)/,
      path: `${parentDir}index.ts`,
      template: 'export * from "./{{kebabCase name}}";',
    },
  ]);
}

/**
 * Plop generator configuration for adding React components.
 */
export default {
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
  actions: (data: InquirerDataType) => (data ? getActions(data) : []),
};
