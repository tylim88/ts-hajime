import { execa } from 'execa'
import { expect, it } from 'vitest'

it('test cli', async () => {
	const { stdout } = await execa`npm run npx John`
	expect(stdout).toContain('Hi John!')
})
