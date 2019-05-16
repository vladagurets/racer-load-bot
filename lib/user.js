const {_createConnection} = require('../utils/connectionHelper')
const {getDocs} = require('../utils/actionHelper')
const {rnd} = require('../utils/mainHelper')

const colors = require('colors')

const actions = ['get', 'create', 'update', 'delete']

function User () {
  // generate uniq name for each user
  this._name = '_' + Math.random().toString(36).substr(2, 9)

  // time of user's activities (ms)
  this._lifeTime = rnd(global._opts.lifeTime * 60) * 1000

  this._activityInterval = null

  this._connectionOpened = false

  this._model = _createConnection(this._name)

  this._model.socket.onopen = () => {
    this._connectionOpened = true
    console.log(`Connection for user ${this._name}`, 'opened'.green)
    this._activityInterval = setInterval(() => {
      makeActivity()
    }, rnd(10) * 1000)
  }
  this._model.socket.onclose = () => {
    this._connectionOpened = false
    console.log(`Connection for user ${this._name}`, 'closed'.red)
  }

  const makeActivity = () => {
    if (!this._connectionOpened) return

    // get collection name or random collection name from 'collections' option
    const collectionName = Array.isArray(global._opts.collections)
        ? global._opts.collections[rnd(global._opts.collections.length) - 1]
        : global._opts.collections
    
    // TODO: add other actions (create, update, delete)
    // switch (actions[rnd(actions.length) - 1]) {
    switch ('get') {
      case 'get':
        getDocs(this._model, collectionName)
          .then(docs => console.log(`User ${this._name}`, 'fetched'.black.bgWhite, `${docs.length} ${collectionName} docs`))
        break
      case 'create':
        console.log(`User ${this._name}`, 'created'.black.bgBlue, `${collectionName} doc`)
        break
      case 'update':
        console.log(`User ${this._name}`, 'updated'.black.bgGreen, `${collectionName} doc`)
        break
      case 'delete':
        console.log(`User ${this._name}`, 'removed'.black.bgRed, `${collectionName} doc`)
        break
      default:
        break
    }
  }

  // close connection after lifeTime is over
  setTimeout(() => {
    clearInterval(this._activityInterval)
    this._model.close()
  }, this._lifeTime)
}

module.exports = User