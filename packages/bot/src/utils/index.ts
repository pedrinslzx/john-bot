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
  if (hour >= 1) string += `${Math.floor(hour)}:`

  if (minute >= 1) string += `${Math.floor(hour)}:`
  else string += '0:'

  if (second < 10) string += `0${second}`
  else string += `${second}`

  return string
}
