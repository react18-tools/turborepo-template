import { ColorSwitch } from "nextjs-themes";
import { Logo } from "../common/logo";
import styles from "../root-layout.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <a
          className={styles.logo}
          href="https://github.com/react18-tools/turborepo-template/"
          rel="noopener noreferrer"
          target="_blank">
          <p>
            <Logo className={styles.code} />
          </p>
        </a>
        <a href="https://mayank-chaudhari.vercel.app" rel="noopener noreferrer" target="_blank">
          By Mayank
        </a>
      </nav>
      <ColorSwitch />
    </header>
  );
}
