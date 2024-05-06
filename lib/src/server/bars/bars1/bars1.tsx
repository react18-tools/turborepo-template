import styles from "./bars1.module.scss";
import { Base, BaseProps } from "../../common";

/**
 * A simple loader with 3 dots.
 *
 * @example
 * <Bars1 />
 *
 * @source
 */
export function Bars1(props: BaseProps) {
  return <Base {...props} loaderClass={styles.loader} />;
}
