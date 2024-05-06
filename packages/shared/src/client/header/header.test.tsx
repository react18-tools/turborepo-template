import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Header } from "./header";

describe.concurrent("header", () => {
  afterEach(cleanup);

  test("check if h1 heading exists", () => {
    render(<Header />);
  });
});
