import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ForkMe } from "./fork-me";

describe.concurrent("fork-me", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", async ({ expect }) => {
		render(<ForkMe />);
		expect(screen.getByTestId("fork-me-h1").textContent).toBe("fork me");
	});
});
