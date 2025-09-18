import { Base, type BaseProps } from "../../common";
import styles from "./bars1.module.scss";

/**
 * A simple loader with 3 dots.
 *
 * @example
 * <Bars1 />
 */
export function Bars1(props: BaseProps) {
  return <Base {...props} loaderClass={styles.loader} />;
}
