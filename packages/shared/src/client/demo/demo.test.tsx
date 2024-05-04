import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Demo } from "./demo";

describe.concurrent("demo", () => {
  afterEach(cleanup);

  /** todo: for some reason imports from react18-loaders not working in GitHub actions -- working in win 11 */
  test.todo("Dummy test - test if renders without errors", ({ expect }) => {
    render(<Demo />);
  });
});
