import chalk from 'chalk'
import express from 'express'
import morgan from 'morgan'

class Server {
  public app: express.Application
  constructor() {
    this.app = express()
  }

  public start(port?: number | string) {
    port = port || process.env.PORT || 3000

    this.middlewares()
    this.routes()
    this.app.listen(port, () =>
      console.log(
        chalk.bold('[', chalk.green('server'), ']  '),
        'is running in ',
        chalk.bold(`localhost:${port}`)
      )
    )
  }

  private routes() {
    this.app.get('/', (_, res) => {
      if (String(process.env.DISCORD_INVITE_URL)) {
        res.redirect(String(process.env.DISCORD_INVITE_URL))
      } else res.send(new Date().toLocaleString())
    })

    this.app.get('/invite', (_, res) => {
      if (String(process.env.DISCORD_INVITE_URL)) {
        res.redirect(String(process.env.DISCORD_INVITE_URL))
      } else res.send(new Date().toLocaleString())
    })
  }

  private middlewares() {
    this.app.use(morgan('dev'))
  }
}

export default Server

export { Server }
