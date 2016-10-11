var restful = require('node-restful');
module.exports = function(app, route) {
  var rest = restful.model(
    'users', app.models.user
  ).methods(['get', 'put', 'post', 'delete']);
  rest.register(app, route);
  return function(req, res, next) {
    next();
  };
}
