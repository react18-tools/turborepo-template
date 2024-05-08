import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { DrawerButton } from "./drawer-button";

describe.concurrent("drawer-button", () => {
  afterEach(cleanup);

  const dummyFunc = () => {};
  test("check if h1 heading exists", () => {
    render(<DrawerButton open setOpen={dummyFunc} />);
  });
});
