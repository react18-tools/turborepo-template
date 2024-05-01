import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Layout } from "./layout";

describe.concurrent("layout", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", ({ expect }) => {
		render(<Layout />);
		expect(screen.getByTestId("layout-h1").textContent).toBe("layout");
	});
});
