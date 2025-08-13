/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  tsconfig: "tsconfig.docs.json",
  name: "React18 Loaders",
  entryPoints: ["./lib/src"],
  exclude: ["**/*.test.tsx", "**/index.ts", "**/declaration.d.ts"],
  entryPointStrategy: "Expand",
  out: "./docs",
  commentStyle: "all",
  searchInComments: true,
  excludeExternals: true,
  plugin: [
    "typedoc-plugin-markdown",
    "typedoc-plugin-mdn-links",
    "typedoc-plugin-rename-defaults",
    "typedoc-plugin-missing-exports",
  ],
  hidePageHeader: true,
  formatWithPrettier: true,
  prettierConfigFile: "./.prettierrc",
  sanitizeComments: true,
  router: "module",
};
