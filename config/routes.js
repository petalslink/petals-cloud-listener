
var mongoose = require('mongoose')
  , Event = mongoose.model('Event')

module.exports = function (app, config, io) {

  var events = require('../app/controllers/events')
  app.get('/events', events.list)
  app.get('/events/:id', events.show)
  //app.put('/events/:id', events.update)
  app.del('/events/:id', events.destroy)
  app.post('/events/search', events.search)

  app.param('id', events.event)

  app.get('/', events.index)

  // API
  app.post('/events', function(req, res) {
    var event = req.body;
    var e = new Event(event);
    e.save(function() {
      console.log('Saved!');
    })

    res.send(200);
    if (io) {
      io.sockets.emit('event', e);
    } else {
      console.log('Can not emit to socket.io')
    }
  })

}
