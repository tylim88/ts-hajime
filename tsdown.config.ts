import { defineConfig } from 'tsdown'

export default defineConfig({
	entry: ['src/index.ts'],
	clean: true,
	format: ['cjs'],
	outDir: 'bin',
	shims: true,
	platform: 'node',
  dts: false,
  target: false,
})
