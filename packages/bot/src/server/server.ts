import chalk from 'chalk'
import express from 'express'
import morgan from 'morgan'
import { getInviteBotURL } from '../utils'

class Server {
  public app: express.Application
  private _port: number
  private _host: string

  constructor(port?: number, host?: string) {
    this.app = express()
    this._port = Number(
      port || process.env.DISCORD_BOT_PORT || process.env.PORT || 3002
    )
    this._host = String(host || '0.0.0.0')
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
    this.app.listen(this._port, this._host, () =>
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
