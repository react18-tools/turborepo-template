import * as React from "react";

interface Props {
	gitHubUrl: string;
	text?: string;
	width?: string | number;
	height?: string | number;
	bgColor?: string;
	textColor?: string;
	noAutoFork?: boolean;
}

/**
 * # ForkMe
 * Fork me ribbon
 *
 * @param {React.ReactNode} [props.children]
 * @returns {React.ReactElement}
 */
export function ForkMe({ gitHubUrl, text, width, height, bgColor, textColor, noAutoFork }: Props) {
	const w = (Number.isNaN(Number(width)) ? width : `${width}px`) || "15em";
	const h = (Number.isNaN(Number(height)) ? height : `${height}px`) || "35px";
	const bgC = bgColor || "#aaa";
	const tC = textColor || "#555";
	const style = {
		"--w": w,
		"--h": h,
		position: "fixed" as "fixed",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontWeight: 700,
		width: w,
		height: h,
		transform: "rotate(45deg)",
		top: "calc(0.354 * var(--w) - var(--h))",
		right: "calc(-0.14 * var(--w) - 0.5 * var(--h))",
		color: tC,
		backgroundColor: bgC,
		textShadow: "0px 1px 0px rgba(255, 255, 255, 0.3), 0px -1px 0px rgba(0, 0, 0, 0.7)",
		border: "1px dashed gray",
		outline: `4px solid ${bgC}`,
	};

	const url = noAutoFork ? gitHubUrl : gitHubUrl.endsWith("fork") ? gitHubUrl : `${gitHubUrl}/fork`;
	return (
		<a href={url} target="_blank" rel="noopener noreferrer" style={style}>
			{text || "Fork Me on GitHub"}
		</a>
	);
}
