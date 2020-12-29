import { MessageEmbed } from 'discord.js'
import { renderThis } from '../utils/render'

export default {
  name: 'help',
  description: 'Lista todos os comandos :)',
  examples: ['help'],
  handler: function Handler(message, args) {
    const msg = new MessageEmbed()
    msg.setTitle('Help')
    if (typeof args[0] === 'string') {
      const cmd = this.commands[args[0]]
      if (cmd) {
        msg.setDescription(`Commando ${cmd.name}`)
        msg.addField('Descrição', cmd.description)
        msg.addFields(
          cmd.examples.map((example, i) => {
            const rExample = renderThis(example, this)
            return {
              name: i === 0 ? 'Use assim' : 'ou',
              value: `\`${this.config.prefix}${rExample}\``,
              inline: true
            }
          })
        )
      } else {
        msg.setDescription('Erro 404')
        msg.addField('Message', 'Este comando não existe :(', true)
        msg.addField('Tente', `\`${this.config.prefix}help\``)
        msg.setColor(0xe74c3c)
      }
    } else {
      msg.setDescription('Aqui está oque eu posso fazer :)')
      msg.addFields([
        ...Object.keys(this.commands).map(commandName => {
          const command = this.commands[commandName]
          return {
            name: `${command.name} - ${command.description}`,
            value: command.examples
              .map(
                example =>
                  `\`${this.config.prefix}${renderThis(example, this)}\``
              )
              .slice(0, 3)
              .join(' - ')
          }
        })
      ])
      msg.setColor(this.config.color)
    }
    msg.setTimestamp(new Date())
    message.channel.send(msg)
  }
}
