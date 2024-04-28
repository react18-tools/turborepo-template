import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Base } from "./base";

describe.concurrent("base", () => {
  afterEach(cleanup);

  test("check if h1 heading exists", ({ expect }) => {
    render(<Base />);
    expect(screen.getByTestId("base-h1").textContent).toBe("base");
  });
});
