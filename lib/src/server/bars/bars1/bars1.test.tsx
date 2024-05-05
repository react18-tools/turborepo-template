import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Bars1 } from "./bars1";

describe.concurrent("bars1", () => {
  afterEach(cleanup);

  test("check if renders without errors", () => {
    render(<Bars1 />);
  });
});
