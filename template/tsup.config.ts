import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['npx/index.ts'],
	clean: true,
	minify: true,
	format: ['esm'],
	tsconfig: 'tsconfig.npx.json',
	outDir: 'bin',
})
