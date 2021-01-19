import { format } from 'date-fns'
import { UserResolvable } from 'discord.js'
import { Command } from '.'
import config from '../../config'

const KickCommand = new Command(
  'kick',
  'Dá kick no usuário mencionado',
  ['mod-kick'],
  async (bot, message, args) => {
    const author = message.guild?.member(message.author)
    const me = message?.guild?.member(bot.user as UserResolvable)

    if (author?.permissions.has(['KICK_MEMBERS'])) {
      if (me?.permissions.has(['KICK_MEMBERS'])) {
        const user = message.mentions.users.first()
        let member = !user ? null : message.guild?.member(user)
        if (!user && typeof args[0] === 'string') {
          const id = args[0]
          console.log(id)
          const idUser = message.guild?.member(id)
          console.log(idUser?.user.tag)
          if (!idUser) {
            return message.reply('você tem que por um usuário valido né ADM')
          }
          member = idUser
        } else {
          return message.reply(
            'você tem que mencionar um usuário valido né ADM'
          )
        }
        const now = new Date()
        if (member) {
          await member
            .kick(
              `${member.user.tag}(${member.id}) foi expulso por ${
                message.author.tag
              } em ${format(now, 'PP', {
                locale: bot.config.locale
              })} às ${format(now, 'pp', {
                locale: bot.config.locale
              })}`
            )
            .catch(err => {
              message.reply(
                'não deu certo, que que eu tente novamente só manda'
              )
              console.error(err)
            })
          message.reply(
            `acertei em cheio o ${member.user.tag}(${member.id}), deve ter ido longe :)`
          )
        } else {
          return message.reply('ele não ta no server :(')
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
      `Para isso digite \`${config.prefix}kick {menção ou id do usuário a ser expulso}\`, depois disto o bot enviara uma mensagem confirmando se foi possível expulsar o usuário`
    ]
  }
)

export default KickCommand
