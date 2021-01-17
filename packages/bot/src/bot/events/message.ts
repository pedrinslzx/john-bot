import { differenceInSeconds } from 'date-fns'
import { User } from 'discord.js'
import { Event } from '.'
import { checkPermission } from '../../utils'
import { Command } from '../bot'

function cooldown(command: Command, user: User) {
  command.cooldown.set(user.id, new Date())
  if (command.config.cooldown) {
    return setTimeout(
      () => command.cooldown.delete(user.id),
      command.config.cooldown * 1000
    )
  }
}

const message: Event<'message'>[] = [
  new Event('message', async (bot, message) => {
    const botMentionText = `<@!${bot.user?.id}> `
    const content = message.content.toLowerCase()
    const prefix = bot.config.prefix.toLowerCase()
    if (message.author.bot) return
    if (
      message.channel.type !== 'dm' &&
      !content.startsWith(prefix) &&
      !content.startsWith(botMentionText)
    ) {
      return
    }
    if (!bot.config.accept.news && message.channel.type === 'news') return

    try {
      const [cmd, ...args] = message.content.split(/ +/)

      let commandLike = content
        .split(content.startsWith(botMentionText) ? botMentionText : prefix)[1]
        ?.trim()
        ?.split(/ +/)[0]
      if (content.startsWith(botMentionText)) {
        args.shift()
      }
      if (
        message.channel.type === 'dm' &&
        !content.startsWith(botMentionText) &&
        !content.startsWith(prefix)
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
            if (command.config.permissions) {
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
          const userCooldown = command.cooldown.get(message.author.id)
          if (userCooldown) {
            const curr = new Date()
            const diff = differenceInSeconds(curr, userCooldown)
            const time = command.config.cooldown || 0
            return message.reply(
              `faltam ${
                time - diff
              } segundos para que você possa utilizar o comando \`${commandLike}\`.`
            )
          } else {
            if (command.config.cooldown) {
              cooldown(command, message.author)
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
