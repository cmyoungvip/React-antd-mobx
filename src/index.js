/**
 * 入口
 */

import 'babel-polyfill'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'

import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

import App from './App'
import injects from './inject'

// 不允许在动作外部修改状态
configure({ enforceActions: 'observed' })

ReactDOM.render(
  <Provider {...injects}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('app')
)
