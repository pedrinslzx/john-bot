import { Message, TextChannel } from 'discord.js'
import { Command } from '.'
import config from '../../config'

const IdeiaCommand = new Command(
  'ideia',
  'Escreva sua ideia',
  ['suggest', 'sugestao', 'sugestão'],
  async (bot, message, args) => {
    if (message.channel.type !== 'dm') {
      await message
        .delete({
          reason: `Adicionar a sugestão de ${message.author.tag} ao canal de sugestões do servidor`
        })
        .catch(() => console.error('Error ao apagar a mensagem'))
    }
    const content = args.join(' ')

    if (!args[0]) {
      return message.reply('escreva a sugestão após o comando')
    } else if (content.length > 1000) {
      return message.reply('forneça uma sugestão de no máximo 1000 carácteres.')
    } else {
      let canal: TextChannel | undefined
      if (message.channel.type === 'dm') {
        canal = bot.channels?.cache.find(
          ch => ch.id === '797243355071250472'
        ) as TextChannel
      } else {
        const suggestChannel = message.guild?.channels.cache.find(ch =>
          /(sugest(ao|oes|ão|ões|)|ideias|suggest(s|))+/.test(ch.name)
        )
        canal = bot.channels?.cache.find(
          ch => ch.id === suggestChannel?.id
        ) as TextChannel
      }
      if (!canal) return message.reply('não achei o canal para sugestões')
      const msg: Message = await canal.send(
        new bot.utils.EmbedMessage()
          .setTitle('Sugestão')
          .addField('Autor:', message.author)
          .addField('Conteúdo', content)
          .setFooter('ID do Autor: ' + message.author.id)
      )
      for (const emoji of ['✔️', '❎']) await msg.react(emoji)

      await message.reply('a mensagem foi enviada com sucesso!')
    }
  },
  { type: 'server', acceptDM: true, show: true },
  {
    usage: [
      'Você pode enviar uma sugestão para o servidor, ou para o bot',
      `Você pode mandar uma o \`${config.prefix}ideia {sua ideia para o servidor}\`,`,
      'Ou você pode mandar `ideia {sua ideia para o bot}` se você estiver na DM.'
    ]
  }
)

export default IdeiaCommand
