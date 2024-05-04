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

✅ Plus, this readme file includes a quick checklist for configuring Codecov and other badges, setting up your docs website on GitHub pages, and more. See [Checklist](#step-by-step-instructions-and-checklist).

#### Create a library that is

✅ Fully Treeshakable (import from `@mayank1513/fork-me/client/component`)

✅ Fully TypeScript Supported

✅ Leverages the power of React 18 Server components

✅ Compatible with all React 18 build systems/tools/frameworks

✅ Documented with [Typedoc](https://react18-tools.github.io/turborepo-template) ([Docs](https://react18-tools.github.io/turborepo-template))

## Introduction

This template is based on the official starter Turbo Repo but includes additional features tailored for creating and publishing JavaScript/TypeScript libraries, particularly for React 18.

## Getting Started:

Click on the `"Use this template"` button to customize it for your next JavaScript/TypeScript/React/Vue/Next.js library or project.

## What's Different?

Compared to the default scaffold from create-turbo, this template offers:

- Unit tests with `vitest`
- Build setup with `tsup` and `esbuild-react18-useclient` that supports React Server components out of the box
- **Automatic file generation**
  - Simply run `yarn plop` and follow the prompts to auto-generate your new component with test files and dependency linking, adhering to best practices automatically
- GitHub actions/workflows to auto-publish your package when the version changes
- GitHub action/workflow + pre-install scripts to automatically rebrand your repo on creation

## Step-by-Step Instructions and Checklist

- [ ] Star [this repository](https://github.com/react18-tools/turborepo-template/) for easy access and to show your support
- [ ] Create a new GitHub repository using this template.
  - [ ] Click `Use this template` button at the top right -> `Create a new repository`
  - [ ] Set your library name as the repository name (This template has automation workflows to customize your repo, assuming the repo name as the library name.)
  - [ ] Click `Create repository` and wait for the setup workflow to finish rebranding your repo.
- [ ] Install and set up Node.js and your IDE (VSCode recommended)
- [ ] Install the recommended VSCode extensions - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [Trello Kanban](https://marketplace.visualstudio.com/items?itemName=mayank1513.trello-kanban-task-board)
- [ ] Install dependencies using `pnpm`
  - [ ] If `pnpm` is not installed, run `npm i -g pnpm@9.0.5` to install `pnpm`, then run `pnpm setup` to set up `pnpm` for global installations
  - [ ] Run `pnpm i` to install dependencies; the `preinstall` script will automatically adjust workflows and create a commit
  - [ ] Run `pnpm i -g turbo` to install `turbo` globally (Occasionally, due to TypeScript and Plop version conflicts, code generation requires global `turbo`).
  - [ ] Run `turbo gen react-component`, and follow prompts to generate server or client components for your library
    - [ ] Use `snake-case` for your component name - it will be automatically converted to `PascalCase`
    - [ ] Your component and test files will be created in `**/src/client/` or `**/src/server/` directory, depending on whether you choose a `client` or `server` component
- [ ] Run `node scope.js` from the root directory if you want to publish a

scoped package.

- [ ] Assumption: Your npm username is the same as your GitHub account or organization username.
- [ ] Make sure `owner` is set to your <npmjs.com> username before running the above command.
- [ ] Set up `CodeCov`
  - [ ] Visit Codecov and set up your repo
  - [ ] Create [repository secret](https://github.com/react18-tools/turborepo-template/settings/secrets/actions) for `CODECOV_TOKEN`
- [ ] Set up `CodeClimate`
  - [ ] Visit CodeClimate and set up your repo
  - [ ] Create [repository secret](https://github.com/react18-tools/turborepo-template/settings/secrets/actions) for `CC_TEST_REPORTER_ID`
  - [ ] Add `*.test.*` to ignore patterns on the website
  - [ ] Update Code Climate badge
- [ ] Add `NPM_AUTH_TOKEN` to repository secrets to automate package publishing
  - [ ] Log in to your [`npm` account](https://www.npmjs.com/login) and create an automation token
  - [ ] Create a new repository secret `NPM_AUTH_TOKEN`
- [ ] Update description in `lib/@mayank1513/fork-me/package.json`
- [ ] Update Repo Stats by visiting and setting up [repobeats](https://repobeats.axiom.co/)
- [ ] Create your library and update examples
- [ ] Update README
- [ ] Set up GitHub pages to deploy docs
  - [ ] Go to [repo settings](https://github.com/react18-tools/turborepo-template/settings/pages) -> pages (On the left panel); Select deploy from a branch; Then Select `main` and `/docs`
- [ ] (Optional) Set up [Deepsource](https://app.deepsource.com/login) for static code analysis
- [ ] Push your changes/Create PR and see your library being automatically tested and published
- [ ] Optionally deploy your examples to Vercel.
- [ ] Update sponsorship URLs.
- [ ] Feel free to star this template, contribute, and/or sponsor the `terbo-repo-template` project or my other open-source work
- [ ] You can also fork the [`terbo-repo-template`](https://github.com/react18-tools/turbo-repo-template/fork) and add your package to `packages/shared-ui/src/examples/featured.json`
  - [ ] If approved, your package will be automatically added to FEATURED.md and also published on the home page of this repo.

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
