import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Logo } from "./logo";

describe.concurrent("logo", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", ({ expect }) => {
		render(<Logo />);
		expect(screen.getByTestId("logo-h1").textContent).toBe("logo");
	});
});
