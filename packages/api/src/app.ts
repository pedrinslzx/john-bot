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
    const { env } = process
    console.log(Object.keys(env).filter(key => key.match(/$MONGODB_/)))
    const MONGODB_USER = env.MONGODB_USER || 'root'
    const MONGODB_PASS = env.MONGODB_PASS || 'root'
    const MONGODB_HOST = env.MONGODB_HOST || 'localhost'
    const MONGODB_PORT = env.MONGODB_PORT || 27017
    const MONGODB_NAME = env.MONGODB_NAME || 'discord-bot'
    mongoose
      .connect(
        `mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}?authSource=admin`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
          reconnectTries: Number.MAX_VALUE,
          reconnectInterval: 500,
          connectTimeoutMS: 10000
        }
      )
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
