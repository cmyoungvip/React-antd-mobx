/*
 * @Description: 左侧导航菜单
 * @Author: cmyoung
 * @Date: 2019-04-03 14:33:36
 * @LastEditTime: 2019-05-20 19:44:37
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu as AntdMenu, Icon } from 'antd'
import { inject, observer } from 'mobx-react'

const { Item } = AntdMenu

const menuCfg = [
  {
    title: '我是首页',
    link: '/home',
    icon: 'usergroup-add'
  },
  {
    title: '关于我们',
    link: '/about',
    icon: 'schedule'
  },
  {
    title: '系统设置',
    link: '/setting',
    icon: 'setting'
  }
]

@inject('userStore')
@observer
class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      menus: []
    }
  }

  handleClick(e) {
    const { location, history } = this.props
    const pathname = location.pathname
    const target = e.item.props.pathname

    if (pathname !== target) {
      history.push(target)
    }
  }

  render() {
    const { location, history } = this.props
    const pathname = location.pathname
    const userStore = this.props.userStore

    let menus = menuCfg

    if (userStore.isAuditor) {
      menus = [menuCfg[6], menuCfg[7]]
    }

    if (userStore.isNormalUser) {
      menus = [menuCfg[5]]
    }

    const currentMenu = menus.find(item => item.link === pathname) || menus[0]

    return (
      <div>
        <AntdMenu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={currentMenu ? [currentMenu.title] : []}
          onClick={this.handleClick.bind(this)}
        >
          {menus.map(item => {
            return (
              <Item key={item.title} pathname={item.link}>
                {item.icon ? <Icon type={item.icon} /> : null}
                <span>{item.title}</span>
              </Item>
            )
          })}
        </AntdMenu>
      </div>
    )
  }
}

Menu.contextTypes = {
  router: PropTypes.object
}

export default Menu
