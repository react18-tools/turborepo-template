import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { GlobalLoader } from "./global-loader";

describe.concurrent("global-loader", () => {
  afterEach(cleanup);

  test("check if renders", () => {
    render(<GlobalLoader />);
  });
});
