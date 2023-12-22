# Turborepo template

[![test](https://github.com/react18-tools/turborepo-template/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/turborepo-template/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/aa896ec14c570f3bb274/maintainability)](https://codeclimate.com/github/react18-tools/turborepo-template/maintainability) [![codecov](https://codecov.io/gh/react18-tools/turborepo-template/graph/badge.svg)](https://codecov.io/gh/react18-tools/turborepo-template) [![Version](https://img.shields.io/npm/v/@mayank1513/fork-me.svg?colorB=green)](https://www.npmjs.com/package/@mayank1513/fork-me) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/dt/@mayank1513/fork-me.svg)](https://www.npmjs.com/package/@mayank1513/fork-me) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@mayank1513/fork-me) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

## Features

This template offers following pre-configured features. Additionally, your repo will automatically be rebranded with help of workflow and post install scripts.

✅ Monorepo powered by turbo repo to build, test and deploy your library

✅ Next.js, Vite and Remix examples to demonstrate how your library can be used (Feel free to remove Remix as it is still unstable when it comes to monorepo setup and importing from folders)

✅ Examples pre-configured to use Light/Dark theme according to user preference

✅ The examples provided are ready to be deployed to Vercel

✅ Typedoc setup to automatically create documentation for your library based on tsdoc comments

✅ Code of Conduct and contributing files that you can always update

✅ Prettier and linter configured as per the modern best practices (Feel free to add your flavour)

✅ Recommended VSCode extensions - Prettier and [Kanban board](https://github.com/mayank1513/vscode-extension-trello-kanban-board) to auto-format your code and manage your project priorities right within your IDE

✅ Powerful code generators - try yarn turbo gen

✅ Test setup with Vitest - A modern and fast testing framework supporting Jest like APIs

✅ Workflows to automate running tests on every pull-request or code push events

✅ Workflow to automatically publish and create a GitHub release when you update your librari's `package.json` file.

✅ Workflow to automatically rebrand entire template based on the name of the repo you create from this template. (As soon as you create a repo from this template, setup workflow is triggered which renames @mayank1513/fork-me to your repo name and does lots of other fixes to set you up and running.)

✅ With all these features, this readme file contains a quick checklist for you to configure Codecov and other badges, setup your docs website on GitHub pages, etc. See [Checklist](https://github.com/react18-tools/turborepo-template/#checklist).

#### Create a library that is

✅ Fully Treeshakable (import from @mayank1513/fork-me/client/component)

✅ Full TypeScript Support

✅ Unleash the full power of React18 Server components

✅ Works with all build systems/tools/frameworks for React18

✅ Doccumented with [Typedoc](https://react18-tools.github.io/turborepo-template) ([Docs](https://react18-tools.github.io/turborepo-template))

## Introduction

This template is based on the official starter Turborepo but with additional features tailored for creating and publishing JavaScript/TypeScript and specifically React18 libraries.

## Getting started:

Click on the `"Use this template"` button to customize it for your next JavaScript/TypeScript/React/Vue/Next.js library or project.

## What's Different?

Compared to the default scaffold from create-turbo, this template offers:

- Unit tests with `vitest`
- Build setup with `tsup` and `esbuild-react18-useclient` Supports React Server components out of the box
- **Automatic file generation**
  - just run `yarn turbo gen` and follow the prompts to auto generate your new component with test file and dependency linking
  - follow best practices automatically
- GitHub actions/workflows to auto publish your package when version changes
- GitHub action/workflow + preinstall scripts to automatically rebrand your repo on creation

## Step by Step Instructions and Checklist

- [ ] Star [this repo](https://github.com/react18-tools/turborepo-template/) so that you and others can find it more easily for your next projects. It also helps me understand that people are using this repo so that I can maintain the repo and the documentation well.
- [ ] Clone this repo
- [ ] Install and setup Node.js and IDE (I prefer VSCode)
- [ ] Install the recommended VSCode extensions - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [Trello Kanban](https://marketplace.visualstudio.com/items?itemName=mayank1513.trello-kanban-task-board)
- [ ] Install dependencies using `pnpm`
  - [ ] If you don't have `pnpm` installed, run `npm i -g pnpm` to install `pnpm` -> run `pnpm setup` to set up `pnpm` for global installations
  - [ ] Run `pnpm i` to install dependencies and `preinstall` script will automatically touch up workflows and create a commit
  - [ ] Run `pnpm i -g turbo` to install `turbo` globally (Sometime due to `TypeScript` and `Plop` version conflicts code generation requires global `turbo`).
  - [ ] Run `turbo gen react-component`, and follow prompts to generate server or client components for your library
    - [ ] Use `snake-case` for your component name - it will be automatically converted to `PascalCase`
    - [ ] Your component and test files will be created in `**/src/client/` or `**/src/server/` directory depending on whether you choose `client` or `server` component
- [ ] Set up `CodeCov`
  - [ ] Visit codecov and setup your repo
  - [ ] Create repository secrets for `CODECOV_TOKEN`
- [ ] Set up `CodeClimate`
  - [ ] Visit CodeClimate and setup your repo
  - [ ] Create repository secrets for `CC_TEST_REPORTER_ID`
  - [ ] add `*.test.*` to ignore patterns on the website
  - [ ] update code climate badge
- [ ] Add `NPM_AUTH_TOKEN` to repository secrets to automate publishing package
  - [ ] login to your `npm` account and create automation token
  - [ ] Create a new repository secrets `NPM_AUTH_TOKEN`
- [ ] Update description in `packages/@mayank1513/fork-me/package.json`
- [ ] Update Repo Stats by visiting and setting up [repobeats](https://repobeats.axiom.co/)
- [ ] Create your library and update examples
- [ ] Update README
- [ ] Setup GitHub pages to deploy docs
  - [ ] Go to [repo settings](https://github.com/react18-tools/turborepo-template/settings/pages) -> pages (On left panel); Select deploy from a branch; Then Select `main` and `/docs`
- [ ] Push your changes/Create PR and see your library being automatically tested and published
- [ ] Optionally deploy your example(s) to Vercel.
- [ ] You are most welcome to star this template, contribute, and/or sponsor the `terbo-repo-template` project or my other open-source work

## What's inside?

### Utilities

This Turborepo template includes pre-configured tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- Plop based code generator for scaffolding new components
- Automatically rebrand this template to match your repo name

### Apps and Packages

This Turborepo includes the following packages/examples/lib:

- `nextjs`: a [Next.js](https://nextjs.org/) app
- `vite`: a [Vite.js](https://vitest.dev) app
- `fork-me`: a React component library shared by both `Next.js` and `Vite` examples
- `eslint-config-custom`: ESLint configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

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

### 🤩 Don't forger to start [this repo](https://github.com/mayank1513/turborepo-template)!

Want hands-on course for getting started with Turborepo? Check out [React and Next.js with TypeScript](https://mayank-chaudhari.vercel.app/courses/react-and-next-js-with-typescript) and [The Game of Chess with Next.js, React and TypeScrypt](https://www.udemy.com/course/game-of-chess-with-nextjs-react-and-typescrypt/?referralCode=851A28F10B254A8523FE)

![Repo Stats](https://repobeats.axiom.co/api/embed/2ef1a24385037998386148afe5a98ded6006f410.svg "Repobeats analytics image")

## License

Licensed as MIT open source.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
