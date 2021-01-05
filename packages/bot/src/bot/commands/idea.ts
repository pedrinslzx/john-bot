import Discord from 'discord.js'
import { Command } from '.'

const IdeiaCommand = new Command(
  'ideia',
  'Escreva sua ideia',
  ['sugest', 'sugestao'],
  async (bot, message, args) => {
    await message.delete()
    const content = args.join(' ')

    if (!args[0]) {
      return message.channel.send(
        `${message.author.username}, escreva a sugestão após o comando`
      )
    } else if (content.length > 1000) {
      return message.channel.send(
        `${message.author.username}, forneça uma sugestão de no máximo 1000 caractetes.`
      )
    } else {
      const canal = bot.client.channels?.cache.find(
        ch => ch.id === '742191895010082850'
      )
      const msg = await (canal as any)?.send(
        new Discord.MessageEmbed()
          .setColor('#FFFFF1')
          .addField('Autor:', message.author)
          .addField('Conteúdo', content)
          .setFooter('ID do Autor: ' + message.author.id)
          .setTimestamp()
      )
      await message.channel.send(
        `${message.author} a mensagem foi enviada com sucesso!`
      )

      await Promise.all(['✔️', '❎'].map(emoji => msg?.react(emoji)))
    }
  }
)

export default IdeiaCommand
