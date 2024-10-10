import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config({
	// rules: {
	// 	'@typescript-eslint/no-unused-vars': 'warn',
	// },
	files: ['/src'],
	extends: [
		eslint.configs.recommended,
		...tseslint.configs.recommended,
		eslintPluginPrettierRecommended, // must be the last plugin
	],
})
