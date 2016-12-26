var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

module.exports = function(app, route) {
  router.use(function(req, res, next) {
    // get token from body:token or query:token of Http Header:x-access-token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // validate token
    if (!token) {
      console.log('No token provided.');
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }

    jwt.verify(token, app.get('secretKey'), function(err, decoded) {
      if (err) {
        if (err.name == 'TokenExpiredError') {
          console.log(err.name);
          return res.status(401).send({
            success: false,
            message: 'Token expired'
          });
        }
        console.log(err);
        return res.status(401).send({
          success: false,
          message: 'Invalid token'
        });
      };

      // if token valid -> save token to request for use in other routes
      req.decoded = decoded;
      next();

    });
  });
  return router;
}
