import * as React from "react";
import styles from "./dots2.module.scss";

interface Dots2Props {
  children?: React.ReactNode;
}

/**
 * # Dots2
 * A simple loader with 3 dots.
 */
export function Dots2({ children }: Dots2Props) {
  return <div className={styles.loader} />;
}
