import 'dotenv/config'
import express from 'express'
import axios from 'axios'

import './main'

const server = express()

server.get('/',(_,res)=>{
  if(process.env.DISCORD_INVITE_URL) res.redirect(process.env.DISCORD_INVITE_URL)
  else res.send(new Date().toLocaleString())
})

server.get('/invite',(_,res)=>{
  if(process.env.DISCORD_INVITE_URL) res.redirect(process.env.DISCORD_INVITE_URL)
  else res.send(new Date().toLocaleString())
})

server.listen(3000, () => console.log('Tô Ligado na 3000'))

if (process.env.PUBLIC_DOMAIN) {
  setInterval(() => {
    axios(process.env.PUBLIC_DOMAIN).catch((e) => console.error('Deu erro no `axios`',  e))
  }, process.env.TIMEOUT_REQUEST || 5000)
}
