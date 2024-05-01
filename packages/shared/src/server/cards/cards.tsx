import * as React from "react";
import styles from "./cards.module.scss";

interface CardsProps {
	children?: React.ReactNode;
}

/**
 * # Cards
 * Cards with links
 */
export function Cards({ children }: CardsProps) {
	return (
		<div className={styles.container}>
			<h1 data-testid="cards-h1">cards</h1>
			{children}
		</div>
	);
}
