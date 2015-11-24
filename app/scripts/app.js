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
    'ngTouch',
    'angularUtils.directives.dirPagination'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'IndexCtrl',
        controllerAs: 'index',
        resolve: {
          books: function(Books) {
             return Books.query({page: 1}).$promise.then(function(books){
                 return books;
               });
           }
        }
      })
      .when('/book/:bookId', {
        templateUrl: 'views/book.html',
        controller: 'BookCtrl',
        controllerAs: 'book'
      })
      .otherwise({
        redirectTo: '/'
      });
  });