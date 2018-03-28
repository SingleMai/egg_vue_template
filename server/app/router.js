'use strict'

module.exports = app => {
  app.get('/', 'index.index')

  // 用户相关
  app.get('/api/users', 'user.getList')
}
