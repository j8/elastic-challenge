'use strict';

/**
 * @ngdoc function
 * @name reedsyChallengeApp.controller:BookCtrl
 * @description
 * # BookCtrl
 * Controller of the reedsyChallengeApp
 */
angular.module('reedsyChallengeApp')
  .controller('BookCtrl', function ($scope, book) {


  	// Init and assign to scope
  	$scope.book = book.hits[0];
  	console.log('book', $scope.book);
  
  });
