'use strict'

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize
  const Users = app.model.define('Users', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING,
      allowNull: false,
      comment: '姓名'
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      comment: '邮箱'
    },
    phone: {
      type: INTEGER,
      unique: true,
      comment: '手机'
    },
    password: {
      type: STRING,
      comment: '用户密码' // 暂未启用，现利用token逻辑实现
    },
    permission: {
      type: INTEGER,
      default: 0,
      comment: '用户权限 1. 只有读权限  2. 有读写权限  10. 超级权限.' // 具体参照core/permissionType的映射关系表来进行
    },
    reserve1: INTEGER,
    reserve2: STRING,
    reserve3: STRING,
    reserve4: STRING(1024),
    reserve5: TEXT('medium') // eslint-disable-line new-cap
  })
  Users.sync()
  return Users
}
