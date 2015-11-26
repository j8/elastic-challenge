'use strict';

/**
 * @ngdoc function
 * @name reedsyChallengeApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the reedsyChallengeApp
 */

angular.module('reedsyChallengeApp')
  .controller('IndexCtrl', function ($scope, $http, $sanitize, config, categories, books, Books) {

  	// Scope books
  	$scope.books = books.hits;

  	// Fetch available Genres and Categories from the server

  	$scope.categoryData = categories;

  	// Search

  	$scope.query = {};
  	$scope.query.topGenre = '';
  	$scope.query.category = '';
  	$scope.query.keyword = '';

  	$scope.$watch('query', function(nv,ov) {
  		if($scope.query.topGenre.length > 0 && nv!==ov || $scope.query.category.length > 0 && nv!==ov || $scope.query.keyword.length > 0 && nv!==ov) {
  			
	  	   	// Escape entries
	  	     var text =  $sanitize($scope.query.keyword);
	  	     var topGengre = $sanitize($scope.query.topGenre);
	  	     var category = $sanitize($scope.query.category);

	  	     // Cache spinner var if needed
	  	     $scope.wait = true;

	  	     $http.get(config.apiBackend + '/api/search/books?q=' + text + '&genres=' + category + '&root_genres=' + topGengre).success(function(books) {
	  	         $scope.books = books.hits;
	  	         $scope.totalBooks = books.total;
	  	         $scope.wait = false;
	  	      }).error(function(err){
	  	         console.err('Some server error', err);
	  	      });
	  	   } else {
	  	     $scope.wait = true;
	  	     
	  	     Books.query({page: 1}, function(books) {
	  	       $scope.wait = false;
	  	       $scope.totalBooks = books.total;
	  	       $scope.books = books.hits;
	  	     });
	  	   }
  	}, true); //Deep scope watching


  	// Pagination

	 $scope.booksPerPage = config.booksPerPage; // this should match however many results your API puts on one page
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
