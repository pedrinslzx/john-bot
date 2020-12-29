import {Client} from 'discord.js'
import config from './config'
import commands from './commands'
import * as reporter from './utils/report'

const bot = new Client()

bot.on('ready', () => console.log(`To logado no discord como ${bot.user.tag}`))

bot.on('message', message => {
  console.log(message.content)
  if (!config.accept.dm && !message.channel.type === 'dm') return;
  if (!config.accept.news && !message.channel.type === 'news') return;
  if(message.author.bot) return
  if(!message.content.startsWith(config.prefix)) return

  const [command, ...args] = message.content.split(' ')
  const commandLike = command.split('!')[1]
  try {
    if(commands[commandLike]){
      if(commands[commandLike].handler) {
        const callCommand = commands[commandLike].handler.bind({
          config,
          commands,
          client: bot
        })
        callCommand(message, args)
      }
    }else{
      if(!(message.author.id in config.ignore.users)){
          reporter.addReport('command', {
          message: {
            content: message.content,
            command: {
              sended: command,
              commandLike
            },
            args
          },
          user: {...message.author},
          now: new Date().toUTCString(),
        })
      }
    }
  } catch(e){
    let error = e;
    if(!(e instanceof Error)){
      error = new Error(e)
    }

    console.error('[message]', error)
    reporter.addReport('message-error', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      error
    })
  }
})
// Create an event listener for new guild members
bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});


bot.on('error', error => reporter.addReport('command', {
  ...error,
  now: new Date().toUTCString(),
}))
bot.on('shardError', (error, errorNumber) => reporter.addReport('command', {
  ...error,
  now: new Date().toUTCString(),
  errorNumber
}))

bot.login(process.env.DISCORD_TOKEN)