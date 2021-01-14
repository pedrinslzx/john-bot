import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

export { Command } from '../bot'

export default async function RegisterFileCommands(): Promise<void> {
  await Promise.all(
    readdirSync(__dirname)
      .filter(path => path.endsWith('.ts') && !path.startsWith('index'))
      .map(async path => {
        try {
          readFileSync(join(__dirname, path))
          return await import('./' + path)
        } catch (e) {
          return null
        }
      })
  )
}
