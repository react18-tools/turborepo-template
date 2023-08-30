import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, test, vi } from "vitest";
import { StarMe } from "./star-me";

describe.concurrent("star-me", () => {
	afterEach(cleanup);

	test("smoke", async ({ expect }) => {
		render(<StarMe gitHubUrl="https://github.com/mayank1513/turborepo-template" />);
		expect(screen.getByTestId("star-me-h1").textContent).toBe("Star Me");
	});

	test("test custom children", async ({ expect }) => {
		const text = "Star this repo";
		render(<StarMe gitHubUrl="https://github.com/mayank1513/turborepo-template">{text}</StarMe>);
		expect(screen.getByTestId("star-me-h1").textContent).toBe(text);
	});

	test("test custom props", async ({ expect }) => {
		const className = "my-star-class";
		render(
			<StarMe
				gitHubUrl="https://github.com/mayank1513/turborepo-template"
				className={className}></StarMe>,
		);
		expect(screen.getByTestId("star-me-h1").className).toBe(className);
	});

	test("test popup", async ({ expect }) => {
		render(
			<StarMe gitHubUrl="https://github.com/mayank1513/turborepo-template" onClick={() => {}} />,
		);
		const spy = vi.spyOn(window, "open");
		fireEvent.click(screen.getByTestId("star-me-h1"));
		expect(spy).toHaveBeenCalled();
	});
});
