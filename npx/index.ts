#!/usr/bin/env node
import { resolve } from 'node:path'
import { readFile, writeFile, cp, rm } from 'node:fs/promises'
import validatePackageName from 'validate-npm-package-name'
import { execa } from 'execa'
import {
	intro,
	outro,
	text,
	confirm,
	isCancel,
	cancel,
	progress,
} from '@clack/prompts'

;(async () => {
	intro('⭐ Create your ESM Typescript Package')

	const projectName = (await text({
		message: 'Enter your project name',
		placeholder: 'my-app',
		initialValue: 'my-app',
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
		message: 'Do you want to setup npx command?',
	})

	if (isCancel(npxOption)) {
		cancel('Operation cancelled.')
		process.exit(0)
	}
	const p = progress()
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
	if (!npxOption) await rm(`${destination}/npx`, { recursive: true })
	await writeFile(
		`${destination}/package.json`,
		(await readFile(`${destination}/package.json`))
			.toString()
			.replaceAll('my-app', projectName)
			.split('\n')
			.filter((line) => npxOption || !line.includes('tsx npx'))
			.join('\n'),
	)
	p.advance(3, 'Copy complete!')
	p.advance(5, 'Installing node modules...')
	await execa(
		`cd ${resolve(process.cwd(), projectName)} && npm run setup && mv .gitignore_ .gitignore && mv biome.jsonc_ biome.jsonc`,
		{
			shell: true,
		},
	)
	p.stop('Installed!')
	outro('⭐ All done, enjoy!')
})()
