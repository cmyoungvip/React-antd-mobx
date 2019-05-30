/*
 * @Description: header
 * @Author: cmyoung
 * @Date: 2019-04-03 14:33:36
 * @LastEditTime: 2019-05-20 19:37:21
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import paths from '../../constant/path'

import './less/styles.less'

@inject('userStore')
@observer
class Header extends Component {
  render() {
    const store = this.props.userStore

    return (
      <div styleName="header">
        <Link to="/" styleName="logo">
          我是管理平台 title
        </Link>
        <div styleName="header-info">
          <div styleName="user-info">
            <img
              styleName="user-icon"
              src={require('./images/user-icon.png')}
            />
            <p>{formatAccount(store.loginName)}</p>
            <p styleName="user-company" title={store.companyName}>
              {store.companyName}
            </p>
          </div>
          <a href={'#' + paths.logout}>[登出]</a>
        </div>
      </div>
    )
  }
}

function formatAccount(v) {
  return v == null ? '' : v
}

export default Header
