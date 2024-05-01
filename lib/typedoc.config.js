/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  name: "React18 Loaders",
  entryPoints: ["./src"],
  entryPointStrategy: "Expand",
  exclude: ["**/*.test.tsx", "**/index.ts"],
  out: "../docs",
  commentStyle: "all",
  searchInComments: true,
  includeVersion: true,
  plugin: [
    "typedoc-plugin-mdn-links",
    "typedoc-plugin-rename-defaults",
    "typedoc-plugin-missing-exports",
    "typedoc-plugin-zod",
    "typedoc-plugin-inline-sources",
    // "typedoc-plugin-extras",
  ],
};
