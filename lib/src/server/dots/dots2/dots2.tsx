import { Base, type BaseProps } from "../../common";
import styles from "./dots2.module.scss";

export interface Dots2Props extends BaseProps {
  /** Radius of the dots in pixels or a string with a length unit. */
  dotRadius?: number | string;
}

/**
 * A simple loader with 3 dots.
 *
 * @example
 * <Dots2 />
 */
export function Dots2(props: Dots2Props) {
  return <Base {...props} loaderClass={styles.loader} />;
}
