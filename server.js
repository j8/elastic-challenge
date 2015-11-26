var restify = require('restify');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  // log: 'trace'
});

var server = restify.createServer();
server.use(restify.queryParser());

var config = {
  perPage: 12
};

// Enable CORS *** THIS IS FOR THE DEMO PURPOSES ONLY ***

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

// Get config
// The cateogries and genres should come from some db

server.get('api/config', function(req, res, next) {

  var data = {
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
  res.send(data);
  next();
});

// Fetch all books

server.get('api/books', function(req, res, next) {

  var perPage = config.perPage
  , page = Math.max(0, req.query.page) - 1;

  client.search({
    index: 'books',
    type: 'book',
    body: {
	query: {
	// match: {
	//   body: 'elasticsearch'
	// }
		match_all : {}
	},
	from: perPage * page,
	size: perPage
    }
  }).then(function (resp) {
      var hits = resp.hits;
	  res.send(hits);
	  next();
  }, function (err) {
      res.send({
      	error: err.message 
      });
      next();
  });

});

// Fetch book by id

server.get('api/books/:id', function(req, res, next) {

  var perPage = config.perPage
  , page = Math.max(0, req.query.page) - 1;

  client.search({
    index: 'books',
    type: 'book',
    body: {
  query: {
    match: {
      id: req.params.id
    }
  },
	from: perPage * page,
	size: perPage
    }
  }).then(function (resp) {
    var hits = resp.hits;
	  res.send(hits);
	  next();
  }, function (err) {
    res.send({
      error: err.message 
    });
    next();
  });

});

// Recommendation engine

server.get('api/books/:id/recommend', function(req, res, next) {

  client.search({
    body: {
      query: {
        more_like_this : {
            "fields" : ['genre.category', 'genre.name'],
            "docs" : [
            {
                "_index" : "books",
                "_type" : "book",
                "_id" : req.params.id
            },
            ],
            "min_term_freq" : 1,
            "max_query_terms" : 12,
        },
      },
      size: 3
    }
  }).then(function (resp) {
    var hits = resp.hits;
    res.send(hits);
    next();
  }, function (err) {
    res.send({
      error: err.message 
    });
    next();
  });

});

// Search

server.get('api/search/books', function(req, res, next) {

  var perPage = config.perPage
      , page = Math.max(0, req.query.page) - 1;
    // Init es client and use lodash to escape to query strings on backend too

      client.search({
        index: 'books',
        type: 'book',
        body: {
          query: {
            bool: {
              should: [
                { match: { "name":  req.query.q }},
                { match: { "author.name": req.query.q   }}
              ]
            }
          },
          from: perPage * page,
          size: perPage
        }
      }).then(function (resp) {
          var hits = resp.hits;
          res.send(hits);
          next();
      }, function (err) {
        res.send({
          error: err.message 
        });
        next();
      });

});


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});