import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['npx/bin.ts'],
	clean: true,
	minify: true,
	format: ['cjs'],
	tsconfig: './tsconfig.npx.json',
	outDir: './bin',
})
