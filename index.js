// Save opts to global
require('./lib/getOptions')

require('./lib/connection')

const {rnd} = require('./utils/actionHelper')
const User = require('./lib/user')

var activeUsers = []

async function main () {
  for (let i = 0; i < global._opts.connections; i++) {
    activeUsers.push(new User({
      name: nameGenerator(),
      createdAt: new Date().valueOf(),
      lifeTime: rnd(1 * 60) * 1000
    }))
  }
}

function nameGenerator () {
  return '_' + Math.random().toString(36).substr(2, 9)
}

main()