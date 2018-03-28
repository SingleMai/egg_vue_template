'use strict'

const APIError = require('../core/apiError')
const co = require('co')

module.exports = () => {
  return function errorHandler (ctx, next) {
    return co(function * () {
      try {
        yield next()
      } catch (err) {
        // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
        ctx.app.emit('error', err, ctx)
        const status = err.status || 500
        // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
        const error = status === 500 && ctx.app.config.env === 'prod'
          ? 'Internal Server Error'
          : err.message
        // 判断是否主动捕获的错误
        if (err instanceof APIError) {
          ctx.body = {
            code: err.code,
            message: err.message
          }
        } else {
          ctx.body = {
            code: -5000,
            message: error
          }
        }
        ctx.status = status
      }
    })
  }
}
