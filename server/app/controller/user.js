const Controller = require('../core/baseController')
const errCode = require('../core/errCode')

// 跳转进首页,与vue形成连接
class UserController extends Controller {
  // GET /
  * getList () {
    try {
      const result = yield this.service.user.getList()
      this.success(result)
    } catch (err) {
      this.err(errCode.NOT_FOUND)
    }
  }
}
module.exports = UserController
