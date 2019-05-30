/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict'

import loop from './loop'

export default (obj, to_clears = []) => {
  let o2 = {}

  loop(obj, (v, k) => {
    if (typeof v !== 'undefined' && !to_clears.includes(v)) {
      o2[k] = v
    }
  })

  return o2
}
