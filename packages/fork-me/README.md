# Fork Me React.js component

A simple fork me component for React.js projects!

## Install

```bash
$ pnpm add @mayank1513/fork-me
# or
$ npm install @mayank1513/fork-me
# or
$ yarn add @mayank1513/fork-me
```

## Add on your page

```ts
<ForkMe gitHubUrl="https://github.com/mayank1513/turborepo-template" />
// and
<StarMe gitHubUrl="https://github.com/mayank1513/turborepo-template" />
```

You need to import styles for ForkMe component

```ts
import "@mayank1513/fork-me/server/index.css";
```

## Optional parameters

```ts
	text?: string; // replace the Fork me on GitHub text
	width?: string | number; // if you need to adjust the width of the ribbon (length)
	height?: string | number; // to adjust height of the ribbon
	bgColor?: string; // background color
	textColor?: string; // text color
```

> This package also serves as an example to demonstrate how to build and publish `React.js` library compatible with React Server Components
