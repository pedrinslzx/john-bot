import { RequestHandler } from 'express'
import User from '../schemas/User'
import { getGuildsWithStatus, getUserDiscordTag } from '../utils'
import { oauthClient } from './discord'
import { APIError } from './error'
import { getSession } from './session'

export const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const session = await getSession(req)
    if (session) {
      const discordUser = await oauthClient.getUser(session.access_token)
      const guilds = await oauthClient.getUserGuilds(session.access_token)
      let user = await User.findOneAndUpdate(
        { discordID: session.id },
        {
          discordTag: getUserDiscordTag(discordUser),
          avatar: discordUser.avatar,
          guilds,
          accessToken: session.access_token,
          refreshToken: session.refresh_token
        },
        { new: true }
      )
      if (!user) {
        user = await User.create({
          discordID: discordUser.id,
          discordTag: getUserDiscordTag(discordUser),
          avatar: discordUser.avatar,
          guilds,
          accessToken: session.access_token,
          refreshToken: session.refresh_token
        })
      }
      req.user = {
        ...discordUser,
        token: session,
        guilds: getGuildsWithStatus(guilds),
        inDB: user
      }
    } else {
      return APIError('UNAUTHORIZED', res)
    }
    next()
  } catch (error) {
    next(error)
  }
}
