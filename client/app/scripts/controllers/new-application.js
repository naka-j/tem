'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NewApplicationCtrl
 * @description
 * # NewApplicationCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('NewApplicationCtrl', function ($scope, $location, Application, $timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.init = function() {
      $scope.applicationFormNo = "1";
      $scope.beforeMovingTo = 'N'
    }

    $scope.saveApplication = function() {
      $scope.application = GenerateTestData(111111)
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
            thicket_type: '1',
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
            thicket_type: '1',
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
