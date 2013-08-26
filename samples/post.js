var request = require('request')
  , conf = require('./../config');

var i = 0;
var steps = ['node.start', 'node.stop', 'node.migrate', 'node.warning', 'node.error'];

var send = function() {
  var step = steps[Math.floor(Math.random() * (steps.length))];
  var payload = {
    id : i++,
    step : step,
    date : new Date(),
    message : 'This is the message for ' + step
  }

  request(
    {
      method : 'post',
      url : 'http://' + conf.host + ':' + conf.port + '/events',
      json: true,
      body : payload
    }, function(err, res, body) {
      if (err) {
        console.log(err);
      } else {
        console.log('response ', res.statusCode);
      }
    }
  );
};
setInterval(send, 1000);