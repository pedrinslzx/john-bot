import {arrayToObject} from './utils/render'

export default {
  tag: process.env.APP_MODE || 'dev',
  color: process.env.DISCORD_COLOR || '#33658A',
  prefix: process.env.DISCORD_PREFIX || '!',
  name: process.env.DISCORD_NAME || '',
  accept: {
    dm: false,
    news: false
  },
  ignore: {
    users: arrayToObject(['700327812950786048'])
  }
}
