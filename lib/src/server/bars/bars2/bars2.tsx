import styles from "./bars2.module.scss";
import { Base, BaseProps } from "../../common";

/**
 * A simple loader with 3 dots.
 *
 * @example
 * <Bars2 />
 *
 * @source
 */
export function Bars2(props: BaseProps) {
  return <Base {...props} loaderClass={styles.loader} />;
}
