import { Request, Response, Router } from 'express'
import { authenticate } from '../lib/auth'
import discord from './discord'
class DiscordController {
  public router = Router()
  constructor() {
    this.router.use('/discord', discord.router)
    this.router.get('/', authenticate, this.index)
  }

  private async index(req: Request, res: Response): Promise<Response | void> {
    console.log(!!req.user)
    if (req.user) {
      res.json({ user: req.user })
    } else {
      res.status(401).json({
        message: 'Not Authorized'
      })
    }
  }
}

export default new DiscordController()
