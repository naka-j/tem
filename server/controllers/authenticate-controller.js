var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

module.exports = function(app, route) {
  router.route('/')
    .post(function(req, res) {
      var User = mongoose.model('user');
      // User.findOne({account_id: req.query.account_id}, function(error, user) {
      User.findOne({account_id: req.body.account_id}, function(error, user) {
        if (error) {
          throw error;
        }

        // validation
        if (!user) {
          res.json({
            success: false,
            message: 'Authentication failed. User not found.'
          });
          return;
        }

        if (user.password != req.body.password) {
        // if (user.password != req.query.password) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
          return;
        }

        // when valid -> create token
        var token = jwt.sign(user, app.get('secretKey'), {
          expiresIn: '24h'
        });

        res.json({
          success: true,
          message: 'Authentication successfully finished.',
          token: token
        });
      });
    });
  return router;
}
