'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ApplicationsCtrl
 * @description
 * # ApplicationsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ApplicationsCtrl', function($scope, $location, Application, $localStorage) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var TRAFFIC_TYPE_NAMES = {"1": "電車", "2": "バス", "3": "タクシー"}
    var TICKET_TYPE_NAMES = {"1": "ICカード", "2": "切符"}

    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    // $scope.applications = Application.getList().$object;
    $scope.init = function(){
      $scope.$parent.$parent.menuAvailable = true;
      $scope.$parent.$parent.navLogin = false;

      $scope.getApplicationList();
      $scope.deleteConfirming = false;
    }

    $scope.getApplicationList = function() {
      $scope.isLoadingData = true
      $scope.target_ym = year.toString() + '年' + month.toString() + '月';
      Application.getList({
        'target_year': year,
        'target_month': month,
        'user_id': $localStorage.user_id
      }).then(function(applications){
        $scope.applications = _.sortBy(applications, 'use_date').reverse();
      });

      $scope.isLoadingData = false
    }

    $scope.getTotalFare = function(){
      var total = 0;
      _.each($scope.applications, function(application){
        if (application.fare) {
          total += application.fare
        }
      });
      return total;
    }

    $scope.jumpToEdit = function(application) {
      $location.path("/application/" + application._id + "/edit");
    }

    $scope.previousMonthList = function() {
      if (month == 1) {
        year = year - 1;
        month = 12
      } else {
        month = month - 1;
      }
      $scope.getApplicationList()
    }

    $scope.nextMonthList = function() {
      if (month == 12) {
        year = year + 1;
        month = 1
      } else {
        month = month + 1;
      }
      $scope.getApplicationList()
    }

    $scope.openConfirm = function(application) {
      $scope.application = application;
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
      if ($scope.application.purpose.length > 13) {
        $scope.application.purpose_view = $scope.application.purpose.substr(0, 12) + "..."
      } else {
        $scope.application.purpose_view = $scope.application.purpose
      }
      $scope.confirming = true;
    }
    $scope.closeConfirm = function() {
      $scope.confirming = false;
      $scope.deleteConfirming = false;
    }

    $scope.toggleConfirmDelete = function() {
      $scope.deleteConfirming = !$scope.deleteConfirming;
    }

    $scope.deleteApplication = function(application) {
      application.remove();
      $scope.confirming = false;
      $scope.deleteConfirming = false;
      $scope.getApplicationList()
    }
  });
