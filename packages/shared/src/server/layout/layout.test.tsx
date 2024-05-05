import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Layout } from "./layout";

describe.concurrent("layout", () => {
  afterEach(cleanup);

  test("check if renders without errors", () => {
    render(<Layout />);
  });
});
