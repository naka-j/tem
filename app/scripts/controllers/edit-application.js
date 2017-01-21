'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:EditApplicationCtrl
 * @description
 * # EditApplicationCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('EditApplicationCtrl', function ($scope, $location, $routeParams, Application, $localStorage, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var TRAFFIC_TYPE_NAMES = {"1": "電車", "2": "バス", "3": "タクシー"}
    var TICKET_TYPE_NAMES = {"1": "ICカード", "2": "切符"}
    // ルート取得：前回のパラメータ保持用
    var lastCheckParams = {}

    $scope.$watch("currentFormNo", function(){
      if ($scope.currentFormNo == "0") {
        $scope.showPreviousButton = false;
        $scope.showConfirmButton = true;
        $scope.showNextButton = true;
      } else if ($scope.currentFormNo == "9") {
        $scope.showPreviousButton = true;
        $scope.showNextButton = false;
        $scope.showConfirmButton = false;
      } else {
        $scope.showPreviousButton = true;
        $scope.showNextButton = true;
        $scope.showConfirmButton = true;
      }
    })

    Application.one($routeParams.id).get().then(function(application) {
      $scope.routeActivePanel = 0

      $scope.application = application;
      $scope.application.use_date = new Date($scope.application.use_date);

      $scope.selectTrafficType = function(type) {
        $scope.application.traffic_type = type
      }

      $scope.selectTicketType = function(type) {
        $scope.application.ticket_type = type
      }

      $scope.setFormValue = function() {
        $scope.routeErrors = []

        if ($scope.application.traffic_type) {
          $scope.application.traffic_type_view = TRAFFIC_TYPE_NAMES[$scope.application.traffic_type]
        } else {
          $scope.application.traffic_type_view = ""
        }

        if ($scope.application.ticket_type) {
          $scope.application.ticket_type_view = TICKET_TYPE_NAMES[$scope.application.ticket_type]
        } else {
          $scope.application.ticket_type_view = ""
        }

        if ($scope.application.via_place1) {
          $scope.application.via_place_view = $scope.application.via_place1 + "経由"
        } else {
          $scope.application.via_place_view = ""
        }

        if ($scope.application.departure_place && $scope.application.arrival_place && $scope.application.traffic_type == "1" && $scope.application.ticket_type) {
          var from = $scope.application.departure_place + "駅"
          var to = $scope.application.arrival_place + "駅"
          var params = {from: from, to: to, ticket_type: $scope.application.ticket_type}
          // 条件に変更がない場合は取得しにいかない
          if (params.from == lastCheckParams.from && params.to == lastCheckParams.to && params.ticket_type == lastCheckParams.ticket_type) {
            return;
          }
          $scope.isRouteSearching = true;
          $http({
          	method : 'GET',
          	// url : 'api/y_transit_info?from=' + params.from + '&' + 'to=' + params.to + '&' + 'ticket=' + params.ticket_type,
          	url : 'http://localhost:3000/api/y_transit_info?from=' + params.from + '&' + 'to=' + params.to + '&' + 'ticket=' + params.ticket_type,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).success(function (response) {
            // If successful we assign the response to the global user model
            if (!response.success) {
              return;
            }
            $scope.routes_info = response.routes;
            $scope.application.fare = response.routes[0].fare
            lastCheckParams = params
            $scope.isRouteSearching = false;
          }).error(function (response, status) {
            if (status == -1) {
              $scope.routeErrors.push("エラーが発生しました。");
            }
            $scope.isRouteSearching = false;
          });
        }
      }

      $scope.changeActivePanel = function(index, fare) {
        $scope.routeActivePanel = index;
        $scope.application.fare = fare;
      }

      $scope.saveApplication = function() {
        var currentDate = new Date();
        $scope.application.target_year = $scope.application.use_date.getFullYear()
        $scope.application.target_month = $scope.application.use_date.getMonth() + 1
        $scope.application.updated_at = currentDate;
        $scope.application.save().then(function() {
          $location.path('/applications')
        })
      }

      $scope.changeInputMode = function(inputMode) {
        $scope.inputMode = inputMode;
      }

      $scope.closeConfirm = function() {
        $scope.confirming = false;
      }
    })
  });
