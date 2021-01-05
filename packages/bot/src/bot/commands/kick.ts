import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Command } from '.'

const KickCommand = new Command(
  'kick',
  'Dá kick no usuario mencionado',
  [],
  async (bot, message, args) => {
    const author = message.guild.member(message.author)
    const me = message.guild.member(bot.client.user)

    if (author.permissions.has(['KICK_MEMBERS'])) {
      if (me.permissions.has(['KICK_MEMBERS'])) {
        const user = message.mentions.users.first()
        if (user) {
          const member = message.guild.member(user)
          if (member) {
            member
              .kick(
                `${user.tag} foi kickado por ${message.author.tag} em ${format(
                  new Date(),
                  'PP às pp',
                  {
                    locale: ptBR
                  }
                )}`
              )
              .then(() => {
                message.reply(
                  `acertei em cheio ${user.tag}, deve ter ido longe :)`
                )
              })
              .catch(err => {
                message.reply(
                  'não deu certo meu chute, que que eu tente novamente só manda'
                )
                // eslint-disable-next-line no-console
                console.error(err)
              })
          } else {
            message.reply('ele não ta no server :(')
          }
        } else {
          message.reply('você tem que mencionar um `user` né ADM')
        }
      } else {
        message.reply('eu não posso fazer isso :(')
      }
    } else {
      message.reply('eu sei que tu não pode fazer isso :)')
    }
  }
)

export default KickCommand
