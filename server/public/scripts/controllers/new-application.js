'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NewApplicationCtrl
 * @description
 * # NewApplicationCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('NewApplicationCtrl', function ($scope, $http, $location, Application, $localStorage) {
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

    $scope.init = function() {
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

      $scope.routeActivePanel = 0
    }

    $scope.selectTrafficType = function(type) {
      $scope.application.traffic_type = type
    }

    $scope.selectTicketType = function(type) {
      $scope.application.ticket_type = type
    }

    $scope.setFormValue = function() {
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
        $http({
        	method : 'GET',
        	url : 'y_transit_info?from=' + params.from + '&' + 'to=' + params.to + '&' + 'ticket=' + params.ticket_type,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).success(function (response) {
          // If successful we assign the response to the global user model
          if (!response.success) {
            return;
          }
          $scope.routes_info = response.routes;
          lastCheckParams = params
        }).error(function (response) {
          // $scope.errors.push(response.message);
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
      $scope.application.created_at = currentDate;
      $scope.application.updated_at = currentDate;
      Application.post($scope.application).then(function(){
        $location.path('/applications')
      })
    }

    // テストデータ作成用のメソッド（仮）
    function GenerateTestData(user_id) {
      var currentDate = new Date();
      return {
        user_id: user_id,
        target_month: 12,
        apply_date: currentDate,
        total_fare: 270,
        manage_user_id: '',
        created_at: currentDate,
        updated_at: currentDate,
        details: [
          {
            use_date: currentDate,
            traffic_type: '1',
            use_line: '東京メトロ　丸ノ内線',
            departure_place: '東京駅',
            arrival_place: '池袋駅',
            ticket_type: '1',
            round_trip_flag: false,
            fare: 270,
            manual_input_flag: false,
            purpose: 'お客様先、面談のため',
            created_at: currentDate,
            updated_at: currentDate,
          },
          {
            use_date: currentDate,
            traffic_type: '1',
            use_line: '東京メトロ　丸ノ内線',
            departure_place: '池袋駅',
            arrival_place: '淡路町',
            ticket_type: '1',
            round_trip_flag: false,
            fare: 150,
            manual_input_flag: false,
            purpose: '帰宅',
            created_at: currentDate,
            updated_at: currentDate,
          }
        ]
      }
    }
  });
