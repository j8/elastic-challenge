'use strict';

/**
 * @ngdoc function
 * @name reedsyChallengeApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the reedsyChallengeApp
 */

angular.module('reedsyChallengeApp')
  .controller('IndexCtrl', function ($scope, $http, books, Books) {

  	// Scope books
  	$scope.books = books.hits;

  	// Search

  	$scope.query = {};
  	$scope.query.keyword = "";

  	$scope.search = function() {

  	   if($scope.query.keyword.length > 0) {
  	     var text = '"' + $scope.query.keyword + '"' || '""';
  	     $scope.wait = true;
  	     $http.get('/api/search/books?search=' + text + '&page=1').success(function(books) {
  	         $scope.books = books.hits;
  	         $scope.totalBooks = books.total;

  	         $scope.wait = false;
  	      }).error(function(err){
  	         console.log("Some server error");
  	      })
  	   } else {
  	     $scope.wait = true;
  	     
  	     Books.query({page: 1}, function(books) {
  	       $scope.wait = false;
  	       $scope.totalBooks = jobs.total;
  	       $scope.books = books.hits;
  	     });
  	   }

  	 }

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
