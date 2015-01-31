
var Message = require('./message');

var routes = {};
routes.messages = {};

routes.messages.mock = function(req, res) {
  res.json([
    { message: 'test message 1!', sentAt: new Date(), loc: ['43.659405199999995', '-79.3973439'] },
    { message: 'test message 2!', sentAt: new Date(), loc: ['43.659405199999995', '-79.3973439'] }
  ]);
};

routes.messages.create = function(req, res) {
  var message = new Message;

  message.set(res.body);

  message.save(function(err) {
    if (err) {
      return res.status(400).json({error: err.message});
    }

    res.json(message);
  });
};

routes.messages.list = function(req, res) {
  var point = [ req.query.lat, req.query.lng ];
  var since = req.query.since;

  var query = Message
        .find()
        .where('loc')
        .near({center: point, spherical: true, maxDistance: 1})
        .where('sendAt')
        .gt(since);

  query.exec(function(err, messages) {
    if (err) {
      return res.status(500).json({error: err.message});
    }

    res.json(messages);
  });
};

module.exports = routes;
