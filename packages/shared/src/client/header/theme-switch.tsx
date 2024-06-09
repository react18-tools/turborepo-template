"use client";

import { useMode } from "nextjs-darkmode/hooks";
import styles from "./header.module.scss";
import { useCallback } from "react";
import type { ColorSchemePreference } from "nextjs-darkmode";
import { Switch } from "nextjs-darkmode/switch";

const colorSchemes: ColorSchemePreference[] = ["system", "dark", "light"];

/** This is a wrapper around `nextjs-darkmode's ColorSwitch component to improve mobile view. */
export default function ThemeSwitch() {
  const { resolvedMode, setMode } = useMode();
  const toggle = useCallback(() => {
    const index = colorSchemes.indexOf(resolvedMode);
    setMode(colorSchemes[(index + 1) % colorSchemes.length]);
  }, [resolvedMode]);

  return (
    <button className={styles.themeswitch} onClick={toggle}>
      <Switch tag="div" />
      <span className="mb">{resolvedMode}</span>
    </button>
  );
}
