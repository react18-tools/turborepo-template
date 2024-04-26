import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Dots2 } from "./dots2";

describe.concurrent("dots2", () => {
  afterEach(cleanup);

  test("check if h1 heading exists", ({ expect }) => {
    render(<Dots2 />);
    expect(screen.getByTestId("dots2-h1").textContent).toBe("dots2");
  });
});
