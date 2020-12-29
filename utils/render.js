export function renderThis(string = '', self = {}){
  const split = string.split('$')
  const newString = split.map(string => {
    if(string.startsWith('=')){
      const dataName = string.substring(1)
      return getProp(self, dataName) || undefined
    }
    return string
  })
  return newString.join('')
}

function getProp(obj, names){
  const [name, ...otherNames] = names.split('.')
  const value = obj[name]
  if (otherNames.length && value) return getProp(value, otherNames.join('.'))
  return value
}