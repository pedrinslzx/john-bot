import 'dotenv/config'
import App from './app'

const app = new App()
app.start(Number(process.env.DISCORD_API_PORT) || 3333)
