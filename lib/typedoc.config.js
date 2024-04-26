/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  name: "Code Documentation",
  entryPoints: ["./src"],
  entryPointStrategy: "Expand",
  exclude: "**/*.test.tsx",
  out: "../docs",
  commentStyle: "all",
};
