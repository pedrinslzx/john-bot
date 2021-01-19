import { Document, Model } from 'mongoose'

export interface UserGuild {
  features?: string[]
  permissions_new?: string
}

export interface UserType {
  discordID: string
  discordTag: string
  avatar: string
  refresh_token: string
  guilds: UserGuild[]
}
export interface DiscordOAuth_User {
  id: string
  username: string
  discriminator: string
  avatar: string | null | undefined
  mfa_enabled?: true
  locale?: string
  verified?: boolean
  email?: string | null | undefined
  flags?: number
  premium_type?: number
  public_flags?: number
}

export interface DiscordOAuth_Guild {
  id: string
  name: string
  icon: string | null | undefined
  owner?: boolean
  permissions?: number
  features: string[]
  permissions_new?: string
}

export interface DiscordOAuth_TokenRequestResult {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

export type Session = Pick<
  DiscordOAuth_TokenRequestResult,
  'refresh_token' | 'expires_in' | 'access_token'
> &
  Pick<DiscordOAuth_User, 'id'>
export interface User extends DiscordOAuth_User {
  guilds: {
    noAdm: DiscordOAuth_Guild[]
    isAdm: DiscordOAuth_Guild[]
  }
  token: Session
  inDB: Model<UserType & Document>
}
