import * as React from "react";
import styles from "./logo.module.scss";

interface LogoProps {
  href?: string;
}

/**
 * # Logo
 *
 */
export function Logo({ href }: LogoProps) {
  return (
    <a
      href={href ?? "https://turborepo-template-three.vercel.app/"}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.logo}>
      <span>turborepo-template</span>
    </a>
  );
}
