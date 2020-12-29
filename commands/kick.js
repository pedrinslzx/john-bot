import {format} from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default {
  name: 'kick',
  description: 'Dá kick no usuario mencionado',
  examples: ['kick', 'kick <@!$=client.user.id$>', 'kick @$=client.user.username$'],
  handler: async function Handler(message, _args){
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const author = message.guild.member(message.author);
    const me = message.guild.member(this.client.user);
    // If we have a user mentioned
    if (author.permissions.has(['KICK_MEMBERS'])) {
      console.log(me)
      console.log(me.permissions)
      console.log(me.permissions.has(['KICK_MEMBERS']))
      if (me.permissions.has(['KICK_MEMBERS'])) {
        const user = message.mentions.users.first();
        if (user) {
          // Now we get the member from the user
          const member = message.guild.member(user);
          // If the member is in the guild
          if (member) {
            /**
             * Kick the member
             * Make sure you run this on a member, not a user!
             * There are big differences between a user and a member
             */
            member
              .kick(`${user.tag} foi kickado por ${author.tag} em ${format(new Date(), 'PP às pp', {
                locale: ptBR
              })}`)
              .then(() => {
                // We let the message author know we were able to kick the person
                message.reply(`acertei em cheio ${user.tag}, deve ter ido longe :)`);
              })
              .catch(err => {
                // An error happened
                // This is generally due to the bot not being able to kick the member,
                // either due to missing permissions or role hierarchy
                message.reply('não deu certo meu chute, que que eu tente novamente só manda');
                // Log the error
                console.error(err);
              });
          } else {
            // The mentioned user isn't in this guild
            message.reply("ele não ta no server :(");
          }
          // Otherwise, if no user was mentioned
        } else {
          message.reply("você tem que mencionar um `user` né ADM");
        }
      } else {
        message.reply("eu não posso fazer isso :(");
      }
    } else {
      message.reply("eu sei que tu não pode fazer isso :)");
    }
  }
}