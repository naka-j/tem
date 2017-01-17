'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ApplicationsCtrl
 * @description
 * # ApplicationsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ApplicationsCtrl', function($scope, $location, Application) {
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
      $scope.getApplicationList()
    }

    $scope.getApplicationList = function() {
      $scope.target_ym = year.toString() + '/' + month.toString();
      $scope.applications = Application.getList({'target_year': year, 'target_month': month}).$object;
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
  });
