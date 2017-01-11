'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NewApplicationCtrl
 * @description
 * # NewApplicationCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('NewApplicationCtrl', function ($scope, $http, $location, Application, $timeout) {
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
      $scope.application = {};
      $scope.application_detail = {}

      $scope.application = {
        user_id: 111111,
        target_month: 12
      }
      $scope.application_detail = {
        use_date: new Date(),
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

    $scope.onopen = function($event) {
      // カレンダーを開く
      $scope.opened = true;
    };

    $scope.selectTrafficType = function(type) {
      $scope.application_detail.traffic_type = type
    }

    $scope.selectTicketType = function(type) {
      $scope.application_detail.ticket_type = type
    }

    $scope.setFormValue = function() {
      if ($scope.application_detail.traffic_type) {
        $scope.application_detail.traffic_type_view = TRAFFIC_TYPE_NAMES[$scope.application_detail.traffic_type]
      } else {
        $scope.application_detail.traffic_type_view = ""
      }

      if ($scope.application_detail.ticket_type) {
        $scope.application_detail.ticket_type_view = TICKET_TYPE_NAMES[$scope.application_detail.ticket_type]
      } else {
        $scope.application_detail.ticket_type_view = ""
      }

      if ($scope.application_detail.via_place1) {
        $scope.application_detail.via_place_view = $scope.application_detail.via_place1 + "経由"
      } else {
        $scope.application_detail.via_place_view = ""
      }

      if ($scope.application_detail.departure_place && $scope.application_detail.arrival_place && $scope.application_detail.traffic_type == "1" && $scope.application_detail.ticket_type) {
        var from = $scope.application_detail.departure_place + "駅"
        var to = $scope.application_detail.arrival_place + "駅"
        var params = {from: from, to: to, ticket_type: $scope.application_detail.ticket_type}
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
      $scope.application_detail.fare = fare;
    }

    $scope.saveApplication = function() {
      var currentDate = new Date();
      $scope.application.apply_date = currentDate;
      $scope.application.created_at = currentDate;
      $scope.application.updated_at = currentDate;
      $scope.application_detail.created_at = currentDate;
      $scope.application_detail.updated_at = currentDate;
      $scope.application.details = $scope.application_detail;
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
