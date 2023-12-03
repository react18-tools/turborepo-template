"use client";
import { useState, type HTMLProps, useEffect } from "react";

export function Logo(props: HTMLProps<HTMLElement>) {
	/** Default to react18-themes variant for local server - assuming http:// schema for local and https:// for production */
	const [variant, setVariant] = useState("react18-themes");
	useEffect(() => {
		if (window.location.origin.startsWith("https")) setVariant(window.location.origin.split("://")[1].split(".")[0]);
	}, []);
	return <code {...props}>{variant}</code>;
}
