var restful = require('node-restful');
module.exports = function(app, route) {
  var rest = restful.models(
    'application_details', app.model.application_detail
  ).methods(['get', 'post', 'put', 'delete'])
  rest.register(app, route)
  return function(req, res, next) {
    next();
  }
}
