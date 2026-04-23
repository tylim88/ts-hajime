import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: ['npx/index.ts'],
	clean: true,
	format: ['cjs'],
	tsconfig: 'tsconfig.npx.json',
	outDir: 'bin',
	target: false,
})
