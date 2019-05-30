export function isEmptyObject(obj) {
  if (!obj) {
    return false
  }

  if (typeof obj !== 'object') {
    return false
  }

  return Object.keys(obj).length === 0
}
