import * as React from "react";
import styles from "./dots2.module.scss";

interface Dots2Props {
	children?: React.ReactNode;
}

/**
 * # Dots2
 * A simple loader with 3 dots.
 */
export function Dots2({ children }: Dots2Props) {
	return (
		<div className={styles.container}>
			<h1 data-testid="dots2-h1">dots2</h1>
			{children}
		</div>
	);
}
