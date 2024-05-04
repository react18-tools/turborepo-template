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
    "typedoc-plugin-mdn-links",
    "typedoc-plugin-rename-defaults",
    "typedoc-plugin-missing-exports",
    "typedoc-plugin-zod",
    "typedoc-plugin-inline-sources",
    // "typedoc-plugin-extras",
  ],
};
