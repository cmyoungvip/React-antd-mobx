/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict'

import isArray from './isArray'
import map from './map'

/**
 * 通用循环，传入的参数可以是数组或对象
 * @param o {Array|Object}
 * @param fn {Function}
 */
export default (o, fn) => {
  let results
  if (isArray(o)) {
    results = map(o, fn)
  } else {
    // object
    results = []
    for (let k in o) {
      if (o.hasOwnProperty(k)) {
        results.push(fn(o[k], k))
      }
    }
  }

  return results
}
