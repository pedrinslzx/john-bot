import {addReport} from '../utils/report'

let index = 0

export default {
  name: 'ping',
  description: 'Te mostra o meu ping  :)',
  examples: [ 'ping' ],
  handler: async function Handler(message, _args) {
    const now1 = new Date()
    const msg = await message.channel.send(`Pong! - \`${0}ms\``)
    const now2 = new Date()
    const ping = now2.getMilliseconds() - now1.getMilliseconds()
    if(ping < 0) return msg.edit(`Deu erro aqui, tente denovo`) 
    msg.edit(`Pong! - \`${ping}ms\``)
    if(index === 10){
      addReport('ping', {
        requester: {
          id: message.author.id,
          username: message.author.username,
          tag: message.author.tag,
          isBot: message.author.bot,
        },
        value: ping,
        required_in: now1.toUTCString(),
        ended_in: now2.toUTCString(),
      })
    }
    index++
  }
}