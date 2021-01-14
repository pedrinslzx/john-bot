import { format } from 'date-fns'
import { Command } from '.'
import config from '../../config'

const KickCommand = new Command(
  'kick',
  'Dá kick no usuario mencionado',
  [],
  async (bot, message, _args) => {
    const author = message.guild?.member(message.author)
    const me = message?.guild?.member(bot.client?.user || '')

    if (author?.permissions.has(['KICK_MEMBERS'])) {
      if (me?.permissions.has(['KICK_MEMBERS'])) {
        const user = message.mentions.users.first()
        if (user) {
          const member = message.guild?.member(user)
          if (member) {
            member
              .kick(
                `${user.tag} foi expulso por ${message.author.tag} em ${format(
                  new Date(),
                  'PP às pp',
                  {
                    locale: bot.config.locale
                  }
                )}`
              )
              .then(() => {
                message.reply(
                  `acertei em cheio o ${user.tag}, deve ter ido longe :)`
                )
              })
              .catch(err => {
                message.reply(
                  'não deu certo, que que eu tente novamente só manda'
                )
                console.error(err)
              })
          } else {
            return message.reply('ele não ta no server :(')
          }
        } else {
          return message.reply('você tem que mencionar um `user` né ADM')
        }
      } else {
        return message.reply('eu não posso fazer isso :(')
      }
    } else {
      return message.reply('eu sei que tu não pode fazer isso :)')
    }
  },
  { type: 'moderation', permissions: 'KICK_MEMBERS', acceptDM: false },
  {
    usage: [
      'Utilize este comando para dar um **kick** mais rápido',
      `Para isso digite \`${config.prefix}kick {menção ao usuário a ser expulso}\`, depois disto o bot enviara uma mensagem confirmando se foi possível expulsar o usuário`
    ]
  }
)

export default KickCommand
