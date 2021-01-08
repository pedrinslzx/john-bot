import { GuildInfo } from 'passport-discord'

export interface UserGuild extends GuildInfo {
  features?: string[]
  permissions_new?: string
}

export interface UserType {
  discordID: string
  discordTag: string
  avatar: string
  guilds: UserGuild[]
}
