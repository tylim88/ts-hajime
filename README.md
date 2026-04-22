# ts-hajime

Bootstrap a TypeScript npm library in one command.

```sh
npx ts-hajime
```

## What you get

- **Biome** for linting and formatting (install the [Biome VSCode extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome))
- **tsup** for building — outputs both ESM and CJS
- **vitest** for testing
- **tsx** for running TypeScript directly
- Preconfigured `tsconfig.json`, `vitest.config.ts`, `biome.jsonc`, and `package.json`
- GitHub Actions CI, Husky pre-commit hooks, and `.gitignore` out of the box
- Example code for both library exports and `npx` commands
- VSCode settings: file nesting, format-on-save, TSDK path

![Folder Structure](https://github.com/tylim88/ts-hajime/raw/main/img.png)

## Commands

| Command | Description |
|---|---|
| `npm run build` | Build the library |
| `npm test` | Run tests |
| `npm run lint` | Lint and auto-fix |
| `npm run tsc` | Type check |
| `npm run npx` | Test your `npx` command locally |