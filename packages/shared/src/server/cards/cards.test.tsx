import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Cards } from "./cards";

describe.concurrent("cards", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", ({ expect }) => {
		render(<Cards />);
		expect(screen.getByTestId("cards-h1").textContent).toBe("cards");
	});
});
