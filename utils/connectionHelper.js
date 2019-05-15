const racer = require('racer')
const {Model} = racer

function _createConnection (name) {
  const model = new Model()
  model.createConnection({url: global._opts.wsUrl, name})
  return model
}

function _destroyConnection (model) {
  model.close()
}

module.exports = {
  _createConnection,
  _destroyConnection
}