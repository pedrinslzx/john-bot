import cors from 'cors'
import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import morgan from 'morgan'
// import socketIo from 'socket.io'
import Router from './routes'

export default class App {
  public app: express.Application
  public server: http.Server
  // public socket: socketIo.Server

  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    // this.socket = new socketIo.Server(this.server)
  }

  private middlewares(): void {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(morgan('dev'))
  }

  public start(): void {
    this.middlewares()
    this.database()
    this.routes()
    this.server.listen(process.env.PORT || 3333, () =>
      console.log(
        'HTTP/WS server is running in localhost:' + process.env.PORT || 3333
      )
    )
  }

  private database(): void {
    mongoose.connect('mongodb://localhost:27017/bot', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  private routes() {
    const routes = Router.getRoutes()
    this.app.use('/api', routes)
  }
}
