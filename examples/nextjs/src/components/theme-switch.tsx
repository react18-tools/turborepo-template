"use client";

import { ColorSwitch, useTheme } from "nextjs-themes";

export default function ThemeSwitch() {
  const { theme } = useTheme();
  return (
    <p>
      <span>{theme}</span>
      <ColorSwitch />
    </p>
  );
}
