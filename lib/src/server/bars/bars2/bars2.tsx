import * as React from "react";
import styles from "./bars2.module.scss";

interface Bars2Props {
	children?: React.ReactNode;
}

/**
 * # Bars2
 * A simple loader with 3 bars.
 */
export function Bars2({ children }: Bars2Props) {
	return (
		<div className={styles.container}>
			<h1 data-testid="bars2-h1">bars2</h1>
			{children}
		</div>
	);
}
