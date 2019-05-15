var racer = require('racer')
var share = require('sharedb/lib/client')

var WebSocket = require('ws')
var Model = racer.Model
const {promisifyAll} = require('bluebird')

var defaultConnectOptions = {
  timeout: 10000,
  timeoutIncrement: 10000
}

Model.prototype.createConnection = function (options) {
  // Model::_createSocket should be defined by the socket plugin
  this.root.socket = this._createSocket(options);

  // The Share connection will bind to the socket by defining the onopen,
  // onmessage, etc. methods
  var model = this;
  this.root.connection = new share.Connection(this.root.socket);
  this.root.connection.on('state', function(state, reason) {
    model._setDiff(['$connection', 'state'], state);
    model._setDiff(['$connection', 'reason'], reason);
  });
  this._set(['$connection', 'state'], 'connected');

  this._finishCreateConnection();
}

Model.prototype._createSocket = function (options) {
  return new Socket(options, this.root)
}

promisifyAll(Model.prototype)

function Socket (options, model) {
  this._options = Object.assign(defaultConnectOptions, options)
  this._messageQueue = []
  this._connectedOnce = false
  this._attemptNum = 0
  this._url = options.url
  this._model = model

  this._createWebSocket()
}

Socket.prototype._createWebSocket = function () {
  this._type = 'websocket'
  this._socket = new WebSocket(this._url, {
  })

  this.open = this._createWebSocket.bind(this)
  this._syncState()

  this._socket.onmessage = this._ws_onmessage.bind(this)
  this._socket.onopen = this._ws_onopen.bind(this)
  this._socket.onclose = this._ws_onclose.bind(this)

  this._socket.on('error', function () {
    console.log('error!', arguments)
  })
}

Socket.prototype._ws_onmessage = function (message) {
  this._syncState()
  message.data = JSON.parse(message.data)
//  console.log('message>', message.data)
  this.onmessage && this.onmessage(message)
}

Socket.prototype._ws_onopen = function () {
  this._attemptNum = 0
  this._connectedOnce = true

  this._syncState()
  this._flushQueue()
  this.onopen && this.onopen()
}

Socket.prototype._ws_onclose = function (event) {
  this._syncState()
  if (!event.wasClean) {
    console.log('WebSocket: connection is broken', event)
  }

  this.onclose && this.onclose(event)

  if (this._options.reconnect) {
    setTimeout(this._createWebSocket.bind(this), this._getTimeout())
  }
  this._attemptNum++
}

Socket.prototype._getTimeout = function () {
  var base = this._options.timeout
  var increment = this._options.timeoutIncrement * this._attemptNum
  return base + increment
}

Socket.prototype._flushQueue = function () {
  while (this._messageQueue.length !== 0) {
    var data = this._messageQueue.shift()
    this._send(data)
  }
}

Socket.prototype._send = function (data) {
  if (this._type === 'websocket' && (typeof data !== 'string')) data = JSON.stringify(data)

  this._socket.send(data)
}

Socket.prototype.send = function (data) {
  if (this._socket.readyState === WebSocket.OPEN && this._messageQueue.length === 0) {
    this._send(data)
  } else {
    this._messageQueue.push(data)
  }
}

Socket.prototype.close = function () {
  this._socket.close()
}

Socket.prototype._syncState = function () {
  this.readyState = this._socket.readyState
}

// ShareJS constants
Socket.prototype.canSendWhileConnecting = true
Socket.prototype.canSendJSON = true

// WebSocket constants
Socket.prototype.CONNECTING = 0
Socket.prototype.OPEN = 1
Socket.prototype.CLOSING = 2
Socket.prototype.CLOSED = 3
