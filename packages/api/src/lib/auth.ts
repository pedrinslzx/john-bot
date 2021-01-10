import { RequestHandler } from 'express'
import User from '../schemas/User'
import { oauthClient, scope } from './discord'
import { APIError } from './error'
import { getSession } from './session'

export const authenticate: RequestHandler = async (req, res, next) => {
  const session = await getSession(req)
  if (session) {
    const nowToken = await oauthClient.tokenRequest({
      grantType: 'refresh_token',
      scope,
      refreshToken: session.refresh_token
    })
    const discordUser = await oauthClient.getUser(nowToken.access_token)
    const guilds = await oauthClient.getUserGuilds(nowToken.access_token)
    const user = await User.findOneAndUpdate(
      { discordID: session.id },
      { ...discordUser, guilds, refresh_token: session.refresh_token },
      { new: true }
    )
    req.user = {
      ...discordUser,
      token: nowToken,
      guilds: guilds.filter(
        guild => guild.permissions > (0x20000000 | 0x00000008)
      ),
      inDB: user
    }
  } else {
    return APIError('UNAUTHORIZED', res)
  }
  next()
}
