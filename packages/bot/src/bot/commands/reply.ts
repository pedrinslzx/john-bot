import { Command } from '.'

const ReplyCommand = new Command(
  'reply',
  'Posso reponse qualquer duvida',
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
      return await message.reply('nao posso ler mais que 1000 caractetes.')
    } else {
      const res = Math.floor(Math.random() * respostas.length)
      await message.reply(respostas[res])
    }
  }
)

export default ReplyCommand
