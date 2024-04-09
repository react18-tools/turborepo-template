import * as React from "react";
import styles from "./simple-loader.module.scss";

interface SimpleLoaderProps {
  children?: React.ReactNode;
}

/**
 * # SimpleLoader
 *
 */
export function SimpleLoader({ children }: SimpleLoaderProps) {
  return (
    <div className={styles.container}>
      <h1 data-testid="simple-loader-h1">simple-loader</h1>
      {children}
    </div>
  );
}
