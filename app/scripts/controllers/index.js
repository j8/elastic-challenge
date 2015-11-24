'use strict';

/**
 * @ngdoc function
 * @name reedsyChallengeApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the reedsyChallengeApp
 */

angular.module('reedsyChallengeApp')
  .controller('IndexCtrl', function ($scope, books, Books) {

  	// Scope books
  	$scope.books = books.hits;

  	// Pagination

	 $scope.booksPerPage = 10; // this should match however many results your API puts on one page
	 $scope.totalBooks = books.total;

	 $scope.pagination = {
	     current: 1
	 };

	 $scope.pageChanged = function(newPage) {
	     getResultsPage(newPage);
	 };

	 function getResultsPage(pageNumber) {

		Books.query({page: pageNumber}, function(books) {
			$scope.books = books.hits;
			$scope.totalBooks = books.total;
		});
	 }

  });
