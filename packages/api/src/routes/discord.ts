import { Request, Response, Router } from 'express'
import passport from 'passport'
class DiscordController {
  public router = Router()
  constructor() {
    this.router.get('/', passport.authenticate('discord'))
    this.router.get(
      '/redirect',
      passport.authenticate('discord'),
      this.redirect
    )
  }

  private async redirect(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    res.json({
      ok: true
    })
  }
}

export default new DiscordController()
