import 'dotenv/config'
import express from 'express'
import axios from 'axios'

import './main'

const server = express()

server.get('/',(req,res)=>{
  res.redirect(process.env.DISCORD_INVITE_URL)
})

server.get('/invite',(req,res)=>{
  res.redirect(process.env.DISCORD_INVITE_URL)
})

server.listen(3000, () => console.log('Tô Ligado na 3000'))

if (process.env.PUBLIC_DOMAIN) {
  setInterval(() => {
    axios(process.env.PUBLIC_DOMAIN)
  }, process.env.TIMEOUT_REQUEST || 5000)
}
