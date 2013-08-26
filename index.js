//
// Petals Cloud Events Listener
//
// Christophe Hamerling - chamerling@linagora.com
//
var express = require('express')
  , http = require('http')
  , io = require('socket.io')
  , conf = require('./config')
  , path = require('path')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)

app.configure('all', function() {
  app.set('port', conf.port);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

app.post('/events', function(req, res) {
  var event = req.body;
  event.received_at = new Date();
  res.send(200);
  io.sockets.emit('event', event);
});

server.listen(app.get('port'), function(err) {
  if (err) {
    throw err;
  }
  console.log('Cloud Events Listener Started on', conf.port);
  io.sockets.on('connection', function(socket) {
    console.log('Got a socket.io connection...', socket)
  });
});

exports = module.exports = app