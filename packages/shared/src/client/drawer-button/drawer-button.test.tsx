import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { DrawerButton } from "./drawer-button";

describe.concurrent("drawer-button", () => {
  afterEach(cleanup);

  test("check if h1 heading exists", ({ expect }) => {
    render(<DrawerButton open setOpen={() => {}} />);
  });
});
