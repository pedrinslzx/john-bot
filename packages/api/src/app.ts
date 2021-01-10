import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import Router from './routes'

export default class App {
  public server: express.Application
  private _port = Number(process.env.PORT || 3333)

  private _host = '0.0.0.0'

  constructor() {
    this.server = express()
    this.middleware()
    this.database()
    this.routes()
  }

  public start(port?: number, host?: string): void {
    this._port = port || this._port
    this._host = host || this._host
    this.server.listen(Number(this._port), this._host, () =>
      console.log(`HTTP server is running in ${this._host}:${this._port}`)
    )
  }

  private middleware(): void {
    this.server.use(express.json())
    this.server.use(cors())
    this.server.use(morgan('dev'))
  }

  private database(): void {
    mongoose
      .connect('mongodb://localhost:27017/discord-bot', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() => console.log('Mongoose connection is done'))
      .catch(err =>
        console.error(
          err,
          "Mongoose connection isn't done because happened a error"
        )
      )
  }

  private routes() {
    const routes = Router.getRoutes()
    this.server.use('/api', routes)
  }
}
