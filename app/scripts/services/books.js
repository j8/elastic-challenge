'use strict';

/**
 * @ngdoc service
 * @name reedsyChallengeApp.books
 * @description
 * # books
 * Factory in the reedsyChallengeApp.
 */
angular.module('reedsyChallengeApp')
  .factory('Books', function ($resource, config) {

    // Public API here
    return $resource(config.apiBackend + '/api/books/:bookId', {bookId:'@id'}, 
    {
      // PUT method for future purposes
      update: {
        method: 'PUT'
      },
      query: {
        method:'GET', isArray: false
      }
    }
    );

  });