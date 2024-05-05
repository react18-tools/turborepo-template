import { cleanup, render, renderHook, act } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { LoaderContainer } from "../client";
import { useLoader } from "./use-loader";

describe.concurrent("loader-container", () => {
  afterEach(cleanup);

  test("Test hook", ({ expect }) => {
    const { result } = renderHook(() => useLoader());
    const { container } = render(<LoaderContainer />);
    expect(container.childElementCount).toBe(0);
    act(() => result.current.setLoading(true));
    expect(container.childElementCount).toBe(1);
  });
});
