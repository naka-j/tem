'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', function($scope, $location, $http, $localStorage) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.doLogin = function(e) {
      $scope.errors = [];

      var params = {user_id: $scope.userId, password: $scope.password}
      // $http.post('http://localhost:3000/authenticate', $scope.userId)
      $http({
      	method : 'POST',
      	url : 'http://localhost:3000/authenticate',
        data: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function (response) {
        // If successful we assign the response to the global user model
        if (!response.success) {
          $scope.errors = [response.message];
          return;
        }

        $localStorage.token = response.token
        console.log("auth successfully!");

        $location.path('/application/new')
      }).error(function (response) {
        $scope.errors.push(response.message);
      });
    }
  });
