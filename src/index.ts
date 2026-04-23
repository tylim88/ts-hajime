#!/usr/bin/env node
import { cp, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import {
	cancel,
	confirm,
	intro,
	isCancel,
	outro,
	progress,
	text,
} from '@clack/prompts'
import { execa } from 'execa'
import validatePackageName from 'validate-npm-package-name'
;(async () => {
	intro('⭐ Create Your Typescript Package')

	const projectName = (await text({
		message: 'Enter project name',
		placeholder: 'my-package',
		initialValue: 'my-package',
		validate: (value) => {
			if (!value) return 'invalid npm package name, press backspace to clear'
			const result = validatePackageName(value)
			if (!result.validForNewPackages)
				return (
					result.errors?.[0] ||
					'invalid npm package name, press backspace to clear'
				)
		},
	})) as string

	if (isCancel(projectName)) {
		cancel('Operation cancelled.')
		process.exit(0)
	}
	const npxOption = await confirm({
		message: 'Setup npx command?',
	})

	if (isCancel(npxOption)) {
		cancel('Operation cancelled.')
		process.exit(0)
	}
	const p = progress({ max: 10 })
	p.start('Copying template...')
	const destination = resolve(process.cwd(), projectName)
	await cp(
		resolve(
			// this is needed because in local it is esm, in npm it is cjs
			import.meta.dirname || __dirname,
			'../template',
		),
		destination,
		{
			recursive: true,
		},
	)

	if (npxOption) {
		await rename(
			`${destination}/package.json.npx`,
			`${destination}/package.json`,
		)
	} else {
		await rm(`${destination}/npx`, { recursive: true })
		await rm(`${destination}/tsdown.npx.ts`)
		await rm(`${destination}/tsconfig.npx.json`)
		await rm(`${destination}/package.json.npx`)
	}
	await rename(`${destination}/.npmignore`, `${destination}/.gitignore`).catch(
		() => {
			// this will throw error in development, but it is fine because .npmignore only exist after downloading from npm
			// https://stackoverflow.com/a/79929897/5338829
		},
	)

	await writeFile(
		`${destination}/package.json`,
		(await readFile(`${destination}/package.json`))
			.toString()
			.replaceAll('my-package', projectName),
	)
	p.advance(3, 'Copy complete!')
	p.advance(5, 'Installing node modules...')
	await execa(
		// have to rename biome.jsonc because of nested config conflict
		`cd ${resolve(process.cwd(), projectName)} && npm run setup && mv biome.jsonc_ biome.jsonc`,
		{
			shell: true,
		},
	)
	p.stop('Installed!')
	outro('⭐ All done, enjoy!')
})()
