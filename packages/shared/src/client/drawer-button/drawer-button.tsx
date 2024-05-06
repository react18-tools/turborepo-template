"use client";
import { Dispatch, SetStateAction } from "react";
import styles from "./drawer-button.module.scss";

interface DrawerButtonProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * # DrawerButton
 * Drawer button to toggle side navigation on mobile devices.
 */
export function DrawerButton({ open, setOpen }: DrawerButtonProps) {
  return (
    <button
      className={[styles.drawerBtn, "mb", open ? styles.open : ""].join(" ")}
      onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </button>
  );
}
