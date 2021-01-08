import { Request, Response, Router } from 'express'
import discord from './discord'

class DiscordController {
  public router = Router()
  constructor() {
    this.router.use('/discord', discord.router)
    this.router.get('/', this.index)
  }

  private async index(req: Request, res: Response): Promise<Response | void> {
    console.log(req.user)
    if (req.user) {
      res.json(req.user)
    } else {
      res.status(401).json({
        message: 'Not Authorized'
      })
    }
  }
}

export default new DiscordController()
