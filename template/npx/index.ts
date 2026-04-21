#!/usr/bin/env node
import { text } from '@clack/prompts'

const name = (await text({
	message: 'Enter your name',
	placeholder: 'Red',
	initialValue: 'Red',
})) as string

console.log(`Hi ${name}!`)
