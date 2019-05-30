import fetch from 'isomorphic-fetch'

import paths from '../constant/path'

export default (input, options = {}) => {
  options = Object.assign(
    {
      credentials: 'include'
    },
    options
  )

  if (/post/i.test(options.method)) {
    let headers = {}

    if (typeof options.body === 'string') {
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }

    options.headers = Object.assign({}, headers, options.headers || {})
  }

  return fetch(input, options)
    .then(response => {
      // console.log(response.headers.values(),'response')
      return response.json()
    })
    .then(response => {
      if (response.success) {
        return response.data
      } else {
        if (response.msg === '-1001') {
          location.href = '#' + paths.login
          return
        }
        throw new Error(response.msg || 'request error')
      }
    })
}
