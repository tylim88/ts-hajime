#!/usr/bin/env node
import { cli } from 'cleye'
import fs from 'fs'
const argv = cli({
	name: 'ts-hajime',
	parameters: ['<app name>'],
})

const name = argv._.appName
