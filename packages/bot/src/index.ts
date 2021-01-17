import axios from 'axios'
import 'dotenv/config'
import './bot'

// import './server'

// =====================================

if (
  process.env.PUBLIC_DOMAIN !== undefined &&
  typeof process.env.PUBLIC_DOMAIN === 'string'
) {
  setInterval(() => {
    axios(String(process.env.PUBLIC_DOMAIN)).catch(e =>
      console.error('Deu erro no `axios`', e)
    )
  }, Number(process.env.TIMEOUT_REQUEST) || 5000)
}
