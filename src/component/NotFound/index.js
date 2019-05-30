/*
 * @Description: 404
 * @Author: cmyoung
 * @Date: 2019-01-15 16:36:16
 * @LastEditTime: 2019-05-20 19:45:14
 */

'use strict'

import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'
import PropTypes from 'prop-types'

import './style.less'

@withRouter
export default class NotFound extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  backToIndex() {
    this.props.history.push('/')
  }

  render() {
    return (
      <div styleName="content">
        <div styleName="icon" />
        <div styleName="cut" />
        <div styleName="tips">
          <h2>404</h2>
          <div styleName="tip">抱歉，您访问的页面不存在</div>
          <Button type="primary" onClick={this.backToIndex.bind(this)}>
            返回首页
          </Button>
        </div>
      </div>
    )
  }
}
