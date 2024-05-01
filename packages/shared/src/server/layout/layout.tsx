import * as React from "react";
import styles from "./layout.module.scss";

interface LayoutProps {
  children?: React.ReactNode;
}

/**
 * # Layout
 * The default layout shared by all examples.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <h1 data-testid="layout-h1">layout</h1>
      {children}
    </div>
  );
}
