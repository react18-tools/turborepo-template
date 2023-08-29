import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
	// A simple generator to add a new React component to the internal UI library
	plop.setGenerator("react-component", {
		description: "Adds a new react component",
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
		actions: data => {
			const root = data?.isClient ? "" : "server/";
			return [
				{
					type: "add",
					path: root + "{{kebabCase name}}/{{kebabCase name}}.tsx",
					templateFile: "templates/component.hbs",
				},
				{
					type: "add",
					path: root + "{{kebabCase name}}/index.tsx",
					template: `${
						data?.isClient ? '"use client";\n\n' : ""
					}export * from "./{{kebabCase name}}\n";`,
				},
				{
					type: "append",
					path: root + "index.tsx",
					pattern: /(?<insertion>\/\/ component exports)/g,
					template: 'export * from "./{{kebabCase name}}";',
				},
			];
		},
	});
}
