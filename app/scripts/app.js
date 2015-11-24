'use strict';

/**
 * @ngdoc overview
 * @name reedsyChallengeApp
 * @description
 * # reedsyChallengeApp
 *
 * Main module of the application.
 */
angular
  .module('reedsyChallengeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });