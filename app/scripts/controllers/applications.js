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

    // $scope.applications = Application.getList().$object;
    $scope.init = function(){
      $scope.getAll
    }
    $scope.getAll = function() {
      var month = new Date().month;
      $scope.applications = Application.getList({'target_month': month}).$object;
    }
  });
