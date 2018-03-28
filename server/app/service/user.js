'use strict'

const Service = require('egg').Service
const errCode = require('../core/errCode')

class UserService extends Service {
  // 获取用户列表
  * getList () {
    const result = yield this.ctx.model.Users.findAll({
      raw: true,
      attributes: ['id', 'name', 'email', 'phone', 'permission']
    })
    return result
  }
}

module.exports = UserService
