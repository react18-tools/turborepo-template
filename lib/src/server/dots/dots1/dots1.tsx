import * as React from "react";
import styles from "./dots1.module.scss";

interface Dots1Props {
  children?: React.ReactNode;
}

/**
 * # Dots1
 * A simple loader with 3 dots.
 */
export function Dots1({ children }: Dots1Props) {
  return <div className={styles.loader} data-testid="dots1" />;
}
