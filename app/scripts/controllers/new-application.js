'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NewApplicationCtrl
 * @description
 * # NewApplicationCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('NewApplicationCtrl', function ($scope, $http, $location, Application, $localStorage, $timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var TRAFFIC_TYPE_NAMES = {"1": "電車", "2": "バス", "3": "タクシー"}
    var TICKET_TYPE_NAMES = {"1": "ICカード", "2": "切符"}
    // ルート取得：前回のパラメータ保持用
    var lastCheckParams = {}

    // $scope.$watch(function() {
    //   return angular.element('li[data-slide-to="0"]').attr('class')
    // }, function(newVal, oldVal){
    //   if (newVal) {
    //     // $scope.showPreviousButton = false;
    //     angular.element('.btn-previous').hide()
    //   } else {
    //     // $scope.showPreviousButton = true;
    //     angular.element('.btn-previous').show()
    //   }
    // })
    // $scope.$watch(function() {
    //   return angular.element('li[data-slide-to="8"]').attr('class')
    // }, function(newVal, oldVal){
    //   if (newVal) {
    //     // $scope.showNextButton = false;
    //     angular.element('.btn-next').hide()
    //   } else {
    //     // $scope.showNextButton = true;
    //     angular.element('.btn-next').hide()
    //   }
    // })

    $scope.init = function() {
      $scope.$parent.$parent.menuAvailable = true;

      var currentDate = new Date();
      $scope.application = {
        user_id: $localStorage.user_id,
        target_year: currentDate.year,
        target_month: currentDate.month,
        use_date: currentDate,
        traffic_type: '1',
        departure_place: '東京',
        arrival_place: '池袋',
        ticket_type: '1',
        round_trip_flag: false,
        fare: 270,
        manual_input_flag: false,
        purpose: 'お客様先、面談のため'
      }
      $scope.isRouteSearching = true;
      $scope.routeActivePanel = 0
    }

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
        $scope.isRouteSearching = true;
        $http({
        	method : 'GET',
        	// url : 'api/y_transit_info?from=' + params.from + '&' + 'to=' + params.to + '&' + 'via=' + params.via1 + '&' + 'ticket=' + params.ticket_type,
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

    // ルート選択
    $scope.changeActivePanel = function(index, fare) {
      $scope.routeActivePanel = index;
      $scope.application.fare = fare;
    }

    $scope.saveApplication = function() {
      var currentDate = new Date();
      $scope.application.target_year = $scope.application.use_date.getFullYear()
      $scope.application.target_month = $scope.application.use_date.getMonth() + 1
      $scope.application.created_at = currentDate;
      $scope.application.updated_at = currentDate;
      Application.post($scope.application).then(function(){
        $location.path('/applications')
      })
    }

    $scope.changeInputMode = function(inputMode) {
      $scope.inputMode = inputMode;
    }

    $scope.openConfirm = function() {
      $scope.confirming = true;
    }
    $scope.closeConfirm = function() {
      $scope.confirming = false;
    }
  });
