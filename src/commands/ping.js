import { addReport } from '../utils/report'

let index = 0

export default {
  name: 'ping',
  description: 'Te mostra o meu ping  :)',
  examples: ['ping'],
  handler: async function Handler(message) {
    const m = await message.channel.send(`🏓 **| Pong!**`)
    m.edit(`🏓 **| Pong!**\nLatência do Server: **${m.createdTimestamp -
      message.createdTimestamp}ms.**\nLatência da API: **${Math.round(
      this.client.ws.ping
    )}ms**`)
  }
}
