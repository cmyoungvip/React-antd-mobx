import { Component } from 'react'
import {
  // BrowserRouter as Router
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { Spin } from 'antd'
import { inject, observer } from 'mobx-react'
import { hot } from 'react-hot-loader'

import './less/antd.less'
import './less/app.less'

import Login from './container/login/Login'
import Logout from './container/login/Logout'
import Dashboard from './Dashboard'
import getHashPath from './util/getHashPath'
import paths from './constant/path'

@inject('userActions', 'userStore')
@observer
class App extends Component {
  renderLoading() {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <Spin />
      </div>
    )
  }

  render() {
    const { userStore } = this.props
    let { isLogin } = userStore

    // 还未拿到用户信息
    if (isLogin === undefined && getHashPath() !== '/login') {
      return this.renderLoading()
    }

    return (
      <Router>
        <Switch>
          <Route exact path={paths.login} component={Login} />
          <Route exact path={paths.logout} component={Logout} />
          <Route
            path="/"
            render={props => {
              if (!isLogin) {
                return <Redirect to={paths.login} />
              }

              return <Dashboard {...props} userStore={userStore} />
            }}
          />
        </Switch>
      </Router>
    )
  }
}

export default hot(module)(App)
