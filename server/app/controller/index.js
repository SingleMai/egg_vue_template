const Controller = require('../core/baseController')
const fs = require('fs')

// 跳转进首页,与vue形成连接
class IndexController extends Controller {
  // GET /
  * index () {
    const { ctx } = this
    const res = fs.readFileSync('app/public/dist/index.html', 'utf-8')
    ctx.body = res
  }
}
module.exports = IndexController
