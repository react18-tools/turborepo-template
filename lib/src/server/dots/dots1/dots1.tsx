import * as React from "react";
import styles from "./dots1.module.scss";
import { Base, BaseProps } from "../../common";

interface Dots1Props extends BaseProps {}

/**
 * A simple loader with 3 dots.
 *
 * @example
 * <Dots1 />
 *
 * @source
 */
export function Dots1(props: Dots1Props) {
  return <Base {...props} loaderClass={styles.loader} />;
}
