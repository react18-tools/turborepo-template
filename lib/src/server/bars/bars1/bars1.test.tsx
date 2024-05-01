import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Bars1 } from "./bars1";

describe.concurrent("bars1", () => {
  afterEach(cleanup);

  test("check if renders without errors", ({ expect }) => {
    render(<Bars1 />);
  });
});
