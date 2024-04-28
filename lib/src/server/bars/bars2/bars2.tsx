import * as React from "react";
import styles from "./bars2.module.scss";
import { Base, BaseProps } from "../../common";

interface Bars2Props extends BaseProps {}

/**
 * A simple loader with 3 dots.
 *
 * @example
 * <Bars2 />
 *
 * @source
 */
export function Bars2(props: Bars2Props) {
  return <Base {...props} loaderClass={styles.loader} />;
}
