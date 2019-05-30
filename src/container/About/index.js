/*
 * @Description: 首页
 * @Author: cmyoung
 * @Date: 2019-03-28 11:37:26
 * @LastEditTime: 2019-05-21 21:08:05
 */

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Form, Select, DatePicker, Row, Col, Input, message, Table } from 'antd'
import moment from 'moment'

import actions from './action'
import store from './store'

import './less/index.less'

@withRouter
@observer
export default class Home extends Component {
  constructor(props) {
    super(props)

    this.store = store
    this.actions = actions

    this.state = {
      loading: false,
      userList: []
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.actions
      .getHome()
      .then(res => {
        console.log(res, '首页')
      })
      .catch(e => {})
  }
  render() {
    const { items } = this.store
    return (
      <div>
        <h2 className="page-title">首页</h2>
        <div styleName="test">我是首页</div>
      </div>
    )
  }
}
