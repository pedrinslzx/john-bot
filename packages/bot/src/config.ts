export interface Config {
  tag: 'development' | 'beta' | 'production'
  color: number | string
  prefix: string
  name: string
  accept: {
    dm: boolean
    news: boolean
  }
}

const config: Config = {
  tag: (process.env.APP_MODE as Config['tag']) || 'development',
  color: process.env.DISCORD_COLOR || '#33658A',
  prefix: process.env.DISCORD_PREFIX || '!',
  name: process.env.DISCORD_NAME || '',
  accept: {
    dm: false,
    news: false
  }
}

export default config
