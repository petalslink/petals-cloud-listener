
var mongoose = require('mongoose')
  , Event = mongoose.model('Event')
  , _ = require('underscore')

/**
 * Load event and push it into HTTP request for later use
 *
 * @param req
 * @param res
 * @param next
 * @param id
 */
exports.event = function(req, res, next, id){
  Event.load(id, function (err, event) {
    if (err) return next(err)
    if (!event) return next(new Error('Failed to load event ' + id))
    req.event = event
    next()
  })
}

exports.index = function(req, res) {
  res.render('index', {
    title: 'Live'
  });
}

exports.show = function(req, res){
  res.render('events/event', {
    title: 'Event',
    event: req.event
  })
}

exports.destroy = function(req, res){
  var event = req.event
  event.remove(function(err){
    // req.flash('notice', 'Deleted successfully')
    res.redirect('/events')
  })
}

exports.search = function(req, res) {
  var query = req.param('query');
  // TODO
  res.render('events/list', {
    title : 'Search result for ' + query,
    links : {}
  });
}

exports.group = function(req, res) {
  var group = req.param('group')

  Event.group(group, function(err, events) {
    if (err) return res.render('500')
    res.render('events/list', {
      title : 'Events in group ' + group,
      events : events,
      group : group
    })
  })
}

exports.list = function(req, res){
  var page = req.param('page') > 0 ? req.param('page') : 0
  var perPage = 10
  var options = {
    perPage: perPage,
    page: page
  }

  Event.list(options, function(err, events) {
    if (err) return res.render('500')
    Event.count().exec(function (err, count) {
      res.render('events/list', {
        title: 'Events',
        events: events,
        page: page,
        pages: count / perPage
      })
    })
  })
}
