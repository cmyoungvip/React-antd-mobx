import { Component } from 'react'
import {
  // BrowserRouter as Router
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { updateTitle } from './constant'

import Header from './component/Header'
import Menu from './component/Menu'
import NotFound from './component/NotFound'
import Dynamic from './Dynamic'

@observer
export default class Dashboard extends Component {
  render() {
    const { userStore = {}, location = {} } = this.props
    // console.log(this.props,'props')
    document.title = updateTitle(location.pathname)
    return (
      <Router>
        <div className="app-root">
          <div className="app-header">
            <Header />
          </div>
          <div className="app-menu">
            <Menu {...this.props} />
          </div>
          <div className="app-content">
            <Switch>
              <Route
                exact
                path="/"
                render={props => {
                  if (userStore.isNormalUser) {
                    return <Redirect to="/setting" />
                  }
                  return <Redirect to="/home" />
                }}
              />
              <Dynamic
                exact
                path="/home"
                load={require('bundle-loader?lazy!./container/Home')}
              />
              <Dynamic
                exact
                path="/about"
                load={require('bundle-loader?lazy!./container/About')}
              />
              <Dynamic
                exact
                path="/setting"
                load={require('bundle-loader?lazy!./container/Setting')}
              />
              <Route path="/" component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
