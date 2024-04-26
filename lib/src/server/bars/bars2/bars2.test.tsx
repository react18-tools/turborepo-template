import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Bars2 } from "./bars2";

describe.concurrent("bars2", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", ({ expect }) => {
		render(<Bars2 />);
		expect(screen.getByTestId("bars2-h1").textContent).toBe("bars2");
	});
});
