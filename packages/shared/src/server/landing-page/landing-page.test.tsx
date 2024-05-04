import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { LandingPage } from "./landing-page";

describe.concurrent("landing-page", () => {
  afterEach(cleanup);

  test("check if renders without errors", ({}) => {
    render(<LandingPage title="MyTitle" />);
  });
});
