import chalk from 'chalk'
import { TextChannel, UserResolvable } from 'discord.js'
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
    const botUser = guild.member(bot.user as UserResolvable)
    await botUser?.setNickname(`${bot.user?.username} (${bot.config.prefix})`)
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
