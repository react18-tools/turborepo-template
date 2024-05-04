# Turborepo Template

[![test](https://github.com/react18-tools/turborepo-template/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/turborepo-template/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/aa896ec14c570f3bb274/maintainability)](https://codeclimate.com/github/react18-tools/turborepo-template/maintainability) [![codecov](https://codecov.io/gh/react18-tools/turborepo-template/graph/badge.svg)](https://codecov.io/gh/react18-tools/turborepo-template) [![Version](https://img.shields.io/npm/v/@mayank1513/fork-me.svg?colorB=green)](https://www.npmjs.com/package/@mayank1513/fork-me) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/@mayank1513/fork-me.svg)](https://www.npmjs.com/package/@mayank1513/fork-me) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@mayank1513/fork-me) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

> [Explore featured packages built with this template.](./FEATURED.md)

> Exciting news! We've launched a new course to help you master this template: [Craft Next Gen UI Libraries for React 18 and Next.js 14](https://www.udemy.com/course/craft-next-gen-ui-libraries-for-react-18-and-nextjs-14/?referralCode=46B8C7845ECCEA99E0EF)

## Features

This template offers the following pre-configured features. Additionally, your repository will automatically be rebranded with the help of workflows and post-install scripts.

✅ Monorepo powered by Turbo Repo for building, testing, and deploying your library

✅ Examples with Next.js, Vite, and Remix to showcase how your library can be utilized (Note: Remix is optional due to instability in monorepo setup and folder imports)

✅ Examples pre-configured for Light/Dark theme based on user preference

✅ Examples ready to be deployed to Vercel

✅ Typedoc setup for automatic documentation generation based on tsdoc comments

✅ Code of Conduct and contributing files, ready for customization

✅ Prettier and linter configured according to modern best practices (Feel free to add your flavor)

✅ Recommended VSCode extensions - Prettier and [Kanban board](https://github.com/mayank1513/vscode-extension-trello-kanban-board) for code formatting and project management directly within your IDE

✅ Powerful code generators - try `yarn plop`

✅ Test setup with Vitest - A modern and fast testing framework supporting Jest-like APIs

✅ Workflows to automate testing on every pull-request or code push event

✅ Workflow to automatically publish and create GitHub releases when you update your library's `package.json` file.

✅ Workflow to automatically rebrand the entire template based on your repository name. (Upon creating a repository from this template, a setup workflow is triggered to rename `@mayank1513/fork-me` to your repo name and perform other necessary fixes to get you up and running.)

✅ Plus, this readme file includes a quick checklist for configuring Codecov and other badges, setting up your docs website on GitHub pages, and more. See [Checklist](./TODO.md).

#### Create a library that is

✅ Fully Treeshakable (import from `@mayank1513/fork-me/client/component`)

✅ Fully TypeScript Supported

✅ Leverages the power of React 18 Server components

✅ Compatible with all React 18 build systems/tools/frameworks

✅ Documented with [Typedoc](https://react18-tools.github.io/turborepo-template) ([Docs](https://react18-tools.github.io/turborepo-template))

## Getting Started:

This template is based on one of the official Turbo Repo starters but comes with a plethora of additional features specifically designed for developing and publishing JavaScript/TypeScript libraries, especially for React 18.

To get started, simply click on the `"Use this template"` button to create a new repository based on this template. Customize it according to your requirements for your next JavaScript/TypeScript/React/Next.js library or project.

For detailed instructions and a checklist, please refer to [TODO.md](./TODO.md).

## What's Different?

Compared to the default scaffold from create-turbo, this template offers:

- Unit tests with `vitest`
- Build setup with `tsup` and `esbuild-react18-useclient` that supports React Server components out of the box
- **Automatic file generation**
  - Simply run `yarn plop` and follow the prompts to auto-generate your new component with test files and dependency linking, adhering to best practices automatically
- GitHub actions/workflows to auto-publish your package when the version changes
- GitHub action/workflow + pre-install scripts to automatically rebrand your repo on creation

## What's Inside?

### Utilities

This Turborepo template includes pre-configured tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- Plop-based code generator for scaffolding new components
- Automatic rebranding of this template to match your repo name

### Apps and Packages

This Turborepo includes the following packages/examples/libraries:

- `nextjs`: a [Next.js](https://nextjs.org/) app
- `vite`: a [Vite.js](https://vitest.dev) app
- `fork-me`: a React component library shared by both `Next.js` and `Vite` examples
- `eslint-config-custom`: ESLint configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json` files used throughout the monorepo

Each package/example is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

### 🤩 Don't forget to star [this repository](https://github.com/mayank1513/turborepo-template)!

Looking for a hands-on course to get started with Turborepo? Check out [React and Next.js with TypeScript](https://mayank-chaudhari.vercel.app/courses/react-and-next-js-with-typescript) and [The Game of Chess with Next.js, React, and TypeScript](https://www.udemy.com/course/game-of-chess-with-nextjs-react-and-typescript/?referralCode=851A28F10B254A8523FE)

![Repo Stats](https://repobeats.axiom.co/api/embed/2ef1a24385037998386148afe5a98ded6006f410.svg "Repobeats analytics image")

## License

Licensed under the MIT open-source license.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
