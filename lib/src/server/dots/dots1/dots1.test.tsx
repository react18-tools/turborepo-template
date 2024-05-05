import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Dots1 } from "./dots1";

describe.concurrent("dots1", () => {
  afterEach(cleanup);

  test("check if renders without erros", () => {
    render(<Dots1 />);
  });
});
