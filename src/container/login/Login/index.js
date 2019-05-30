/**
 * @author oldj
 * @blog https://oldj.net
 */

'use strict'

import React from 'react'
import { inject, observer } from 'mobx-react'
import { message, Button, Input, Row, Col } from 'antd'
import classnames from 'classnames'

import salt from 'util/salt'
import Board from '../Board'

import './styles.less'

@inject('userActions', 'userStore')
@observer
class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: '',
      password: '',
      accountIpt: false,
      passwordIpt: false,
      loading: false,

      // 第一步登陆，第二步登陆会发送邮件验证码
      step: 1,
      // 重发倒计时
      resendCounter: 0
    }

    this.captchaRefs = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef(),
      React.createRef()
    ]
  }

  componentDidMount() {
    document.title = '登录'

    this.initBoard()
  }

  // 背景
  initBoard() {
    let lw = document.getElementById('app')
    let be = document.getElementById('login')
    let w = document.body.offsetWidth
    // let h = document.body.offsetHeight
    let dotLine = document.createElement('div')
    dotLine.id = 'dot-line'
    lw.insertBefore(dotLine, be)

    try {
      new Board(dotLine, w, 700, {
        dotColor: '#3447af',
        lineColor: '#3447af'
      })
    } catch (err) {
      console.log(err)
    }
  }

  clearBoard() {
    let lw = document.getElementById('app')
    let re = document.getElementById('dot-line')
    lw.removeChild(re)
  }

  componentWillUnmount() {
    this.clearBoard()
  }

  handleClick(type) {
    this.setState({
      [type]: true
    })
  }

  handleBlur(type, e) {
    if (!e.target.value.length) {
      this.setState({
        [type]: false
      })
    }
  }

  handleFocus(type) {
    if (!this.state[type]) {
      this.setState({
        [type]: true
      })
    }
  }

  handleChange(type, e) {
    let iptType = type === 'userName' ? 'accountIpt' : 'passwordIpt'

    if (!this.state[iptType]) {
      this.setState({
        [iptType]: true
      })
    }

    this.setState({
      [type]: e.target.value
    })
  }

  async onLogin(userName, password) {
    password = salt(password)

    this.setState({
      loading: true
    })

    this.props.userActions
      .sendLoginEmail({
        loginName: userName,
        password
      })
      .then(() => {
        this.setState({
          step: 2
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })

        const map = {
          2: '用户名/密码错误',
          6: '账户未激活'
        }
        message.error(map[err.message] || err.message)
      })

    // this.props.userActions
    //   .login({
    //     userName,
    //     password
    //   })
    //   .then(() => {
    //     this.setState({
    //       loading: false
    //     })
    //   })
    //   .catch(err => {
    //     this.setState({
    //       loading: false
    //     })

    //     message.error(err + '')
    //   })
  }

  renderLoginForm() {
    let { accountIpt, passwordIpt, loading } = this.state
    let login = () => this.onLogin(this.state.userName, this.state.password)

    return (
      <div id="form" styleName="login-form">
        <div
          styleName={classnames('ipt', accountIpt ? 'on-ipt' : '')}
          onClick={this.handleClick.bind(this, 'accountIpt')}
        >
          <Input
            id="account"
            size="large"
            value={this.state.userName}
            onBlur={this.handleBlur.bind(this, 'accountIpt')}
            onFocus={this.handleFocus.bind(this, 'accountIpt')}
            onChange={this.handleChange.bind(this, 'userName')}
          />
          <div styleName="ipt-legend">用户名</div>
        </div>
        <div
          styleName={classnames('ipt', passwordIpt ? 'on-ipt' : '')}
          onClick={this.handleClick.bind(this, 'passwordIpt')}
        >
          <Input
            id="psw"
            size="large"
            type="password"
            value={this.state.password}
            onBlur={this.handleBlur.bind(this, 'passwordIpt')}
            onFocus={this.handleFocus.bind(this, 'passwordIpt')}
            onChange={this.handleChange.bind(this, 'password')}
            onKeyDown={e => e.keyCode === 13 && login()}
          />
          <div styleName="ipt-legend">密码</div>
        </div>
        <div>
          <Button loading={loading} type="primary" size="large" onClick={login}>
            登录
          </Button>
        </div>
      </div>
    )
  }

  submitSecond() {
    // 直接在onInput里拿state.value拿不到最后一个
    setTimeout(() => {
      const captcha = this.captchaRefs
        .map(item => item.current.state.value)
        .join('')

      this.props.userActions
        .login({
          loginName: this.state.userName,
          verifyCode: captcha
        })
        .catch(err => {
          const map = {
            3: '邮件验证码错误',
            4: '邮件验证次数超过3次',
            5: '重试次数太多，账号已经被锁定，明天再来登录'
          }
          message.error(map[err.message] || err.message)

          if (/^(4|5)$/.test(err.message)) {
            this.setState({
              step: 1
            })
          }
        })
    }, 50)
  }

  resend = () => {
    this.setState({
      resendCounter: 60
    })

    let t = setInterval(() => {
      this.setState(
        prevState => {
          return {
            resendCounter: prevState.resendCounter - 1
          }
        },
        () => {
          if (this.state.resendCounter === 0) {
            clearInterval(t)
          }
        }
      )
    }, 1000)

    this.onLogin(this.state.userName, this.state.password)
  }

  renderSecondLogin() {
    const { resendCounter } = this.state

    return (
      <div id="second-form" styleName="second-form">
        <Row gutter={12} style={{ marginBottom: 20 }}>
          {[1, 2, 3, 4, 5, 6].map((item, i) => {
            return (
              <Col key={item} span={4}>
                <Input
                  maxLength={1}
                  ref={this.captchaRefs[i]}
                  onInput={e => {
                    if (!e.target.value) {
                      return
                    }

                    if (i === 5) {
                      this.submitSecond()
                    } else {
                      // 自动切换到下一个
                      this.captchaRefs[i + 1].current.focus()
                    }
                  }}
                />
              </Col>
            )
          })}
        </Row>

        <p>一条包含验证码的信息已发送至您的邮箱，请输入验证码以继续</p>
        <p>
          没有收到验证码？
          <a onClick={this.resend} disabled={resendCounter !== 0}>
            重新发送验证码{resendCounter !== 0 ? `(${resendCounter})` : null}
          </a>
        </p>
      </div>
    )
  }

  render() {
    const { step } = this.state

    return (
      <div styleName="root" id="login">
        <div styleName="header-container">
          <div styleName="header">
            <div styleName="logo">
              <a href="/" title="顶象">
                顶象
              </a>
            </div>
          </div>
        </div>
        <div styleName="container">
          <div styleName="login-box">
            <div styleName="login-title">
              {step === 1 ? '登陆' : '双重认证'}
            </div>
            {step === 1 ? this.renderLoginForm() : null}
            {step === 2 ? this.renderSecondLogin() : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Login
