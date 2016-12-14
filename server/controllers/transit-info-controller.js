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
      var results = {}
      // スクレイピング開始
      cheerio.fetch(requestURL, {}, function (error, $, response, body) {
        var fareList = [];
        $('.routeList .fare').each(function() {
          fareList.push($(this).text());
        });

        var stationsList = [];
        var linesList = [];
        // 駅詳細から駅名と路線名を抽出
        $('.routeDetail').each(function() {
          var stations = []
          $(this).find('.station dt a').each(function() {
            stations.push($(this).text());
          })
          stationsList.push(stations);

          var lines = []
          $(this).find('.transport div').each(function() {
            lines.push($(this).text().trim().replace('[train]', ''));
          })
          linesList.push(lines);
        });

        // ２ページ目（４〜６件目）があるときはもう１回
        if ($('.navPage a').length == 0) {
          results.fare = fareList;
          results.station = stationsList;
          results.line = linesList;
          return res.send(results);
        }

        $('.navPage a').click().then(function(html) {
          html.$('.routeList .fare').each(function() {
            fareList.push($(this).text());
          });

          html.$('.routeDetail').each(function() {
            var stations = []
            $(this).find('.station dt a').each(function() {
              stations.push($(this).text());
            })
            stationsList.push(stations);

            var lines = []
            $(this).find('.transport div').each(function() {
              lines.push($(this).text().trim().replace('[train]', ''));
            })
            linesList.push(lines);
          });

          results.fare = fareList;
          results.station = stationsList;
          results.line = linesList;
          res.send(results);
        })

      });

    });

  router.route('/:name')
    .all(function(req, res, next) {
      next();
    })

  return router;
}
