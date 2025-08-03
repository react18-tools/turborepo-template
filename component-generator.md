# 🧱 React Component Generator Guide

This generator helps you scaffold components consistently.

### Usage

```bash
pnpm plop rc
```

### Prompts Explained

| Prompt                | Description                                     |
| --------------------- | ----------------------------------------------- |
| Package Path          | Target package to add the component to          |
| Component Name        | Supports nested paths like `form/InputText`     |
| Is Client Component   | Adds `"use client"` directive                   |
| Create .module.scss   | Adds a scoped SCSS module                       |
| Create Unit Test File | Adds a Vitest + React Testing Library stub      |
| Description           | Added to the top of the component file as JSDoc |

### Example Output

For a component named `form/InputText`, files generated:

```
lib/src/client/form/input-text/
  ├── input-text.tsx
  ├── input-text.module.scss
  ├── input-text.test.tsx
  └── index.ts             <-- export file
```

Nested `index.ts` files are created as needed, and exports are appended.

The generator also modifies your `package.json` to expose these components.
