import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Cards } from "./cards";

describe.concurrent("cards", () => {
  afterEach(cleanup);

  test("check if renders without errors", ({ expect }) => {
    render(<Cards />);
  });
});
