'use strict'
const mock = require('egg-mock')

describe('test/app/service/topics.test.js', () => {
  let app
  let ctx
  before(async function () {
    app = mock.app()
    await app.ready()
    ctx = app.mockContext()
    await ctx.model.sync({ force: true })
  })

  describe('getList()', () => {
    before(async function () {
      app.mockService('config', 'getList', async function () {
        const configs = [
          {
            id: 1,
            key: 'key1',
            value: '{"a":1}',
            desc: 'desc1'
          }, {
            id: 2,
            key: 'key2',
            value: '{"a":2}',
            desc: 'desc2'
          }, {
            id: 4,
            key: 'key4',
            value: '{"a":4}',
            desc: 'desc4'
          }
        ]
        let result = configs
        return Promise.resolve(result)
      })
      ctx = app.mockContext()
    })
    after(function () {
      mock.restore()
    })
    it('should success', async function () {
      await app.httpRequest()
        .get('/api/configs')
        .expect(200)
        .expect([
          {
            id: 1,
            key: 'key1',
            value: '{"a":1}',
            desc: 'desc1'
          }, {
            id: 2,
            key: 'key2',
            value: '{"a":2}',
            desc: 'desc2'
          }, {
            id: 4,
            key: 'key4',
            value: '{"a":4}',
            desc: 'desc4'
          }
        ])
    })
  })
})
