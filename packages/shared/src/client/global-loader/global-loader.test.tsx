import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { GlobalLoader } from "./global-loader";

describe.concurrent("global-loader", () => {
  afterEach(cleanup);

  test("check if renders", ({ expect }) => {
    render(<GlobalLoader />);
  });
});
