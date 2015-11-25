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

  	// Available Genres and Categories

  	$scope.data = {
		topGenres: [
			'Fiction',
			'Non-Fiction'
		],
		categories: [
			'Thriller',
			'Health',
			'Social Sciences',
			'Humor',
			'Fantasy',
			'History',
			'Medical Books',
			'Technology',
			'Literature',
			'Comics',
			'Self-Help',
			'Relationships',
			'Arts',
			'Christian Books',
			'Calendars',
			'Business',
			'Engineering',
			'Religion',
			'Science Fiction',
			'Sciences',
			'Parenting',
			'Children\'s Books',
			'Travel',
			'Law',
			'Sports',
			'Romance',
			'Teen',
			'Biographies',
			'Cookbooks',
			'Education',
			'Spirituality',
			'Computers',
			'Politics'
		]
  	 };
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

	  	     $scope.wait = true;

	  	     $http.get('http://localhost:8080/api/search/books?q=' + text + '&genres=' + category + '&root_genres=' + topGengre).success(function(books) {
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
  	}, true);


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
