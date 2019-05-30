/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict'

/**
 * 对指定数据依次执行指定方法，并将结果返回为一个数组
 * @param arr {Array}
 * @param f {Function}
 * @return {Array}
 */
export default (arr, f) => {
  let i = 0
  let l = arr.length
  let results = []
  for (; i < l; i++) {
    results[i] = f(arr[i], i)
  }

  return results
}
