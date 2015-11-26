'use strict';

/**
 * @ngdoc function
 * @name reedsyChallengeApp.controller:BookCtrl
 * @description
 * # BookCtrl
 * Controller of the reedsyChallengeApp
 */
angular.module('reedsyChallengeApp')
  .controller('BookCtrl', function ($scope, book, recommend) {

  	// Init and assign to scope
  	$scope.bookEntry = book.hits[0];
  	$scope.recommended = recommend.hits;

  	console.log("recommend", $scope.recommended);
  
  });
