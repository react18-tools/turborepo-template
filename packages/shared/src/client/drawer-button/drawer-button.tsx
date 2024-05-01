import * as React from "react";
import styles from "./drawer-button.module.scss";

interface DrawerButtonProps {
	children?: React.ReactNode;
}

/**
 * # DrawerButton
 * Drawer button to toggle side navigation on mobile devices.
 */
export function DrawerButton({ children }: DrawerButtonProps) {
	return (
		<div className={styles.container}>
			<h1 data-testid="drawer-button-h1">drawer-button</h1>
			{children}
		</div>
	);
}
