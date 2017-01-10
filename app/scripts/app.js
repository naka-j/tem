'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'restangular',
    'ngStorage',
    'ngTouch',
    'ui.bootstrap'
  ])

  .config(function ($routeProvider, $httpProvider, RestangularProvider) {
    // RestangularProvider.setBaseUrl('http://localhost:3000')
    RestangularProvider.setBaseUrl('https://travel-ex.herokuapp.com/')
    $routeProvider
      .when('/', {
        redirectTo: '/application/new'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/applications', {
        templateUrl: 'views/applications.html',
        controller: 'ApplicationsCtrl'
      })
      .when('/application/new', {
        templateUrl: 'views/new-application.html',
        controller: 'NewApplicationCtrl'
      })
      .when('/application/:id/edit', {
        templateUrl: 'views/new-application.html',
        controller: 'NewApplicationCtrl'
      })
      .otherwise({
        templateUrl: '/404.html'
      });
      $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
      };
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

      $httpProvider.interceptors.push(function($q, $location, $localStorage) {
        return {
          request: function (config) {
              config.headers = config.headers || {};
              if ($localStorage.token) {
                  config.headers['x-access-token'] = $localStorage.token;
              }
              return config;
          },
          responseError: function(response) {
              if(response.status === 401 || response.status === 403) {
                  $location.path('/login');
              }
              return $q.reject(response);
          }
        };
      });
    // $httpProvider.interceptors.push('AuthInterceptor');
  })

  .factory('ApplicationRestangular', function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setRestangularFields({
        id: '_id'
      })
    });
  })
  .factory('Application', function(ApplicationRestangular){
    return ApplicationRestangular.service('applications');
  })
