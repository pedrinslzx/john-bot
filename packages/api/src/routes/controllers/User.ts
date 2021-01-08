import { Request, Response, Router } from 'express'
import User from '../../schemas/User'

class UserController {
  public router = Router()
  constructor() {
    this.router.get('/', this.index)
  }

  public async index(req: Request, res: Response): Promise<Response | void> {
    const data = await User.find()
    res.json(data)
  }
}

export default new UserController()
