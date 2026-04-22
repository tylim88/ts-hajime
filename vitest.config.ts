import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		include: ['src/**.test.ts'],
		coverage: {
			enabled: true,
			include: ['src/**'],
			exclude: [...(configDefaults.coverage.exclude || []), '**/index.ts'],
		},
	},
})
