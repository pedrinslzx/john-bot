import { Command } from '.'
import config from '../../config'

const ReplyCommand = new Command(
  'reply',
  'Posso responde qualquer duvida',
  ['r', 'responda'],
  async (bot, message, args) => {
    const content = args.join(' ')
    const respostas = [
      'Sim!',
      'Claro!',
      'Não!',
      'Quem sabe, talvez...',
      'Mesmo se eu soubesse não te diria',
      'Sai fora!',
      'Com certeza, hehe',
      'De jeito nenhum!',
      'Não sei'
    ]

    if (content.length < 0) {
      return await message.reply('escreva a pergunta após o comando')
    } else if (content.length > 1000) {
      return await message.reply('nao posso ler mais que 1000 caracteres.')
    } else {
      const res = Math.floor(Math.random() * respostas.length)
      console.log(message.reference)
      await message.reply({
        content: respostas[res],
        reply: message
      })
    }
  },
  { type: 'games', acceptDM: true },
  {
    usage: [
      'Minha amiga **Bola 8** me ensinou alguns truques, se você quiser pode perguntar e irei te responder',
      `Para isso digite: \`${config.prefix}reply {sua pergunta}\`, ou se você estiver na DM \`reply {sua pergunta}\``
    ]
  }
)

export default ReplyCommand
