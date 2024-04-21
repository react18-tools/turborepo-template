/* eslint-disable @typescript-eslint/restrict-template-expressions -- intentionally allowed automatic type conversion*/
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing -- this is intentional to not allow empty strings */

// skipcq: JS-C1003 - This is intentional
import * as React from "react";
import cssClasses from "./fork-me.module.css";

interface ForkMeProps {
  gitHubUrl: string;
  text?: string;
  width?: string | number;
  height?: string | number;
  bgColor?: string;
  shadowColor?: string;
  textColor?: string;
  noAutoFork?: boolean;
}

/**
 * # ForkMe
 * Fork me ribbon
 *
 * @param props - ForkMeProps
 * @returns React.ReactElement
 */
export function ForkMe({
  gitHubUrl,
  text,
  width,
  height,
  bgColor,
  shadowColor,
  textColor,
  noAutoFork,
}: ForkMeProps) {
  const finalWidth = (Number.isNaN(Number(width)) ? width : `${width}px`) || "15em";
  const finalHeight = (Number.isNaN(Number(height)) ? height : `${height}px`) || "35px";
  const bgC = bgColor || "#aaa";
  const tC = textColor || "#555";
  const style = {
    "--w": finalWidth,
    "--h": finalHeight,
    "--tc": tC,
    "--bc": bgC,
    "--sc": bgC || shadowColor,
    position: "fixed" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    width: finalWidth,
    height: finalHeight,
    transform: "rotate(45deg)",
    top: "calc(0.354 * var(--w) - var(--h))",
    right: "calc(-0.14 * var(--w) - 0.5 * var(--h))",
    color: tC,
    backgroundColor: bgC,
    textShadow: "0px 1px 0px rgba(255, 255, 255, 0.3), 0px -1px 0px rgba(0, 0, 0, 0.7)",
    border: "1px dashed gray",
    outline: `4px solid ${bgC}`, // to satisfy typescript
    textDecoration: "none",
    zIndex: 1000,
  };

  let url = gitHubUrl;
  if (!noAutoFork) url = url.endsWith("fork") ? url : `${url}/fork`;

  return (
    <a
      className={cssClasses.fork}
      href={url}
      rel="noopener noreferrer"
      style={style}
      target="_blank">
      {text ?? "Fork Me on GitHub"}
    </a>
  );
}
