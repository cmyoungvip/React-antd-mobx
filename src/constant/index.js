/**
 * 常量
 * */

export const updateTitle = t => {
  const title = {
    '/home': '首页',
    '/about': '关于我们',
    '/setting': '系统设置',
    '/login': '登录'
  }[t]
  return title || ''
}
