import { Command } from '.'

const PingCommand = new Command(
  'ping',
  'Te mostra o meu ping  :)',
  ['p'],
  async (bot, message, args) => {
    const m = await message.channel?.send('🏓 **| Pong!**')
    m.edit(
      `🏓 **| Pong!**\nLatência do Server: **${
        m.createdTimestamp - message.createdTimestamp
      }ms.**\nLatência da API: **${Math.round(bot.client.ws.ping)}ms**`
    )
  }
)

export default PingCommand
