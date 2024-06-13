"use client";

import { useMode } from "nextjs-darkmode/hooks";
import { Switch } from "nextjs-darkmode/switch";
import styles from "./header.module.scss";

/** This is a wrapper around `nextjs-darkmode's ColorSwitch component to improve mobile view. */
export default function ThemeSwitch(): JSX.Element {
  const { mode } = useMode();
  return (
    <Switch className={styles.themeswitch}>
      <span className="mb">{mode}</span>
    </Switch>
  );
}
