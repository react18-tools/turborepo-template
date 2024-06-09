"use client";

import { useMode } from "nextjs-darkmode/hooks";
import styles from "./header.module.scss";
import { useCallback } from "react";
import type { ColorSchemePreference } from "nextjs-darkmode";
import { Switch } from "nextjs-darkmode/switch";

const modes: ColorSchemePreference[] = ["dark", "light", "system"];

/** This is a wrapper around `nextjs-darkmode's ColorSwitch component to improve mobile view. */
export default function ThemeSwitch() {
  const { mode, setMode } = useMode();
  const toggle = useCallback(() => {
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
  }, [mode]);

  return (
    <button className={styles.themeswitch} onClick={toggle}>
      <Switch tag="div" />
      <span className="mb">{mode}</span>
    </button>
  );
}