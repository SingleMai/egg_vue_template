const Controller = require('../core/baseController')
const fs = require('fs')

// 跳转进首页,与vue形成连接
class IndexController extends Controller {
  // GET /
  * index () {
    const { ctx } = this
    const res = fs.readFileSync('../../yibot_assident_helper/client/viewPlugin/index.html', 'utf-8')
    ctx.append('X-Frame-Options', 'ALLOW-ALL')
    ctx.body = res
  }
}
module.exports = IndexController
