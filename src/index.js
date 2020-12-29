import 'dotenv/config'
import * as http from 'http'
import axios from 'axios'

import './main'

http
  .createServer((req, res) => {
    // console.log(`${req.method.toUpperCase()} ${req.url}`)
    res.end(
      JSON.stringify({
        date: new Date().toLocaleString(),
        request: {
          ...req.headers
        }
      })
    )
    // eslint-disable-next-line no-console
  })
  .listen(3000, () => console.log('Tô Ligado na 3000'))

if (process.env.PUBLIC_DOMAIN) {
  setInterval(() => {
    axios(process.env.PUBLIC_DOMAIN)
  }, process.env.TIMEOUT_REQUEST || 5000)
}
