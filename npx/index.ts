#!/usr/bin/env node
import { resolve } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
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
await execa`cp -r ${resolve(import.meta.dirname, '../template')} ${destination}`
if (!npxOption) await execa`rm -r ${destination}/npx`
writeFileSync(
	`${destination}/package.json`,
	readFileSync(`${destination}/package.json`)
		.toString()
		.replaceAll('my-app', projectName)
		.split('\n')
		.filter((line) => npxOption || !line.includes('tsx npx'))
		.join('\n'),
)
p.advance(3, 'Copy complete!')
p.advance(5, 'Installing node modules...')
await execa(
	`cd ${resolve(process.cwd(), projectName)} && npm run setup && mv .gitignore_ .gitignore`,
	{
		shell: true,
	},
)
p.stop('Installed!')
outro('⭐ All done, enjoy!')
