import { observable } from 'mobx'

class Store {
  @observable items = []
  @observable itemCount = 0
  @observable pageNo = 1
  @observable pageSize = 20
}

export default new Store()
