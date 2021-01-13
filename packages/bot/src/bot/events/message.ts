import { Event } from '.'
import { checkPermission } from '../../utils'

const message = [
  new Event('message', async (bot, message) => {
    const botMentionText = `<@!${bot.client.user?.id}> `
    const content = message.content.toLowerCase()
    if (message.author.bot) return
    if (
      message.channel.type !== 'dm' &&
      !content.startsWith(bot.config.prefix.toLowerCase()) &&
      !content.startsWith(botMentionText)
    ) {
      return
    }
    if (!bot.config.accept.news && message.channel.type === 'news') return

    try {
      const [cmd, ...args] = message.content.split(/ +/)

      let commandLike = content
        .split(
          content.startsWith(botMentionText)
            ? botMentionText
            : bot.config.prefix.toLowerCase()
        )[1]
        ?.trim()
        ?.split(/ +/)[0]
      if (content.startsWith(botMentionText)) {
        args.shift()
      }
      if (
        message.channel.type === 'dm' &&
        !content.startsWith(botMentionText) &&
        !content.startsWith(bot.config.prefix.toLowerCase())
      ) {
        commandLike = cmd.toLowerCase()
      }
      if (bot.config.tag === 'development' && bot.config.devLogs) {
        console.log([commandLike, args])
      }
      if (bot.commands.has(commandLike)) {
        const command = bot.commands.get(commandLike)
        if (command) {
          if (command.config) {
            if (
              command.config.acceptDM &&
              !command.config.acceptDM &&
              message.channel.type === 'dm'
            ) {
              return
            }
            if (command?.config?.permissions) {
              if (
                !checkPermission(message.member, command.config.permissions)
              ) {
                message.reply(
                  'você não tem poder suficiente para utilizar deste poder'
                )
                return
              }
            }
          }
          command.run(bot, message, args)
        }
      } else {
        message.reply(
          `não achei o comando \`${commandLike}\`, tente \`${bot.config.prefix}help\``
        )
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
