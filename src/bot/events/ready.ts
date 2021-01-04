import { Event } from '.'

const Ready = new Event('ready', async () => {
  const tags = {
    production: 'online',
    development: 'dnd',
    beta: 'idle'
  }
  await bot.client.user.setPresence({
    status: tags[bot.config.tag] || 'idle',
    activity: {
      name: `${bot.config.prefix}help`,
      type: 'WATCHING',
      url: process.env.PUBLIC_URL && process.env.PUBLIC_URL + '/invite'
    }
  })
})
