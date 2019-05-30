import { action } from 'mobx'
import { message } from 'antd'
import request from '../../../util/request'
import { param } from '../../../util/param'
import * as apis from '../../../constant/api'
import paths from '../../../constant/path'
import store from '../store'

class Actions {
  constructor(store) {
    this.store = store

    this.getUserInfo()
  }

  getUserInfo = () => {
    return request(apis.USER_INFO, {
      method: 'post'
    })
      .then(data => {
        data = data || {}
        data.isLogin = true

        this.merge(data)
      })
      .catch(err => {
        // message.error(`获取用户信息失败：${err}`)
        //location.href = apis.LOGOUT_URL

        this.merge({
          isLogin: false
        })
      })
  }

  async sendLoginEmail(params) {
    await request(apis.SEND_LOGIN_EMAIL, {
      method: 'post',
      body: param(params)
    })
  }

  async logout() {
    await request(apis.LOGOUT_URL)

    this.merge({
      isLogin: false
    })

    location.href = '#' + paths.login
  }

  async login(params = {}) {
    await request(apis.LOGIN_URL, {
      method: 'post',
      body: param(params)
    })
    await this.getUserInfo()

    if (this.store.isLogin) {
      message.success('登陆成功')
      location.href = '#/'
    } else {
      message.error('登陆失败')
    }
  }

  @action
  merge = (obj = {}) => {
    Object.assign(this.store, obj)
  }
}

export default new Actions(store)
