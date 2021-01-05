import { PresenceData } from 'discord.js'
import { Event } from '.'
import { Config } from '../../config'
import { getInviteBotURL } from '../../utils'

type TagType = {
  // eslint-disable-next-line no-unused-vars
  [key in Config['tag']]: PresenceData['status']
}

const ready = [
  new Event('ready', async bot => {
    const tags: TagType = {
      production: 'online',
      development: 'dnd',
      beta: 'idle'
    }
    await bot.client.user?.setPresence({
      status: tags[bot.config.tag] || 'idle',
      activity: {
        name: `${bot.config.prefix}help`,
        type: 'WATCHING',
        url:
          process.env.DISCORD_CLIENT_ID &&
          getInviteBotURL(process.env.DISCORD_CLIENT_ID)
      }
    })
  })
]

export default ready
