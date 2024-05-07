# Contribution Guidelines

## Overview

### Included Utilities

This template is equipped with pre-configured tools to streamline your development process:

- Monorepo setup powered by TurboRepo
  - TurboRepo is renowned for its efficient builds and caching mechanisms, minimizing unnecessary builds.
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- Plop-based code generator for effortlessly scaffolding new components
- Automatic rebranding functionality for this template
- Workflows facilitating testing, documentation, dependency updates, and deployment of your docs and packages
- Build setup capable of creating appropriate CJS and ESM builds to support React 18 server and client component exports from the same library
- Out-of-the-box support for SCSS modules for `lib` and `packages/shared`

### Apps and Packages

This TurboRepo comprises the following packages/examples, all written in [TypeScript](https://www.typescriptlang.org/):

- `@example/nextjs`: a [Next.js](https://nextjs.org/) app
- `@example/vite`: a [Vite.js](https://vitest.dev) app
- `@example/remix`: a Remix app
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@repo/jest-presets`: Jest presets for unit testing
- `@repo/logger`: A configurable shared logger utility
- `@repo/shared`: An internal library of components utilized by the examples
- `react18-loaders`: a React component library (The core package published to NPM)

## Automated File Generation

Simply execute `yarn turbo gen` and follow the prompts to automatically generate your new component along with a test file and dependency linking, adhering to best practices.

### Build

To build all apps and packages, execute the following command:

```bash
pnpm build
```

### Development

For development of all apps and packages, run:

```bash
pnpm dev
```

### Running Unit Tests

To execute unit tests, use:

```bash
pnpm test
```

### Linting and Formatting

Before creating a PR, ensure that linting passes and format the code properly with:

```bash
pnpm lint
```

and

```bash
pnpm format
```

## Useful Resources

Explore more about TurboRepo and Next.js through the following links:

- [React and Next.js with TypeScript](https://www.udemy.com/course/react-and-next-js-with-typescript/?referralCode=7202184A1E57C3DCA8B2) - an interactive Next.js course.
- [The Game of Chess with Next.js, React, and TypeScript](https://www.udemy.com/course/game-of-chess-with-nextjs-react-and-typescrypt/?referralCode=851A28F10B254A8523FE)
- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

> Quick tip: Remove all stale branches with `git branch --merged main | grep -v '^[ *]*main$' | xargs git branch -d`

> <img src="https://github.com/react18-tools/turborepo-template/blob/main/popper.png?raw=true" style="height: 20px"/> Consider enrolling in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsoring](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
