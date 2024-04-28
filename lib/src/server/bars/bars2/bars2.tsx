import * as React from "react";
import styles from "./bars2.module.scss";

interface Bars2Props extends React.HTMLAttributes<HTMLDivElement> {
  /** width of the loader element in pixels or a string with a length unit. */
  width?: number | string;
  /** height of the loader element in pixels or a string with a length unit. */
  height?: number | string;
  /** Color of the dots - CSS compatible color */
  color?: string;
}

/**
 * A simple loader with 3 dots.
 *
 * @example
 * <Bars2 />
 *
 * @source
 */
export function Bars2({ width, height, color = "#000", ...props }: Bars2Props) {
  let w = props.style?.width ?? width ?? 32;
  let h = props.style?.height ?? height ?? 32;
  w = typeof w === "string" ? w : `${w}px`;
  h = typeof h === "string" ? h : `${h}px`;
  const className = [styles.loader, props.className].filter(Boolean).join(" ");
  const style = { ...(props.style ?? {}), width: w, height: h, "--c": color };
  return <div className={className} style={style} />;
}
