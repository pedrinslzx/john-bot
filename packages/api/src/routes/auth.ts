import { Request, Response, Router } from 'express'

class AuthController {
  public router = Router()
  constructor() {
    this.router.get('/', this.index)
    this.router.post('/', this.create)
  }

  public async index(req: Request, res: Response): Promise<Response | void> {
    res.json({})
  }

  public async create(req: Request, res: Response): Promise<Response | void> {
    res.json({})
  }
}

export default new AuthController()
