import { DiscordOAuth_Guild } from '../types'

type IsGuildAdministrator = (
  guild: DiscordOAuth_Guild | DiscordOAuth_Guild[]
) => boolean | DiscordOAuth_Guild[]

export const isGuildAdministrator: IsGuildAdministrator = guild => {
  if (guild instanceof Array) return guild.filter(isGuildAdministrator)
  return guild.owner || guild.permissions > (0x20000000 | 0x00000008)
}

export function getGuildsWithStatus(
  guilds: DiscordOAuth_Guild[]
): {
  isAdm: DiscordOAuth_Guild[]
  noAdm: DiscordOAuth_Guild[]
} {
  const isAdm = guilds.filter(isGuildAdministrator)
  const noAdm = guilds.filter(guild => !isGuildAdministrator(guild))
  return { isAdm, noAdm }
}
export function getUserDiscordTag(user: {
  username: string
  discriminator: number | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}): string {
  return `${user.username}#${user.discriminator}`
}
