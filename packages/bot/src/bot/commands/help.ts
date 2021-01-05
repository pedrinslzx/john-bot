import { MessageEmbed } from 'discord.js'
import { Command } from '.'

const HelpCommand = new Command(
  'help',
  'Lista todos os comandos :)',
  ['h', 'ajuda'],
  function Handler(bot, message, args) {
    const msg = new MessageEmbed()
    msg.setTitle('Help')
    if (typeof args[0] === 'string') {
      if (bot.commands.has(args[0])) {
        const cmd = bot.commands.get(args[0])
        const value = [`\`${bot.config.prefix}${cmd.name}\``]
        if (cmd.aliases.length > 0 && cmd.aliases[0] !== '') {
          cmd.aliases.forEach(alias =>
            value.push(`\`${bot.config.prefix}${alias}\``)
          )
        }
        msg.setTitle(`Commando ${cmd.name}`)
        msg.setDescription(cmd.description)
        msg.addFields([
          ...value.map((alias, i) => ({
            name: i === 0 ? 'Use' : 'ou',
            value: alias,
            inline: true
          }))
        ])
      } else {
        msg.setTitle('Error 404')
        msg.setDescription('Este comando não existe :(')
        msg.addField('Tente', `\`${bot.config.prefix}help\``, true)
        msg.setColor(0xe74c3c)
      }
    } else {
      msg.setDescription('Aqui está oque eu posso fazer :)')
      msg.addFields(
        bot.commands
          .map(command => {
            if (command.isAlias) {
              return undefined
            } else {
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
            }
          })
          .filter(aliases => aliases !== undefined)
      )
      msg.addField(
        'Para saber mais digite:',
        `\`${bot.config.prefix}help {comando}\``
      )
      msg.setColor(bot.config.color)
    }
    msg.setTimestamp(new Date())
    message.channel.send(msg)
  }
)

export default HelpCommand
