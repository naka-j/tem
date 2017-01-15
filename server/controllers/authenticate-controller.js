var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

module.exports = function(app, route) {
  router.route('/')
    .post(function(req, res) {
      // console.log(req);
      console.log('!!!!!!!!!authenticate!!!!!!!!! params -> ' + req.body.user_id);
      var User = mongoose.model('user');
      // User.findOne({user_id: '111111'}, function(error, user) {
      User.findOne({user_id: req.body.user_id}, function(error, user) {
        if (error) {
          throw error;
        }

        // validation
        if (!user) {
          res.json({
            success: false,
            message: 'ユーザーIDが間違っています。'
          });
          return;
        }

        // if (user.password != '555555') {
        if (user.password != req.body.password) {
          res.json({
            success: false,
            message: 'パスワードが間違っています。'
          });
          return;
        }

        // when valid -> create token
        var token = jwt.sign(user, app.get('secretKey'), {
          expiresIn: '300s'
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
