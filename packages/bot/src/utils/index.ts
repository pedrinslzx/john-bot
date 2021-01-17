import { GuildMember, PermissionResolvable } from 'discord.js'

interface EmptyObject {
  [key: string]: string | number | EmptyObject
}

export function getProp<T = any>(obj: EmptyObject, names: string): T {
  const [name, ...otherNames] = names.split('.')
  const value: any | T = obj[name]
  // eslint-disable-next-line no-use-before-define
  if (otherNames.length && value) return getProp(value, otherNames.join('.'))
  return value
}

export function renderThis(string: string, self: EmptyObject): string {
  const split = string.split('$')
  const newString = split.map(name => {
    if (name.startsWith('=')) {
      const dataName = name.substring(1)
      return getProp(self, dataName) || undefined
    }
    return name
  })
  return newString.join('')
}

export function arrayToObject(array: string[]): EmptyObject {
  return array.reduce((obj, value) => {
    if (
      typeof value !== 'function' &&
      typeof value !== 'object' &&
      value !== null &&
      value !== undefined
    ) {
      obj[value] = value
    }
    return obj
  }, {} as EmptyObject)
}
export function getInviteBotURL(
  clientID: string,
  permissions: number | string = 8
): string {
  return `https://discordapp.com/oauth2/authorize/?permissions=${permissions}&scope=bot&client_id=${clientID}`
}

export function splitArray<T = any>(array: T[], max: number): T[][] {
  const initialValue: { pages: T[][]; i: number } = { pages: [], i: -1 }

  const data = array.reduce((prev, curr) => {
    if (prev.pages[prev.i]?.length < max) prev.pages[prev.i].push(curr)
    else {
      prev.i = prev.i + 1
      prev.pages[prev.i] = [curr]
    }
    return prev
  }, initialValue)

  return data.pages
}

export function checkPermission(
  user: GuildMember | null,
  permission: PermissionResolvable
): boolean {
  return (user && user.permissions && user.permissions.has(permission)) || false
}

export function formatSeconds(seconds: number | string): string {
  seconds = Number(seconds)
  const second = seconds % 60
  const minutes = seconds / 60
  const minute = minutes % 60
  const hour = minutes / 60

  let string = ''
  if (hour >= 1) string += `${Math.ceil(hour)}:`

  if (minute >= 1) string += `${Math.ceil(hour)}:`
  else string += '0:'

  if (second < 10) string += `0${second}`
  else string += `${second}`

  return string.split('.')[0]
}
export function isYouTubeURL(url: string): boolean {
  const regex = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.be)\/.+$/gi
  return regex.test(url)
}
export function getYouTubeID(url: string): string | undefined {
  if (!isYouTubeURL(url)) return url
  const urlParsed = new URL(url)
  if (urlParsed.pathname === '/watch') {
    const id = urlParsed.searchParams.get('v')
    if (id) return id
    else return undefined
  } else if (urlParsed.host === 'youtu.be') {
    if (urlParsed.pathname.startsWith('/')) {
      return urlParsed.pathname.slice(1)
    } else {
      return urlParsed.pathname
    }
  }
  return undefined
}
