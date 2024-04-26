import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Bars1 } from "./bars1";

describe.concurrent("bars1", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", ({ expect }) => {
		render(<Bars1 />);
		expect(screen.getByTestId("bars1-h1").textContent).toBe("bars1");
	});
});
