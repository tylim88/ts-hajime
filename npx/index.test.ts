import { expect, it } from 'vitest'
import { execa } from 'execa'

it('test cli with flag and last name', async () => {
	const { stdout } = await execa`npm run npx John Wick -- --time evening`
	expect(stdout).toContain('Good evening John Wick!')
})
it('test cli with first name only', async () => {
	const { stdout } = await execa`npm run npx Kobe`
	expect(stdout).toContain('Good morning Kobe!')
})
