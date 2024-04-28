import * as React from "react";
import styles from "./dots2.module.scss";

interface Dots2Props extends React.HTMLAttributes<HTMLDivElement> {
  /** width of the loader element in pixels or a string with a length unit. */
  width?: number | string;
  /** Color of the dots - CSS compatible color */
  color?: string;
  /** Radius of the dots in pixels or a string with a length unit. */
  dotSize?: number | string;
}

/**
 * A simple loader with 3 dots.
 *
 * @example
 * <Dots2 />
 *
 * @source
 */
export function Dots2({ width, color = "#000", dotSize = "20%", ...props }: Dots2Props) {
  let w = props.style?.width ?? width ?? 32;
  w = typeof w === "string" ? w : `${w}px`;
  const r = typeof dotSize === "string" ? dotSize : `${dotSize}px`;
  const className = [styles.loader, props.className].filter(Boolean).join(" ");
  const style = { ...(props.style ?? {}), width: w, "--c": color, "--dot-radius": r };
  return <div className={className} style={style} />;
}
