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

    var renderNextForm = function() {
      switch ($scope.applicationFormNo) {
        case "1":
          $scope.applicationFormNo = "2";
          break;
        case "2":
          $scope.applicationFormNo = "3";
          break;
        case "3":
          $scope.applicationFormNo = "4";
          break;
        case "4":
          $scope.applicationFormNo = "5";
          break;
        case "5":
          $scope.applicationFormNo = "6";
          break;
        case "6":
          $scope.applicationFormNo = "7";
          break;
        case "7":
          $scope.applicationFormNo = "8";
          break;
        case "8":
          break;
        default:
          $scope.applicationFormNo = "1";
      }
    }

    var renderPreviousForm = function() {
      switch ($scope.applicationFormNo) {
        case "1":
          break;
        case "2":
          $scope.applicationFormNo = "1";
          break;
        case "3":
          $scope.applicationFormNo = "2";
          break;
        case "4":
          $scope.applicationFormNo = "3";
          break;
        case "5":
          $scope.applicationFormNo = "4";
          break;
        case "6":
          $scope.applicationFormNo = "5";
          break;
        case "7":
          $scope.applicationFormNo = "6";
          break;
        case "8":
          $scope.applicationFormNo = "7";
          break;
      }
    }

    $scope.$watch(function() {
      if (typeof angular.element('#firstForm').attr('class') == 'undefined') {
        return
      }
      return angular.element('#firstForm').attr('class').indexOf('switch-left')
    }, function(newIndex, oldIndex) {
      if (newIndex != oldIndex && newIndex > oldIndex) {
        renderNextForm()
      } else if (newIndex != oldIndex && newIndex < oldIndex) {
        renderPreviousForm()
      }
    })

    // 次のフォームに進む　右から左にスライドアニメーション
    $scope.nextForm = function() {

      $scope.switchToLeft = false;
      // 前回と動く方向が違う場合は実行タイミングをずらす
      if ($scope.beforeMovingTo == 'N') {
        renderNextForm()
      }
      $scope.beforeMovingTo = 'N'
    }

    // 前のフォームに戻る　左から右にスライドアニメーション
    $scope.previousForm = function() {

      $scope.switchToLeft = true;
      // 前回と動く方向が違う場合は実行タイミングをずらす
      if ($scope.beforeMovingTo == 'P') {
        renderPreviousForm()
      }
      $scope.beforeMovingTo = 'P'
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
