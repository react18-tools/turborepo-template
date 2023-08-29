import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ClientTest } from "./client-test";

describe.concurrent("client-test", () => {
	afterEach(cleanup);

	test("check if h1 heading exists", async ({ expect }) => {
		render(<ClientTest />);
		expect(screen.getByTestId("client-test-h1").textContent).toBe("client test");
	});
});
