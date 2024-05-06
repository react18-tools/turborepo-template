import { HTMLProps } from "react";

/** Interface declaring the common properties of the loaders */
export interface BaseProps extends HTMLProps<HTMLDivElement> {
  /** width of the loader element in pixels or a string with a length unit. */
  width?: number | string;
  /** height of the loader element in pixels or a string with a length unit. */
  height?: number | string;
  /** Color of the dots - CSS compatible color */
  color?: string;
}

/** Other props - loaderClass is included here as we will extend BaseProps for other loaders */
interface OtherProps {
  /** Loader class name */
  loaderClass: string;
  dotRadius?: number | string;
}

/**
 * Base component to avoid code duplication
 *
 * default values should be specified in css files - so no need to set them in JSX
 */
export function Base({
  width,
  height,
  color,
  loaderClass,
  dotRadius,
  ...props
}: BaseProps & OtherProps) {
  const style = { ...props.style, width, height, "--c": color };
  // @ts-expect-error -- it is intensional
  if (dotRadius) style["--r"] = dotRadius;
  const className = [props.className, loaderClass].filter(Boolean).join(" ");
  return <div {...props} className={className} style={style} />;
}
