/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
	name: "Code Documentation",
	entryPoints: ["./src"],
	entryPointStrategy: "Expand",
	tsconfig: "./tsconfig.doc.json",
	out: "../../docs",
	commentStyle: "all",
};
