import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Cards } from "./cards";

describe.concurrent("cards", () => {
  afterEach(cleanup);

  test("check if renders without errors", () => {
    render(<Cards cards={[]} />);
  });
});
