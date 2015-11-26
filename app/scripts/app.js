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
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'angularUtils.directives.dirPagination',
    'relativeDate'
  ])
  .constant('config', {
    'production': false, //You an use this tag with grunt for additional configs
    'booksPerPage': 12, // Note - you need to change this also in server.js
    'apiBackend': 'http://localhost:8080'
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('books', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'IndexCtrl',
        controllerAs: 'index',
        resolve: {
          books: function(Books) {
             return Books.query({page: 1}).$promise.then(function(books){
                 return books;
               });
           },
           categories: function(config, $http) {
            return $http({method: 'GET', url: config.apiBackend + '/api/config'}).then(function(response) {
                return response.data;
            });
           } 
        }
      })
      .state('book', {
        url: '/books/:bookId',
        templateUrl: 'views/book.html',
        controller: 'BookCtrl',
        controllerAs: 'book',
        resolve: {
          book: function(Books, $stateParams) {
              return  Books.get({bookId: $stateParams.bookId}).$promise.then(function(book){
                return book;
              });
            }
        }
      });

      $urlRouterProvider.otherwise('/');

  })

  // Disable debug info and boost the performance

  .config(['$compileProvider', 'config', function ($compileProvider, config) {
      if(config.production) {
          $compileProvider.debugInfoEnabled(false);
      }
  }]);