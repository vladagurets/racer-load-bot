const racer = require('racer')
const {Model} = racer

function _createConnection () {
  const model = new Model()
  model.createConnection({url: global._opts.wsUrl})
  return model
}

function _destroyConnection (model) {
  model.close()
}

module.exports = {
  _createConnection,
  _destroyConnection
}