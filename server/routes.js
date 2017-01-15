module.exports = {
  '/api/authenticate' : require('./controllers/authenticate-controller.js'),
  '/api': require('./controllers/action-filter.js'),
  '/api/users': require('./controllers/users-controller.js'),
  '/api/applications': require('./controllers/applications-controller.js'),
  // '/application_details': require('./controllers/application-details-controller.js'),
  '/api/y_transit_info': require('./controllers/transit-info-controller.js')
}
