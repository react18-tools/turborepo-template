import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Demo } from "./demo";

describe.concurrent("demo", () => {
  afterEach(cleanup);

  test("Dummy test - test if renders without errors", ({ expect }) => {
    render(<Demo />);
  });
});
