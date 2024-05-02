import { DrawerButton } from "@repo/shared";
import { Logo } from "@repo/shared/dist/server";
import ThemeSwitch from "./theme-switch";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <DrawerButton />
        <Logo />
        <nav>
          <a
            href="https://mayank-chaudhari.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.author}>
            By Mayank Chaudhari
          </a>
          <ThemeSwitch />
        </nav>
      </div>
    </header>
  );
}
