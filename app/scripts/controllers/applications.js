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

    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    // $scope.applications = Application.getList().$object;
    $scope.init = function(){
      $scope.$parent.$parent.menuAvailable = true;

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
