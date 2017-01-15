var express = require('express');
var router = express.Router();
var cheerio = require('cheerio-httpcli');
var _ = require('lodash');
module.exports = function(app, route) {
  router.route('/')
    .get(function(req, res) {
      var paramsFrom = encodeURIComponent(req.query.from);
      var paramsTo = encodeURIComponent(req.query.to);
      var paramsTicketType;
      if (req.query.ticket == 1) {
        paramsTicketType = 'ic'
      } else {
        paramsTicketType = 'normal'
      };
      var baseURL = 'http://transit.loco.yahoo.co.jp/search/result'
      var requestURL = baseURL + '?from=' + paramsFrom + '&to=' + paramsTo + '&ticket=' + paramsTicketType + '&type=5&al=1&shin=1&ex=1&hb=1&lb=1&sr=1&s=0&expkind=1&ws=2&kw='
      console.log(requestURL);
      // スクレイピング開始
      cheerio.fetch(requestURL, {}, function (error, $, response, body) {
        var fareList = [];
        $('.routeList .fare').each(function() {
          fareList.push($(this).text().trim().replace('円', ''));
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
        if ($('.navPage a').length > 0) {
          console.log('Get routes from 2 pages');
          // results.fare = fareList;
          // results.station = stationsList;
          // results.line = linesList;
          // return res.send(results);

          $('.navPage a').click().then(function(html) {
            html.$('.routeList .fare').each(function() {
              fareList.push($(this).text().trim().replace('円', ''));
            });

            html.$('.routeDetail').each(function() {
              var stations = []
              $(this).find('.station dt a').each(function() {
                stations.push($(this).text());
              })
              stationsList.push(stations);

              var lines = []
              $(this).find('.transport div').each(function() {
                lines.push($(this).text().trim().replace('[train]', '').replace('[walk]', ''));
              })
              linesList.push(lines);
            });

            // JSON 整形
            var results = {}
            results.routes = {}
            fareList.forEach(function(fare, index) {
              var info = {
                fare: fareList[index],
                station: stationsList[index],
                line: linesList[index]
              };
              console.log(info);
              results.routes[index] = info;
            })
            results.from = paramsFrom;
            results.to = paramsTo;
            results.ticket_type = paramsTicketType;
            results.success = true;
            res.send(results);
          })
        } else {
          // JSON 整形
          var results = {}
          results.routes = {}
          fareList.forEach(function(fare, index) {
            var info = {
              fare: fareList[index],
              station: stationsList[index],
              line: linesList[index]
            };
            console.log(info);
            results.routes[index] = info;
          })
          results.from = paramsFrom;
          results.to = paramsTo;
          results.ticket_type = paramsTicketType;
          results.success = true;
          res.send(results);

        } // end if
      });

    });

  router.route('/:name')
    .all(function(req, res, next) {
      next();
    })

  return router;
}
