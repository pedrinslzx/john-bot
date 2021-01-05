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