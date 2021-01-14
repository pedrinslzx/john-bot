import { formatDistanceToNow } from 'date-fns'
import { ActivityType, PresenceData } from 'discord.js'
import { Event } from '.'
import { Config } from '../../config'
import { getInviteBotURL } from '../../utils'

type TagType = {
  // eslint-disable-next-line no-unused-vars
  [key in Config['tag']]: PresenceData['status']
}

function getPlural(size: number, plural?: string, single?: string): string {
  return size > 1 || size === 0 ? plural || 's' : single || ''
}

const ready = [
  new Event('ready', async bot => {
    const tags: TagType = {
      production: 'online',
      development: 'dnd',
      beta: 'idle'
    }
    let i = 0
    setInterval(async () => {
      const status: Array<[ActivityType, string]> = [
        ['WATCHING', `${bot.config.prefix}help`],
        [
          'LISTENING',
          `${bot.client.channels.cache.size} ${getPlural(
            bot.client.channels.cache.size,
            'canais',
            'canal'
          )}`
        ],
        [
          'LISTENING',
          `${bot.client.users.cache.size} ${getPlural(
            bot.client.users.cache.size,
            'usuarios',
            'usuario'
          )}`
        ],
        [
          'LISTENING',
          `${bot.client.guilds.cache.size} ${getPlural(
            bot.client.guilds.cache.size,
            'servidores',
            'servidor'
          )}`
        ],
        [
          'WATCHING',
          `${bot.commands.filter(c => !c.isAlias).size} ${getPlural(
            bot.commands.filter(c => !c.isAlias).size,
            'comandos',
            'comando'
          )}`
        ],
        [
          'PLAYING',
          formatDistanceToNow(bot.config.startTime, {
            addSuffix: true,
            includeSeconds: true,
            locale: bot.config.locale
          })
        ]
      ]
      await bot.client.user?.setActivity({
        name: status[i % status.length][1],
        type: status[i % status.length][0],
        url:
          process.env.DISCORD_CLIENT_ID &&
          getInviteBotURL(process.env.DISCORD_CLIENT_ID)
      })
      i++
    }, 5000)
    await bot.client.user?.setStatus(tags[bot.config.tag] || 'idle')
  })
]

export default ready
