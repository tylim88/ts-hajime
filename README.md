# TS-Hajime 🌸

Effortlessly bootstrap strongly-typed TypeScript npm libraries with minimal configuration and a focus on developer experience.

## 🌟 Features

- **Minimal Setup & Visual Clarity**: Enjoy sensible defaults that keep your project setup clean.
- **Developer-Centric**: Built with tools like `pkgroll`, `tsx`, `tsup`, `vitest`, and `@clack/prompts`.
- **Comprehensive Configurations**:
  - Use `biome` instead of `eslint` and `prettier` for linting and formatting. (please install `biome` extension in your editor)
  - Preconfigured `tsconfig`, `vitest`, `package.json`, and `.gitignore` files.
  - Ready-to-use GitHub Actions, pre-commit hooks, and npm scripts.
  - Examples and tests included for both library code and `npx` commands.
- **ESM & CJS Support**: Outputs both ESM and CJS modules.
- **Optimized for VSCode**: Pre-configured with file nesting, auto-prettify on save, and a specified TypeScript TSDK path.
- **Fully Customizable**: Exposed configurations allow for complete customization to fit your needs.

## 🚀 Getting Started

1. Run the command below to bootstrap your project:

   ```bash
   npx ts-hajime
   ```

Here’s what your project structure will look like:

![Folder Structure](./img.png)

## ⚙️ Key Commands

- **Build**: `npm run build`
- **Test**: `npm test`
- **Lint & Fix**: `npm run lint`
- **Type Check**: `npm run tsc`  
- **Try `npx` Command Locally**: `npm run npx`  
  _(Modify the `npx` script in `package.json` to suit your project requirements.)_

Enjoy coding! 🌸
