#!/usr/bin/env node
import { cli } from 'cleye'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { execaSync } from 'execa'

try {
	const argv = cli({
		name: 'ts-hajime',
		parameters: ['<app name>'],
	})
	const __filename = fileURLToPath(import.meta.url)
	const __dirname = path.dirname(__filename)
	fs.copySync(
		path.resolve(__dirname, '../template'),
		path.resolve(process.cwd(), argv._.appName),
	)
	execaSync('npm', ['i'], { cwd: argv._.appName })
	console.log('done, have fun!')
} catch (e) {
	console.error(e)
}
