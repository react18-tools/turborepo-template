import { useState } from "react";
import { Logo, type LogoProps } from "../../server";
import { DrawerButton } from "../drawer-button";
import styles from "./header.module.scss";
import ThemeSwitch from "./theme-switch";

/**
 * # Header
 * Header and navigation drawer - creating as client component
 *
 * This could be a server component with leaf nodes being client components.
 * However, we want to reuse as much code as possible across different examples and also optimize for the best use of bleading edge features.
 */
export function Header(logoProps: LogoProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div>
        <DrawerButton {...{ open, setOpen }} />
        <Logo {...logoProps} />
        <nav className={open ? styles.open : ""}>
          <a
            href="https://mayank-chaudhari.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.author}
          >
            By Mayank Chaudhari
          </a>
          <ThemeSwitch />
        </nav>
      </div>
    </header>
  );
}
