import styles from "../root-layout.module.css";
import { ColorSchemePreference } from "./color-scheme-preference";
import { ThemeSelector } from "./theme-selector";

export function ThemeController() {
	return (
		<div className={[styles.center, styles.prefs].join(" ")}>
			<div>
				<ColorSchemePreference />
				<ThemeSelector scope="" />
			</div>
			<div>
				<ThemeSelector scope="dark" />
				<ThemeSelector scope="light" />
			</div>
		</div>
	);
}
