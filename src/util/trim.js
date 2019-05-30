/**
 * 去除空格
 */

'use strict'

/**
 * 去除空格
 * @param s {String}
 */
export default s => {
  if (!String.prototype.trim) {
    //  兼容处理

    String.prototype.trim = function() {
      return this.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, '')
    }
  }

  return s.trim()
}
