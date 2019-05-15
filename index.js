const racer = require('racer')
const {Model} = racer
// Apply new prototypes to model
require('./lib/connection')

const {_createConnection, _destroyConnection} = require('./utils/connectionHelper')
const {_getOptsFromArgs, _getDefaultOpts} = require('./utils/processHelper')

global._opts = Object.assign({}, _getDefaultOpts(), _getOptsFromArgs())

var connections = []

function main () {
  // connect n users to ws
  for (let i = 0; i < global._opts.connections; i++) {
    connections.push(_createConnection(`Connection #${i + 1}`))
  }
}

main()