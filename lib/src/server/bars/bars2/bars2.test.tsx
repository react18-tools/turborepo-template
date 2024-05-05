import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Bars2 } from "./bars2";

describe.concurrent("bars2", () => {
  afterEach(cleanup);

  test("check if renders without errors", () => {
    render(<Bars2 />);
  });
});
