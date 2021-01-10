import { Request, Response, Router } from 'express'
import { authenticate } from '../lib/auth'
import { setTokenCookie } from '../lib/cookie'
import { oauthClient, scope } from '../lib/discord'
import { encryptSession } from '../lib/session'
class DiscordController {
  public router = Router()
  constructor() {
    this.router.get('/', this.index)
    this.router.get('/user', authenticate, this.user)
    this.router.get('/redirect', this.login)
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

        const sessionToken = await encryptSession({
          id: user.id,
          expires_in: token.expires_in,
          refresh_token: token.refresh_token
        })

        setTokenCookie(res, sessionToken)
        res.json({
          user
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
    res.json({ ...req.user, token: undefined })
  }
}

export default new DiscordController()
