var express = require('express');
var router = express.Router();
var cheerio = require('cheerio-httpcli');
module.exports = function(app, route) {
  router.route('/')
    .get(function(req, res) {
      var paramsFrom = encodeURIComponent(req.query.from);
      var paramsTo = encodeURIComponent(req.query.to);
      var ticketType = req.query.ticket;
      var baseURL = 'http://transit.loco.yahoo.co.jp/search/result'
      var requestURL = baseURL + '?from=' + paramsFrom + '&to=' + paramsTo + '&ticket=' + ticketType + '&type=5&al=1&shin=1&ex=1&hb=1&lb=1&sr=1&s=0&expkind=1&ws=2&kw='
      console.log(requestURL);
      var results = []
      // スクレイピング開始
      cheerio.fetch(requestURL, {}, function (error, $, response, body) {
        $('.fare').each(function() {
          console.log($(this).text());
          results.push($(this).text());
        });
        res.send(results);
      });

    });

  router.route('/:name')
    .all(function(req, res, next) {
      next();
    })

  return router;
}
