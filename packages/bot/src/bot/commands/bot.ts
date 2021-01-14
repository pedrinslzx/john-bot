import { MessageEmbed } from 'discord.js'
import { Command } from '.'
import config from '../../config'
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
  { type: 'bot', acceptDM: true },
  {
    usage: [
      'Você pode ver meu ping com esse comando',
      `Você pode mandar uma o \`${config.prefix}ping\` ou só ping se estiver na DM`
    ]
  }
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
          if (cmd.config) {
            console.log(
              !cmd.config.acceptDM && message.channel.type === 'dm',
              cmd.config.permissions &&
                message.member &&
                !checkPermission(message.member, cmd.config.permissions),
              cmd.config.show && !cmd.config.show
            )
            if (
              (!cmd.config.acceptDM && message.channel.type === 'dm') ||
              (cmd.config.permissions &&
                message.member &&
                !checkPermission(message.member, cmd.config.permissions)) ||
              (cmd.config.show && !cmd.config.show)
            ) {
              err = true
              msg.setTitle('Error **404**')
              msg.setDescription('Este comando não existe :(')
              msg.addField('Tente', `\`${bot.config.prefix}help\``, true)
              msg.setColor(0xe74c3c)
            }
          }
          if (!err) {
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
            msg.setTitle(`Commando ${cmd.name}`)
            msg.setDescription(cmd.description)
            msg.addField(
              'Usage',
              cmd.help.usage instanceof Array
                ? cmd.help.usage.join('\n')
                : cmd.help.usage
            )
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
          .filter(
            cmd =>
              cmd.config &&
              ((!cmd.config.acceptDM && message.channel.type === 'dm') ||
                (cmd.config.permissions &&
                  !checkPermission(message.member, cmd.config.permissions)) ||
                !cmd.config.show)
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
  { type: 'bot', acceptDM: true },
  {
    usage: [
      'Você pode ver todos os comando disponíveis para o seu usuário ou canal/servidor que o comando foi invocado.',
      `Você pode mandar uma o \`${config.prefix}help\` para ver todos os comandos.`,
      `Ou você pode mandar \`${config.prefix}help {comando}\` para saber mais sobre o comando.`,
      `Se você estiver na DM, pode enviar só o comando, como:  ao invés de \`${config.prefix}help\`, pode ser só \`help\`.`
    ]
  }
)
