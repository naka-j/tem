var restful = require('node-restful');
module.exports = function(app, route) {
  var rest = restful.model(
    'applications', app.models.appication
  ).methods(['get', 'put', 'post', 'delete'])
  rest.register(app, route);
  return function(req, res, next) {
    next();
  }
}
