import { Bot } from './bot'
import './commands'
import './events'

const bot = new Bot(process.env.DISCORD_TOKEN)

bot.client.on('message', message => {
  if (!bot.config.accept.dm && message.channel.type === 'dm') return
  if (!bot.config.accept.news && message.channel.type === 'news') return
  if (message.author.bot) return
  if (!message.content.startsWith(bot.config.prefix)) return

  const [command, ...args] = message.content.split(' ')
  const commandLike = command.split('!')[1]
  try {
    if (bot.commands.has(commandLike)) {
      const command = bot.commands.get(commandLike)
      command.run(bot, message, args)
    }
  } catch (e) {
    let error = e
    if (!(e instanceof Error)) {
      error = new Error(e)
    }

    console.error('[message]', error)
  }
})

bot.client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(
    ch => ch.name === 'member-log'
  )
  if (!channel) return
  ;(channel as any).send(`Welcome to the server, ${member}`)
})
