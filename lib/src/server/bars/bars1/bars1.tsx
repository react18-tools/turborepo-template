import * as React from "react";
import styles from "./bars1.module.scss";

interface Bars1Props {
	children?: React.ReactNode;
}

/**
 * # Bars1
 * A simple loader with bars
 */
export function Bars1({ children }: Bars1Props) {
	return (
		<div className={styles.container}>
			<h1 data-testid="bars1-h1">bars1</h1>
			{children}
		</div>
	);
}
