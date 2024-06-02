"use client";

import { ColorSchemeType, ColorSwitch, useTheme } from "nextjs-themes";
import styles from "./header.module.scss";
import { KeyboardEvent, useCallback } from "react";

const colorSchemes: ColorSchemeType[] = ["dark", "light", "system"];

/** This is a wrapper around `nextjs-themes's ColorSwitch component to improve mobile view. */
export default function ThemeSwitch() {
  const { colorSchemePref, setColorSchemePref } = useTheme();
  const toggle = useCallback(() => {
    const index = colorSchemes.indexOf(colorSchemePref);
    setColorSchemePref(colorSchemes[(index + 1) % colorSchemes.length]);
  }, [colorSchemePref]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") toggle();
    },
    [toggle],
  );
  return (
    <div
      tabIndex={0}
      role="button"
      className={styles.themeswitch}
      onClick={toggle}
      onKeyDown={onKeyDown}>
      <ColorSwitch />
      <span className="mb">{colorSchemePref}</span>
    </div>
  );
}
