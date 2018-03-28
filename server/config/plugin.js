'use strict'
const path = require('path')

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
}

exports.io = {
  enable: true,
  package: 'egg-socket.io'
}

// 参数验证插件
exports.validate = {
  enable: true,
  package: 'egg-validate'
}

