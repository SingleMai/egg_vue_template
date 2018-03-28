'use strict'
module.exports = () => {
  const config = {}

  config.sequelize = {
    dialect: 'sqlite',
    storage: 'database.sqlite'
  }
  return config
}
