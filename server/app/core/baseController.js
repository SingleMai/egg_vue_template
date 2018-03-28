'use strict'
const APIError = require('./apiError')
const errCode = require('./errCode')
const { Controller } = require('egg')

class BaseController extends Controller {
  success (data) {
    this.ctx.body = {
      code: errCode.SUCCESS.code,
      message: errCode.SUCCESS.msg,
      data
    }
  }

  /*
    @err: 主动抛出到客户端的错误信息
    @msg： 程序执行错误时抛出的错误。这一条是为了debug使用而存在的。无需记录的内容，可直接传空
    该接口将错误信息记录所有错误信息均暴露在服务器端，而对于前端页面则统一调用已定义的内容
  */
  error (err, msg) {
    // 将错误抛出
    if (msg) {
      this.ctx.logger.error(msg)
    }
    throw new APIError(err.code, err.msg)
  }

  // 该方法主要用于与后端其他服务器沟通时，打印发包和回包信息所用的函数。
  // 为了方便调试bug所用
  // data 统一为发包及回包的信息， url如有则判断为是发包
  info (data, url) {
    if (url) {
      console.log(`向${url}发送出数据：`)
      console.log(data)
    } else {
      console.log(`收到回包：`)
      console.log(data)
    }
  }
}

module.exports = BaseController
