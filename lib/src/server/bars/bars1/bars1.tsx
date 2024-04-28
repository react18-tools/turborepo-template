import * as React from "react";
import styles from "./bars1.module.scss";
import { Base, BaseProps } from "../../common";

interface Bars1Props extends BaseProps {}

/**
 * A simple loader with 3 dots.
 *
 * @example
 * <Bars1 />
 *
 * @source
 */
export function Bars1(props: Bars1Props) {
  return <Base {...props} loaderClass={styles.loader} />;
}
