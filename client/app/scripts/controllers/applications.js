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

    $scope.applications = Application.getList().$object;

    // $scope.getAll = function() {
    //   $scope.errors = [];
    //
    //   var successHandler = function(response) {
    //     console.log(response);
    //   }
    //
    //   var errorHandler = function(response) {
    //     console.log(response);
    //   }
    //
    //   $http.get('http://localhost:3000/applications', '111111').success(successHandler).error(errorHandler)
    // }
  });
