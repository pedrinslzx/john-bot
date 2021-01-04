import { readdirSync, readFileSync } from 'fs'
import { resolve } from 'path'
export { Event } from '../bot'

readdirSync(__dirname)
  .filter(path => path.endsWith('.ts') && !path.startsWith('index'))
  .forEach(path => {
    console.log(path)
    try {
      readFileSync(resolve(__dirname, path))
      import('./' + path)
    } catch (e) {
      if (e.code === 'EISDIR') {
        return false
      }
    }
  })
