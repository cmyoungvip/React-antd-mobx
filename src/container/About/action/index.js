import { action } from 'mobx'

import request from '../../../util/request'
import { param } from '../../../util/param'
import * as apis from 'constant/api'
import store from '../store'

class Actions {
  constructor(store) {
    this.store = store
  }

  @action
  merge = obj => {
    Object.assign(this.store, obj)
  }

  getHome(params) {
    return request(apis.API_HOME + '?' + param(params))
  }
}

export default new Actions(store)
