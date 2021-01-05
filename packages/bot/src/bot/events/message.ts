import { Event } from '.'

const message = [
  new Event('message', async (bot, message) => {
    if (!bot.config.accept.dm && message.channel.type === 'dm') return
    if (!bot.config.accept.news && message.channel.type === 'news') return
    if (message.author.bot) return
    if (!message.content.startsWith(bot.config.prefix)) return

    const [command, ...args] = message.content.split(' ')
    const commandLike = command.split('!')[1]
    try {
      if (bot.commands.has(commandLike)) {
        const command = bot.commands.get(commandLike)
        command?.run(bot, message, args)
      }
    } catch (e) {
      let error = e
      if (!(e instanceof Error)) {
        error = new Error(e)
      }

      console.error('[message]', error)
    }
  })
]

export default message
