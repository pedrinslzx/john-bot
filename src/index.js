import 'dotenv/config'
import express from 'express'
import axios from 'axios'

import './main'

const server = express()

server.get('/',(_,res)=>{
  if(String(process.env.DISCORD_INVITE_URL)) res.redirect(String(process.env.DISCORD_INVITE_URL))
  else res.send(new Date().toLocaleString())
})

server.get('/invite',(_,res)=>{
  if(String(process.env.DISCORD_INVITE_URL)) res.redirect(String(process.env.DISCORD_INVITE_URL))
  else res.send(new Date().toLocaleString())
})

server.listen(3000, () => console.log('Tô Ligado na 3000'))

if (String(process.env.PUBLIC_DOMAIN)) {
  setInterval(() => {
    axios(String(process.env.PUBLIC_DOMAIN)).catch((e) => console.error('Deu erro no `axios`',  e))
  }, Number(process.env.TIMEOUT_REQUEST) || 5000)
}
