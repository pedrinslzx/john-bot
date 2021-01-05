import { Request, Response, Router } from 'express'
import Guild from '../../database/schemas/Guild'

class GuildController {
  public router = Router()
  constructor() {
    this.router.get('/', this.index)
    this.router.post('/', this.create)
  }

  public async index(req: Request, res: Response): Promise<Response | void> {
    const data = await Guild.find()
    res.json(data)
  }

  public async create(req: Request, res: Response): Promise<Response | void> {
    const guild = await Guild.create(req.body)
    res.json(guild)
  }
}

export default new GuildController()
