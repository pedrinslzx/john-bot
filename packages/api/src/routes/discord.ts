import { Request, Response, Router } from 'express'
import { authenticate } from '../lib/auth'
import { setTokenCookie } from '../lib/cookie'
import { oauthClient, scope } from '../lib/discord'
import { encryptSession } from '../lib/session'
import User from '../schemas/User'
import { getUserDiscordTag } from '../utils'
class DiscordController {
  public router = Router()
  constructor() {
    this.router.get('/', this.index)
    this.router.get('/user', authenticate, this.user)
    // this.router.get('/redirect', (req, res) => res.json(req.query))
    this.router.get('/redirect', this.login)
    this.router.get('/redirect/code', this.login)
  }

  private async index(req: Request, res: Response): Promise<Response | void> {
    if (req.query.code) res.redirect('redirect?code=' + req.query.code)
    else {
      res.redirect(oauthClient.generateAuthUrl({ scope, responseType: 'code' }))
    }
  }

  private async login(req: Request, res: Response): Promise<Response | void> {
    if (!req.query.code) res.redirect('.')
    else {
      try {
        const token = await oauthClient.tokenRequest({
          grantType: 'authorization_code',
          scope,
          code: String(req.query.code)
        })
        const user = await oauthClient.getUser(token.access_token)
        const guilds = await oauthClient.getUserGuilds(token.access_token)

        let dbUser = await User.findOneAndUpdate(
          { discordID: user.id },
          {
            discordTag: getUserDiscordTag(user),
            avatar: user.avatar,
            guilds,
            accessToken: token.access_token,
            refreshToken: token.refresh_token
          },
          { new: true }
        )

        if (!dbUser) {
          dbUser = await User.create({
            discordID: user.id,
            discordTag: getUserDiscordTag(user),
            avatar: user.avatar,
            guilds,
            accessToken: token.access_token,
            refreshToken: token.refresh_token
          })
        }

        const sessionToken = await encryptSession({
          id: user.id,
          expires_in: token.expires_in,
          refresh_token: token.refresh_token,
          access_token: token.access_token
        })

        setTokenCookie(res, sessionToken)
        res.json({
          sessionToken,
          user,
          dbUser
        })
      } catch (error) {
        console.error(error)
        res.status(500).json({
          message: error.name || 'Internal Server Error',
          errorMessage: error.message
        })
      }
    }
  }

  private async user(req: Request, res: Response): Promise<Response | void> {
    res.json({ ...req.user })
  }
}

export default new DiscordController()
