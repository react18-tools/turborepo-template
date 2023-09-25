# Contributing to fork-me

## What's inside?

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Apps and Packages

This Turborepo includes the following packages/examples:

- `nextjs`: a [Next.js](https://nextjs.org/) app
- `vite`: a [Vite.js](https://vitest.dev) app
- `fork-me`: a React component library shared by both `nextjs` and `vite` examples
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/example is 100% [TypeScript](https://www.typescriptlang.org/).

## Automatic file generation

- just run `yarn turbo gen` and follow the propts to auto generate your new component with test file and dependency linking
- follow best practices automatically

### Build

To build all apps and packages, run the following command:

```bash
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```bash
cd my-turborepo
pnpm dev
```

### Run unit tests

To run unit tests, run the following command:

```bash
cd my-turborepo
pnpm test
```

### Linting and formating

Before creating PR make sure lint is passing and also run formatter to properly format the code.

```bash
cd my-turborepo
pnpm lint
```

and

```bash
pnpm format
```

## Useful Links

Learn more about Turborepo and Next.js:

- [React and Next.js with TypeScript](https://www.udemy.com/course/react-and-next-js-with-typescript/?referralCode=7202184A1E57C3DCA8B2) - an interactive Next.js course.
- [The Game of Chess with Next.js, React and TypeScrypt](https://www.udemy.com/course/game-of-chess-with-nextjs-react-and-typescrypt/?referralCode=851A28F10B254A8523FE)
- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

> A quick tip: Delete all stale branches `git branch --merged main | grep -v '^[ *]*main$' | xargs git branch -d`

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
