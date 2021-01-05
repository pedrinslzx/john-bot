import { Bot } from './bot'

const bot = new Bot(process.env.DISCORD_TOKEN || '')

bot.start().catch(console.error)
