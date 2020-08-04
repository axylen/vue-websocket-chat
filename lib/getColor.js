const colors = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#4CAF50',
  '#009688',
  '#00BCD4',
  '#FF5722'
]

function stringHash (str) {
  let hash = 0

  for (const i in str) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }

  return Math.abs(hash)
}

export default string => colors[stringHash(string) % colors.length]
