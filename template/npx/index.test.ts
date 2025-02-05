import { expect, it } from 'vitest'
import { execa } from 'execa'

it('test cli', async () => {
	const { stdout } = await execa`npm run npx John`
	expect(stdout).toContain('Hi John!')
})
