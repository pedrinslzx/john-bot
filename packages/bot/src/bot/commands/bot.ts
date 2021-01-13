import { MessageEmbed } from 'discord.js'
import { Command } from '.'
import { checkPermission } from '../../utils'

export const PingCommand = new Command(
  'ping',
  'Te mostra o meu ping',
  [],
  async (bot, message) => {
    const m = await message.channel?.send('🏓 **| Pong!**')
    m.edit(
      `🏓 **| Pong!**\nLatência do Server: **${
        m.createdTimestamp - message.createdTimestamp
      }ms.**\nLatência da API: **${Math.round(bot.client.ws.ping)}ms**`
    )
  },
  { type: 'bot', acceptDM: true }
)

export const HelpCommand = new Command(
  'help',
  'Lista todos os comandos',
  ['h', 'ajuda'],
  function Handler(bot, message, args) {
    const msg = new MessageEmbed()
    msg.setTitle('Help')
    if (typeof args[0] === 'string') {
      if (bot.commands.has(args[0])) {
        const cmd = bot.commands.get(args[0])
        let err = false
        if (cmd) {
          if (
            cmd.config &&
            cmd.config.permissions &&
            !checkPermission(message.member, cmd.config.permissions)
          ) {
            err = true
            msg.setTitle('Error **404**')
            msg.setDescription('Este comando não existe :(')
            msg.addField('Tente', `\`${bot.config.prefix}help\``, true)
            msg.setColor(0xe74c3c)
          }
          if (
            cmd.config &&
            !cmd.config.acceptDM &&
            message.channel.type === 'dm'
          ) {
            err = true
            msg.setTitle('Error **404**')
            msg.setDescription('Este comando não existe :(')
            msg.addField('Tente', `\`${bot.config.prefix}help\``, true)
            msg.setColor(0xe74c3c)
          }
          const aliases = [`\`${bot.config.prefix}${cmd?.name}\``]
          if (
            cmd.aliases.length &&
            cmd.aliases.length > 0 &&
            cmd.aliases[0] !== ''
          ) {
            cmd.aliases.forEach(alias =>
              aliases.push(`\`${bot.config.prefix}${alias}\``)
            )
          }
          if (!err) {
            msg.setTitle(`Commando ${cmd.name}`)
            msg.setDescription(cmd.description)
            msg.addField('Aliases', aliases.join(' ou '))
          }
        }
      } else {
        msg.setTitle('Error **404**')
        msg.setDescription('Este comando não existe :(')
        msg.addField('Tente', `\`${bot.config.prefix}help\``, true)
        msg.setColor(0xe74c3c)
      }
    } else {
      msg.setDescription('Aqui está oque eu posso fazer :)')
      msg.addFields(
        bot.commands
          .filter(command => !command.isAlias)
          .filter(command =>
            command.config && command.config.permissions
              ? checkPermission(message.member, command.config.permissions)
              : true
          )
          .filter(
            command =>
              !(
                command.config &&
                !command.config.acceptDM &&
                message.channel.type === 'dm'
              )
          )
          .map(command => {
            const value = [`\`${bot.config.prefix}${command.name}\``]
            if (command.aliases.length > 0 && command.aliases[0] !== '') {
              command.aliases.forEach(alias =>
                value.push(`\`${bot.config.prefix}${alias}\``)
              )
            }
            return {
              name: `${command.name} - ${command.description}`,
              value: value.join(' ou ')
            }
          })
      )
      msg.addField(
        'Para saber mais digite:',
        `\`${bot.config.prefix}help {comando}\``
      )
      msg.setColor(bot.config.color)
    }
    msg.setTimestamp(new Date())
    message.channel.send(msg)
  },
  { type: 'bot', acceptDM: true }
)
