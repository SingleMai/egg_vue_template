'use strict'

module.exports = appInfo => {
  const config = {}

  // should change to your own
  config.keys = appInfo.name + '_1499075971408_463'

  config.multipart = {
    fileExtensions: [ '.xlsx', '.xls' ]
  }

  // 关闭csrf
  config.security = {
    csrf: {
      enable: false
    }
  }
  // 加载 errorHandler 中间件
  config.middleware = ['errorHandler']

  return config
}
