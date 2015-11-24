'use strict';

/**
 * @ngdoc function
 * @name reedsyChallengeApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the reedsyChallengeApp
 */

angular.module('reedsyChallengeApp')
  .controller('IndexCtrl', function ($scope, $http, $sanitize, books, Books) {

  	// Scope books
  	$scope.books = books.hits;

  	// Search

  	$scope.query = {};
  	$scope.query.keyword = "";

  	$scope.$watch('query.keyword', function(nv,ov) {
  		if($scope.query.keyword.length > 0 && nv!==ov) {
	  	   	// Escape text
	  	     var text =  $sanitize($scope.query.keyword);

	  	     $scope.wait = true;
	  	     $http.get('http://localhost:8080/api/search/books?q=' + text + '&genres=""&root_genres=Test&page=1').success(function(books) {
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
	  	       $scope.totalBooks = books.total;
	  	       $scope.books = books.hits;
	  	     });
	  	   }
  	});


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
