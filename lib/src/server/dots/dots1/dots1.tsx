import styles from "./dots1.module.scss";
import { Base, BaseProps } from "../../common";

/**
 * A simple loader with 3 dots.
 *
 * @example
 * <Dots1 />
 *
 * @source
 */
export function Dots1(props: BaseProps) {
  return <Base {...props} loaderClass={styles.loader} />;
}
