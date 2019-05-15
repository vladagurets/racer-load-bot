const {_createConnection} = require('../utils/connectionHelper')
const {rnd, getDocs} = require('../utils/actionHelper')

const actions = ['get', 'create', 'update', 'delete']

function User (opts) {
  this._name = opts.name
  this._createdAt = opts.createdAt
  this._lifeTime = opts.lifeTime
  this.activityInterval = null
  this._connectionOpened = false

  this._model = _createConnection(this._name)

  this._model.socket.onopen = () => {
    this._connectionOpened = true
    console.log(`Connection for user ${this._name} opened`)
    this.activityInterval = setInterval(() => {
      makeActivity()
    }, rnd(10) * 1000);
  }
  this._model.socket.onclose = () => {
    this._connectionOpened = false
    console.log(`Connection for user ${this._name} closed`)
  }

  const makeActivity = () => {
    if (!this._connectionOpened) return

    if (Array.isArray(global._opts.collections)) {
      for (const collection of global._opts.collections) {
        getDocs(this._model, collection)
          .then(docs => console.log(`User ${this._name} fetched ${docs.length} docs`))
      }
    } else {
      getDocs(this._model, global._opts.collections)
        .then(docs => console.log(`User ${this._name} fetched ${docs.length} docs`))
    }
  }

  // close connection after lifeTime is over
  setTimeout(() => {
    clearInterval(this.activityInterval)
    this._model.close()
  }, this._lifeTime)
}

User.prototype.getName = function() {
  return this._name
}

module.exports = User