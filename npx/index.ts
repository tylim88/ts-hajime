#!/usr/bin/env node
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { execaSync } from 'execa'
import { cac } from 'cac'

const cli = cac('ts-hajime')

const getDirname = () => {
	if (typeof __dirname === 'undefined') {
		return dirname(fileURLToPath(import.meta.url))
	} else {
		return __dirname
	}
}

cli.command('ts-hajime <app-name>', 'create a project')

const { args } = cli.parse()

console.log('Copying...')
execaSync`cp -r ${resolve(getDirname(), '../template')} ${resolve(process.cwd(), args[0])}`
console.log('Copy complete! Installing node modules...')
execaSync('npm', ['i'], { cwd: args[0] })
console.log('Installation complete! Have fun!')
