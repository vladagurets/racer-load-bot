/**
 * @returns {object} with options from command line
 */
function _getOptsFromArgs () {
  const params = {}
  process.argv.slice(2).forEach(param => {
    const p = param.split('=')
    if (p.length > 1) {
      if (p[1].includes(',')) {
        params[p[0]] = p[1].split(',')
      } else {
        params[p[0]] = p[1]
      }
    } else {
      // if arg[i] passed without value make it true
      params[p[0]] = true
    }
  })
  return params
}

/**
 * @returns {object} with default options
 */
function _getDefaultOpts () {
  return {
    wsUrl: 'http://localhost:3000/channel',
    collections: [],
    connections: 0,
    lifeTime: 5
  }
}

global._opts = Object.assign({}, _getDefaultOpts(), _getOptsFromArgs())
