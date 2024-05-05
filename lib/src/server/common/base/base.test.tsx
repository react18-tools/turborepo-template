import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Base } from "./base";

describe.concurrent("base", () => {
  afterEach(cleanup);

  test("check if h1 heading exists", ({ expect }) => {
    const { container } = render(<Base loaderClass="my-clx" />);
    expect(container.children[0].classList).toContain("my-clx");
  });
});
