// Save opts to global
require('./lib/getOptions')

require('./lib/connection')

const User = require('./lib/user')

function main () {
  for (let i = 0; i < global._opts.connections; i++) new User()
}

main()