#!/usr/bin/env node
import { cli } from 'cleye'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { execaSync } from 'execa'

const getDirname = () => {
	if (typeof __dirname === 'undefined') {
		return dirname(fileURLToPath(import.meta.url))
	} else {
		return __dirname
	}
}

try {
	const argv = cli({
		name: 'ts-hajime',
		parameters: ['<app name>'],
	})
	console.log('Copying...')
	execaSync`cp -r ${resolve(getDirname(), '../template')} ${resolve(process.cwd(), argv._.appName)}`
	console.log('Copy complete! Installing node modules...')
	execaSync('npm', ['i'], { cwd: argv._.appName })
	console.log('Installation complete! Have fun!')
} catch (e) {
	console.error(e)
}
