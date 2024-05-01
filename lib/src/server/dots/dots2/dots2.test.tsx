import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Dots2 } from "./dots2";

describe.concurrent("dots2", () => {
  afterEach(cleanup);

  test("check if renders without errors", ({ expect }) => {
    render(<Dots2 dotRadius={25} />);
  });
});
