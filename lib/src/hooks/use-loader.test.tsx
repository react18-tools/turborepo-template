import { cleanup, render, renderHook, act } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { LoaderContainer } from "../client";
import { useLoader } from "./use-loader";
import styles from "../client/loader-container/loader-container.module.scss";

describe.concurrent("loader-container", () => {
  afterEach(cleanup);

  test("Test hook", ({ expect }) => {
    const { result } = renderHook(() => useLoader());
    const { container } = render(<LoaderContainer />);
    expect(container.children[0].classList).not.toContain(styles.loading);
    act(() => result.current.setLoading(true));
    expect(container.children[0].classList).toContain(styles.loading);
  });
});
