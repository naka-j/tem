'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MenuCtrl', function ($scope, $location, $localStorage) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.menuAvailable = true;
    $scope.doLogout = function() {
      $localStorage.$reset()
      $location.path('/login');
    }

    $scope.openNavbar = function() {
      $scope.navbarOpened = true;
    }

    $scope.closeNavbar = function() {
      $scope.navbarOpened = false;
    }

    $scope.toggleNavbar = function() {
      $scope.navbarOpened = !$scope.navbarOpened;
    }

    $scope.userName = function() {
      return $localStorage.user_name
    }
  });
