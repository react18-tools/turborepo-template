import { Base, type BaseProps } from "../../common";
import styles from "./bars2.module.scss";

/**
 * A simple loader with 3 dots.
 *
 * @example
 * <Bars2 />
 */
export function Bars2(props: BaseProps) {
  return <Base {...props} loaderClass={styles.loader} />;
}
