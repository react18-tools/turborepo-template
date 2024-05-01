import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { GlobalLoader } from "./global-loader";

describe.concurrent("global-loader", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", ({ expect }) => {
		render(<GlobalLoader />);
		expect(screen.getByTestId("global-loader-h1").textContent).toBe("global loader");
	});
});
