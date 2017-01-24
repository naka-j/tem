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
      $scope.applications = Application.getList({
        'target_year': year,
        'target_month': month,
        'user_id': $localStorage.user_id
      }).$object
      $scope.isLoadingData = false
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
