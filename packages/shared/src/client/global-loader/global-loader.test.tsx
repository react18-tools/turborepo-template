import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { GlobalLoader } from "./global-loader";

describe.concurrent("global-loader", () => {
  afterEach(cleanup);

  /** todo: for some reason imports from react18-loaders not working in GitHub actions -- working in win 11 */
  test.todo("check if renders", ({ expect }) => {
    render(<GlobalLoader />);
  });
});
