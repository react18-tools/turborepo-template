import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ForkMe } from "./fork-me";

describe.concurrent("fork-me", () => {
	afterEach(cleanup);

	test("Smoke test", ({ expect }) => {
		const component = render(
			<ForkMe
				bgColor="black"
				gitHubUrl="https://github.com/mayank1513/turborepo-template"
				noAutoFork
			/>,
		);
		expect(component.container.textContent).toBe("Fork Me on GitHub");
	});

	test("Custom text", ({ expect }) => {
		const text = "Star me on GitHub";
		const component = render(
			<ForkMe
				gitHubUrl="https://github.com/mayank1513/turborepo-template"
				height={24}
				text={text}
				width={24}
			/>,
		);
		expect(component.container.textContent).toBe(text);
	});
});
