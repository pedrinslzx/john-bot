import chalk from 'chalk'
import express from 'express'
import morgan from 'morgan'
import { getInviteBotURL } from '../utils'

class Server {
  public app: express.Application
  private _port: number | string

  constructor(port?: number | string) {
    this.app = express()
    this._port = port || process.env.PORT || 3000
  }

  public start(): void {
    this.middlewares()
    this.routes()
    this.startServer()
  }

  private routes(): void {
    this.app.get('/', (_, res) => {
      if (getInviteBotURL(process.env.DISCORD_CLIENT_ID || '')) {
        res.redirect(getInviteBotURL(process.env.DISCORD_CLIENT_ID || ''))
      } else res.send(new Date().toLocaleString())
    })

    this.app.get('/invite', (_, res) => {
      if (getInviteBotURL(process.env.DISCORD_CLIENT_ID || '')) {
        res.redirect(getInviteBotURL(process.env.DISCORD_CLIENT_ID || ''))
      } else res.send(new Date().toLocaleString())
    })
  }

  private middlewares(): void {
    this.app.use(morgan('dev'))
  }

  private startServer(): void {
    this.app.listen(this._port, () =>
      console.log(
        chalk.bold('[', chalk.green('server'), ']  '),
        'is running in ',
        chalk.bold(`localhost:${this._port}`)
      )
    )
  }
}

export default Server

export { Server }
