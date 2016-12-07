module.exports = {
  '/authenticate' : require('./controllers/authenticate-controller.js'),
  '/': require('./controllers/action-filter.js'),
  '/users': require('./controllers/users-controller.js'),
  '/applications': require('./controllers/applications-controller.js'),
  // '/application_details': require('./controllers/application-details-controller.js'),
  '/y_transit_info': require('./controllers/transit-info-controller.js')
}
