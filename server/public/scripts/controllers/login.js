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

    $scope.init = function() {
      $scope.$parent.$parent.menuAvailable = false;
      $scope.$parent.$parent.navLogin = true;
    }

    $scope.doLogin = function() {
      $scope.errors = [];

      var params = {user_id: $scope.userId, password: $scope.password}
      // $http.post('http://localhost:3000/authenticate', $scope.userId)

      if (!$scope.userId) {
        $scope.errors.push("ユーザーID、パスワードを入力してください。")
        return;
      }

      $http({
      	method : 'POST',
      	url : 'api/authenticate',
      	// url : 'http://localhost:3000/api/authenticate',
        data: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function (response) {
        // If successful we assign the response to the global user model
        if (!response.success) {
          $scope.errors.push(response.message);
          return;
        }

        $localStorage.token = response.token
        $localStorage.user_id = response.user.id
        $localStorage.user_name = response.user.name
        console.log("auth successfully!");

        $location.path('/application/new')
      }).error(function (response) {
        $scope.errors.push(response.message);
        return;
      });
    }

    $scope.clearErrors = function() {
      $scope.errors = [];
    }
  });
