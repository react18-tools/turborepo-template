import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { LoaderContainer } from "./loader-container";

describe.concurrent("loader-container", () => {
  afterEach(cleanup);

  test("check if renders without erros", () => {
    render(<LoaderContainer />);
  });
});
