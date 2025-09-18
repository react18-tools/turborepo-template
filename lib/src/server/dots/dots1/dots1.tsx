import { Base, type BaseProps } from "../../common";
import styles from "./dots1.module.scss";

/**
 * A simple loader with 3 dots.
 *
 * @example
 * <Dots1 />
 */
export function Dots1(props: BaseProps) {
  return <Base {...props} loaderClass={styles.loader} />;
}
