/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict'

export default a => {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(a)
  }
  return Object.prototype.toString.call(a) === '[object Array]'
}
