
var express = require('express')
  , fs = require('fs')

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , mongoose = require('mongoose')

// Bootstrap db connection
mongoose.connect(config.db)

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path + '/' + file)
})

var app = express()
  , http = require('http')
  , server = http.createServer(app)

require('./config/express')(app, config)

var io = require('socket.io').listen(server)
require('./config/routes')(app, config, io)

// Start the app by listening on <port>
var port = process.env.PORT || 3000
server.listen(app.get('port'), function(err) {
  if (err) {
    console.log('Application error', err)
    throw e;
  }
  console.log(config.app.name + ' app started on port ' + port)
  heartbeat();
})

function heartbeat() {
  if (!config.heartbeat.active) {
    return;
  }

  setInterval(function() {
    var url = process.env.HEARTBEAT_URL || 'http://' + config.host + ':' + config.port + '/heartbeat';
    http.get(url, function(res) {
    }).on('error', function(e) {
        console.log('Can not ping heartbeat url', e);
    })
  }, config.heartbeat.period || 20000);
}

// expose app
exports = module.exports = app
