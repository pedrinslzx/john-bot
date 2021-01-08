import mongoStore from 'connect-mongo'
import cors from 'cors'
import express from 'express'
import eSession from 'express-session'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { v4 } from 'uuid'
import Router from './routes'
import { Strategy } from './strategies'

export default class App {
  public server: express.Application
  private Store = mongoStore(eSession)
  private _port = Number(process.env.PORT || 3333)
  public passport: Strategy

  private _host = '0.0.0.0'

  constructor() {
    this.server = express()
    this.middlewares()
    this.database()
    this.session()
    this.passport = new Strategy(this.server)
    this.routes()
  }

  private middlewares(): void {
    this.server.use(express.json())
    this.server.use(cors())
    this.server.use(morgan('dev'))
  }

  public start(port?: number, host?: string): void {
    this._port = port || this._port
    this._host = host || this._host
    this.server.listen(Number(this._port), this._host, () =>
      console.log(`HTTP server is running in ${this._host}:${this._port}`)
    )
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
          "Mongoose connection isn't done because happend a error"
        )
      )
  }

  private routes() {
    const routes = Router.getRoutes()
    this.server.use('/api', routes)
  }

  private session() {
    this.server.use(
      eSession({
        secret: process.env.SECRET_COOKIE || v4({ random: { length: 90 } }),
        cookie: {
          maxAge: 60 * 60 * 1000 /* one hour */
        },
        name: 'session',
        resave: false,
        saveUninitialized: false,
        store: new this.Store({
          mongooseConnection: mongoose.connection
        })
      })
    )
  }
}
