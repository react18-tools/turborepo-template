"use client";
import type { ColorSchemeType } from "react18-themes";
import { useTheme } from "react18-themes";
import { useEffect, useMemo } from "react";
import type { ChangeEvent } from "react";
import { Select } from "../common/select";
import styles from "../root-layout.module.css";
import { darkThemes, lightThemes } from "./themes";

interface ThemeSelectorProps {
	scope: "" | "dark" | "light";
}

export function ThemeSelector({ scope }: ThemeSelectorProps) {
	const { colorSchemePref, theme, setTheme } = useThemeStates(scope);
	const themes = useMemo(() => {
		switch (scope) {
			case "":
				return ["auto", ...lightThemes, ...darkThemes];
			case "dark":
				return darkThemes;
			case "light":
				return lightThemes;
		}
	}, [scope]);

	useEffect(() => {
		if (!theme) setTheme(themes[0]);
	}, [setTheme, themes, theme]);

	const handleChange: (e: ChangeEvent<HTMLSelectElement>) => void = e => setTheme(e.target.value);

	return (
		<p>
			Select {scope} theme{" "}
			<Select className={getClassName(scope, colorSchemePref)} onChange={handleChange} options={themes} value={theme} />
		</p>
	);
}

function getClassName(scope: ThemeSelectorProps["scope"], colorSchemePref: ColorSchemeType) {
	if (scope === "") return colorSchemePref ? "" : styles.active;
	if (colorSchemePref === scope) return styles.active;
	return colorSchemePref === "system" ? styles[scope] : "";
}

function useThemeStates(scope: ThemeSelectorProps["scope"]) {
	const [colorSchemePref, theme, setTheme] = useTheme(state => {
		switch (scope) {
			case "":
				return [state.colorSchemePref, state.theme, state.setTheme];
			case "dark":
				return [state.colorSchemePref, state.darkTheme, state.setDarkTheme];
			case "light":
				return [state.colorSchemePref, state.lightTheme, state.setLightTheme];
		}
	});
	return { colorSchemePref, theme, setTheme };
}
