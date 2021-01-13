import { ptBR } from 'date-fns/locale'

export interface Config {
  devLogs?: boolean
  tag: 'development' | 'beta' | 'production'
  color: number | string
  prefix: string
  name: string
  startTime: Date
  locale: typeof ptBR
  accept: {
    news: boolean
  }
}

const config: Config = {
  devLogs: false,
  tag: (process.env.APP_MODE as Config['tag']) || 'development',
  color: process.env.DISCORD_COLOR || '#33658A',
  prefix: process.env.DISCORD_PREFIX || '!',
  name: process.env.DISCORD_NAME || '',
  startTime: new Date(),
  locale: ptBR,
  accept: {
    news: false
  }
}

export default config
