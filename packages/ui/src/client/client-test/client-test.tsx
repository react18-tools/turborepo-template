import * as React from "react";

interface Props {
	children?: React.ReactNode;
}

/**
 * # ClientTest
 *
 *
 * @param {React.ReactNode} [props.children]
 * @returns {React.ReactElement}
 */
export function ClientTest({ children }: Props) {
	return (
		<div>
			<h1 data-testid="client-test-h1">client test</h1>
			{children}
		</div>
	);
}
