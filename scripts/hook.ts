import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ActionType } from "plop";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const __dir = path.resolve(__dirname, "..");
const TEMPLATE_DIR = "scripts/templates/";

interface InquirerDataType {
  pkgPath: string;
  name: string;
  description: string;
}

/**
 * Gets actions based on the provided data.
 * @param data - Input data.
 * @returns Actions.
 */
function getActions(data: InquirerDataType): ActionType[] {
  const actions: ActionType[] = [];
  if (
    !fs.existsSync(path.resolve(__dir, `${data.pkgPath}/src/hooks`, "index.ts"))
  ) {
    actions.push({
      type: "add",
      path: `${data.pkgPath}/src/hooks/index.ts`,
      template: '// hooks exports\nexport * from "./{{kebabCase name}}";',
    });
  } else {
    actions.push({
      type: "append",
      pattern: /(?<insertion> hooks exports)/,
      path: `${data.pkgPath}/src/hooks/index.ts`,
      template: 'export * from "./{{kebabCase name}}";',
    });
  }

  ["", ".test"].forEach((suffix) => {
    actions.push({
      type: "add",
      path: `${data.pkgPath}/src/hooks/{{kebabCase name}}${suffix}.ts`,
      templateFile: `${TEMPLATE_DIR}hook${suffix}.hbs`,
    });
  });

  return actions;
}

export default {
  description: "Add a new React hook.",
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
      message: "What is the name of the hook?",
    },
    {
      type: "input",
      name: "description",
      message:
        "Describe your custom hook. (This will be added as js-doc comment.)",
    },
  ],
  actions: (data: InquirerDataType) => (data ? getActions(data) : []),
};
