import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			enabled: true,
			exclude: [...(configDefaults.coverage.exclude || []), 'bin'],
		},
	},
})
