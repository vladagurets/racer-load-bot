// Save opts to global
require('./lib/getOptions')

require('./lib/connection')

const User = require('./lib/user')

var activeUsers = []

async function main () {
  for (let i = 0; i < global._opts.connections; i++) {
    activeUsers.push(new User())
  }
}

main()