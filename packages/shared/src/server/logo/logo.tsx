import * as React from "react";
import styles from "./logo.module.scss";

/**
 * # Logo
 *
 */
export function Logo() {
  return (
    <a
      href="https://turborepo-template-three.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.logo}>
      <code>turborepo-template</code>
    </a>
  );
}
