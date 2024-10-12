import { expect, it } from 'vitest'
import { execa } from 'execa'

it('test cli', async () => {
	const { stdout } = await execa`npm run npx my-app`
	expect(stdout).toContain('done, have fun!')
})
