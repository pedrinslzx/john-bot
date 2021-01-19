import { Bot } from './bot'

new Bot(process.env.DISCORD_BOT_TOKEN || '')
  .start()
  .catch(console.error.bind(console))
