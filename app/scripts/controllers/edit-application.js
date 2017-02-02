'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:EditApplicationCtrl
 * @description
 * # EditApplicationCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('EditApplicationCtrl', function ($scope, $location, $routeParams, Application, $localStorage, $http, $cookies) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var TRAFFIC_TYPE_NAMES = {"1": "電車", "2": "バス", "3": "タクシー"}
    var TICKET_TYPE_NAMES = {"1": "ICカード", "2": "切符"}
    // ルート取得：前回のパラメータ保持用
    var lastCheckParams = {}

    $scope.$parent.$parent.menuAvailable = true;
    $scope.$parent.$parent.navLogin = false;

    if ($cookies.get('never-show-help')) {
      $scope.noHelp = true;
    } else {
      $scope.noHelp = false;
      $scope.helping = true;
    }

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

        if ($scope.application.purpose.length > 10) {
          $scope.application.purpose_view = $scope.application.purpose.substr(0, 9) + "..."
        } else {
          $scope.application.purpose_view = $scope.application.purpose
        }
      }

      $scope.searchRoute = function() {
        $scope.openRouteForm = true;
        if ($scope.application.departure_place && $scope.application.arrival_place && $scope.application.traffic_type == "1" && $scope.application.ticket_type) {
          var from = $scope.application.departure_place + "駅"
          var to = $scope.application.arrival_place + "駅"
          var via1 = "";
          if ($scope.application.via_place1) {
            via1 = $scope.application.via_place1 + "駅"
          }
          var params = {from: from, to: to, via1: via1, ticket_type: $scope.application.ticket_type}
          // 条件に変更がない場合は取得しにいかない
          if (params.from == lastCheckParams.from
            && params.to == lastCheckParams.to
            && params.ticket_type == lastCheckParams.ticket_type
            && params.via1 == lastCheckParams.via1) {
            return;
          }
          $scope.noRoute = false;
          $scope.isRouteSearching = true;
          $http({
          	method : 'GET',
          	// url : 'api/y_transit_info?from=' + params.from + '&' + 'to=' + params.to + '&' + 'via1=' + params.via1 + '&' + 'ticket=' + params.ticket_type,
          	url : 'http://localhost:3000/api/y_transit_info?from=' + params.from + '&' + 'to=' + params.to + '&' + 'via1=' + params.via1 + '&' + 'ticket=' + params.ticket_type,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).success(function (response) {
            // If successful we assign the response to the global user model
            if (!response.success || response.routes.length < 1) {
              return;
            }
            $scope.routes_info = response.routes;
            if (response.routes[0] == undefined) {
              $scope.noRoute = true;
              $scope.application.fare = 0;
            } else {
              $scope.noRoute = false;
              $scope.application.fare = response.routes[0].fare;
            }
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
        $scope.errors = []
        clientCheck()
        if ($scope.errors.length > 0) {
          return;
        }

        var currentDate = new Date();
        $scope.application.target_year = $scope.application.use_date.getFullYear()
        $scope.application.target_month = $scope.application.use_date.getMonth() + 1
        $scope.application.updated_at = currentDate;
        $scope.application.save().then(function() {
          $location.path('/applications')
        }, function(response) {
          if (response.status == 400) {
            $scope.errors.push(response.data.message);
          }
        })
      }

      var clientCheck = function() {
        if ($scope.application.use_date == null) {
          $scope.errors.push('利用日は必須です。')
        }
        if (!$scope.application.departure_place.length) {
          $scope.errors.push('出発駅／出発地は必須です。')
        }
        if (!$scope.application.arrival_place.length) {
          $scope.errors.push('到着駅／到着地は必須です。')
        }
        if (!$scope.application.fare.length) {
          $scope.errors.push('料金は必須です。')
        }
        if ($scope.application.fare.length && $scope.application.fare <= 0) {
          $scope.errors.push('料金に0円は入力できません。')
        }
      }

      $scope.clearErrors = function() {
        $scope.errors = [];
      }

      $scope.changeInputMode = function(inputMode) {
        $scope.inputMode = inputMode;
      }

      $scope.openConfirm = function() {
        $scope.confirming = true;
      }
      $scope.closeConfirm = function() {
        $scope.confirming = false;
        $scope.errors = []
      }

      $scope.noHelpCheckClick = function() {
        $scope.noHelp = !$scope.noHelp
      }
      $scope.openHelp = function() {
        $scope.helping = true;
      }
      $scope.closeHelp = function() {
        if ($scope.noHelp) {
          $cookies.put('never-show-help', true)
        } else {
          $cookies.remove('never-show-help')
        }
        $scope.helping = false;
      }

    })
  });
