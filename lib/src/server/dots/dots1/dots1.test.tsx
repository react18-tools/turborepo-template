import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Dots1 } from "./dots1";

describe.concurrent("dots1", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", ({ expect }) => {
		render(<Dots1 />);
		expect(screen.getByTestId("dots1-h1").textContent).toBe("dots1");
	});
});
