import { observable, computed } from 'mobx'

class Store {
  @observable isLogin = undefined

  // 当前账号，邮箱登陆时是邮箱，手机登陆时是手机
  @observable loginName = ''
  @observable email = ''
  @observable phoneNumber = ''
  @observable companyName = ''
  // 邮箱是否已激活
  @observable activate = ''

  /**
   * 角色
   */
  @observable roleId = ''

  // 超级管理员
  @computed get isSuperAdmin() {
    return this.roleId === 1
  }
}

export default new Store()
