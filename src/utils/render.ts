interface EmptyObject {
  [key: string]: string | number | EmptyObject
}

export function getProp(obj: string | number | EmptyObject, names: string) {
  const [name, ...otherNames] = names.split('.')
  const value = obj[name]
  // eslint-disable-next-line no-use-before-define
  if (otherNames.length && value) return getProp(value, otherNames.join('.'))
  return value
}

export function renderThis(string: string, self: EmptyObject) {
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

export function arrayToObject(array: string[]) {
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
