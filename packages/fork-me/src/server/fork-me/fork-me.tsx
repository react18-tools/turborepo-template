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
	const w = (Number.isNaN(Number(width)) ? width : `${width}px`) || "15em";
	const h = (Number.isNaN(Number(height)) ? height : `${height}px`) || "35px";
	const bgC = bgColor || "#aaa";
	const tC = textColor || "#555";
	const style = {
		"--w": w,
		"--h": h,
		"--tc": tC,
		"--bc": bgC,
		"--sc": bgC || shadowColor,
		outline: `4px solid ${bgC}`, // to satisfy typescript
	};

	const url = noAutoFork ? gitHubUrl : gitHubUrl.endsWith("fork") ? gitHubUrl : `${gitHubUrl}/fork`; // eslint-disable-line no-nested-ternary -- inteded
	return (
		<a
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- it's ok
			className={cssClasses.fork}
			href={url}
			rel="noopener noreferrer"
			style={style}
			target="_blank">
			{text || "Fork Me on GitHub"}
		</a>
	);
}
