import * as React from "react";
import styles from "./drawer-button.module.scss";

/**
 * # DrawerButton
 * Drawer button to toggle side navigation on mobile devices.
 */
export function DrawerButton() {
  return <div className={[styles.drawer, "mb"].join(" ")}></div>;
}
