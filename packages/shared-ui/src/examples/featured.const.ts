// NPM packages created with this template

import type { CardProps } from "../cards/card";

export const featured: CardProps[] = [
  {
    title: "React18 Global Store",
    description:
      "A simple yet elegant, light weight, react18 global store to replace Zustand for better tree shaking.",
    href: "https://github.com/react18-tools/react18-global-store",
  },
  {
    title: "Nextjs-Themes",
    description: "🤟 👉 Theme with confidence and Unleash the Power of React Server Components",
    href: "https://github.com/react18-tools/nextjs-themes",
  },
  {
    title: "esbuild-plugin-react18",
    description:
      "An esbuild plugin for compiling libraries compatible with React 18 server and client component, Nextjs13, and Nextjs14",
    href: "https://github.com/react18-tools/esbuild-plugin-react18",
  },
  {
    title: "Zustand Sync Tabs",
    description:
      "Zustand middleware to easily sync Zustand state between tabs / windows / iframes (Same Origin)",
    href: "https://github.com/react18-tools/zustand-sync-tabs",
  },
  {
    title: "Persist-And-Sync",
    description:
      "Zustand middleware to easily persist and sync Zustand state between tabs / windows / iframes (Same Origin) ",
    href: "https://github.com/react18-tools/persist-and-sync",
  },
  {
    title: "React 18 Themes",
    description: "🤟 👉 Unleash the Power of React Server Components",
    href: "https://github.com/react18-tools/react18-themes",
  },
];

featured.sort((f1, f2) => f1.title.localeCompare(f2.title));
