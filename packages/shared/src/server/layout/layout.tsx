import * as React from "react";
import styles from "./layout.module.scss";
import { ForkMe } from "@mayank1513/fork-me/server";

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
      {children}
      <ForkMe gitHubUrl="https://github.com/react18-tools/turborepo-template" />
    </div>
  );
}
