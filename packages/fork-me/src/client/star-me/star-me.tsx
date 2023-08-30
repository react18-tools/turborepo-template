import * as React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	gitHubUrl: string;
}

/**
 * # StarMe
 * Star repo in a popup window
 *
 * @param {React.ReactNode} [props.children]
 * @returns {React.ReactElement}
 */
export function StarMe({ gitHubUrl, onClick, children, ...props }: Props) {
	const starMe = (e: React.MouseEvent<HTMLButtonElement>) => {
		window.open(gitHubUrl, "_blank", "height: 400,width:1200,left:150,top:150");
		onClick?.(e);
	};
	return (
		<button data-testid="star-me-h1" onClick={starMe} {...props}>
			{children || "Star Me"}
		</button>
	);
}
