import { Router } from 'express'
import auth from './auth'
import guild from './controllers/Guild'

export default class Routes {
  static getRoutes(): Router {
    const routes = Router()

    routes.use('/auth', auth.router)
    routes.use('/guild', guild.router)

    return routes
  }
}
