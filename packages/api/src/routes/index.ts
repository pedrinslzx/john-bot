import { Router } from 'express'
import auth from './auth'
import guild from './controllers/Guild'
import user from './controllers/User'

export default class Routes {
  static getRoutes(): Router {
    const routes = Router()

    routes.use('/auth', auth.router)
    routes.use('/guild', guild.router)
    routes.use('/user', user.router)

    return routes
  }
}
