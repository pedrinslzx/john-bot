import {readdirSync} from 'fs'

const cmds = {}

Promise.all(readdirSync(__dirname, {
  withFileTypes: false
}).map(async commandFile => {
  if(commandFile.split('.')[0] !== 'index'){
    const commandName = commandFile.split('.')[0]
    const command = (await import('./' + commandName)).default
    cmds[command.name] = {
      ...command
    }
  }
})).then(() => console.log(Object.keys(cmds)))

export default cmds