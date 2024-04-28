import * as React from "react";
import styles from "./dots1.module.scss";

interface Dots1Props extends React.HTMLAttributes<HTMLDivElement> {
  /** width of the loader element in pixels or a string with a length unit. */
  width?: number | string;
  /** Color of the dots - CSS compatible color */
  color?: string;
}

/**
 * A simple loader with 3 dots.
 *
 * @example
 * <Dots1 />
 *
 * @source
 */
export function Dots1({ width, color = "#000", ...props }: Dots1Props) {
  let w = props.style?.width ?? width ?? 32;
  w = typeof width === "string" ? width : `${width}px`;
  const className = [styles.loader, props.className].filter(Boolean).join(" ");
  const style = { ...(props.style ?? {}), width: w, "--c": color };
  return <div className={className} style={style} />;
}
