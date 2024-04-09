import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { SimpleLoader } from "./simple-loader";

describe.concurrent("simple-loader", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", ({ expect }) => {
		render(<SimpleLoader />);
		expect(screen.getByTestId("simple-loader-h1").textContent).toBe("simple-loader");
	});
});
