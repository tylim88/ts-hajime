#!/usr/bin/env node
import { cac } from 'cac'

const cli = cac()

cli.command('GreetingAPP <name>')

const { args } = cli.parse()

console.log(`Hi ${args[0]}!`)
