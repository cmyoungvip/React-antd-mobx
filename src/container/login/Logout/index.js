/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict'

import React from 'react'
import { inject, observer } from 'mobx-react'
import { Progress, message } from 'antd'

import './styles.less'

@inject('userActions', 'userStore')
@observer
export default class Logout extends React.Component {
  componentDidMount() {
    document.title = '安全退出'

    this.props.userActions.logout().catch(err => {
      message.error(err + '')
    })
  }

  render() {
    return (
      <div styleName="root">
        <Progress
          percent={100}
          strokeWidth={5}
          status="active"
          showInfo={false}
        />
        <div styleName="info">正在退出...</div>
      </div>
    )
  }
}
