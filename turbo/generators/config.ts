import fs from "node:fs";
import path from "node:path";
import type { PlopTypes } from "@turbo/gen";

interface InquirerDataType {
  isClient: boolean;
  name: string;
}

function updateIndexFilesIfNeeded(
  nestedRouteActions: PlopTypes.ActionType[],
  rootSegments: string[],
  currentDirSegments: string[],
  isClient: boolean,
) {
  const indexFilePath = path.resolve(
    __dirname,
    "..",
    "..",
    ...rootSegments,
    ...currentDirSegments,
    "index.ts",
  );
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

function toKebabCase(str: string) {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/ +/g, "-");
}

function getNestedRouteActions(data: InquirerDataType) {
  const { isClient } = data;
  // remove multiple '/' and trailing '/' if any
  const name = data.name.replace(/\/+/g, "/").replace(/\/$/, "").trim();

  const root = `lib/src/${isClient ? "client/" : "server/"}`;
  const nestedRouteActions: PlopTypes.ActionType[] = [];

  if (!fs.existsSync(path.resolve(__dirname, "..", "..", root, "index.ts"))) {
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

function getIndexAction(data: InquirerDataType, parentDir: string) {
  const indFilePath = path.resolve(
    __dirname,
    "..",
    "..",
    parentDir,
    toKebabCase(data.name),
    "index.ts",
  );
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

function getActions(data: InquirerDataType) {
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

export default function generator(plop: PlopTypes.NodePlopAPI): void {
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
    actions: data => (data ? getActions(data as InquirerDataType) : []),
  });
}
