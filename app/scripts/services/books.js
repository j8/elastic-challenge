'use strict';

/**
 * @ngdoc service
 * @name reedsyChallengeApp.books
 * @description
 * # books
 * Factory in the reedsyChallengeApp.
 */
angular.module('reedsyChallengeApp')
  .factory('Books', function ($resource) {

    // Public API here
    return $resource('http://localhost:8080/api/books/:bookId', {bookId:'@id'}, 
    {
      update: {
        method: 'PUT'
      },
      query: {
        method:'GET', isArray: false
      }
    }
    );

  });