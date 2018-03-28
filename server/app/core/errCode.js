'use strict'

const errCode = {
  SUCCESS: { code: 1, msg: 'success' },
  NOT_FOUND: { code: 2, msg: 'not found' },
  PARAMS_INVALID_EMPTY: { code: -1, msg: 'params invalid/empty' },
  OBJECT_EXITS: { code: -2, msg: 'object exits' },
  UPDATE_ERROR: { code: -3, msg: 'update error' }
}

exports = module.exports = errCode
