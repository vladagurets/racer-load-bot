/**
 * @returns {object} of options from command line
 */
function _getOptsFromArgs () {
  const params = {}
  process.argv.slice(2).forEach(param => {
    const p = param.split('=')
    if (p.length > 1) {
      params[p[0]] = p[1]
    } else {
      // ifr arg[i] passed without value make it true
      params[p[0]] = true
    }
  })
  return params
}

module.exports = {
  _getOptsFromArgs
}