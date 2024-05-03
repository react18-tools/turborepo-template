"use client";
import * as React from "react";
import styles from "./drawer-button.module.scss";

interface DrawerButtonProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * # DrawerButton
 * Drawer button to toggle side navigation on mobile devices.
 */
export function DrawerButton({ open, setOpen }: DrawerButtonProps) {
  return (
    <div
      className={[styles.drawerBtn, "mb", open ? styles.open : ""].join(" ")}
      onClick={() => setOpen(!open)}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
