import chalk from 'chalk'
import { TextChannel } from 'discord.js'
import { Event } from '.'
import GuildConfig from '../../schemas/GuildConfig'

const guildEvents = [
  new Event('guildMemberAdd', async (bot, member) => {
    const channel = member.guild.channels.cache.find(
      ch => ch.name === 'member-log'
    )
    if (!channel) {
      return
    }
    ;(channel as TextChannel).send(`Welcome to the server, ${member}`)
  }),
  new Event('guildCreate', async (bot, guild) => {
    await GuildConfig.create({
      guildID: guild.id
    })
    console.log(
      chalk.bold('[ ', chalk.cyan('guild-add'), ' ]'),
      ' ',
      chalk.gray(guild.id),
      ' ',
      chalk.bold(guild.name)
    )
  })
]

export default guildEvents
