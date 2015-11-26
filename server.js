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
		// match_all : {}
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

// Search

server.get('api/search/books', function(req, res, next) {

  var perPage = config.perPage
      , page = Math.max(0, req.query.page) - 1;
    // Init es client and use lodash to escape to query strings on backend too

      client.search({
        index: 'books',
        type: 'book',
        body: {
          "query": {
            "bool": {
              "should": [
                { "match": { "name":  req.query.q }},
                { "match": { "author.name": req.query.q   }}
              ],

              "filter": [ 
                { "term":  { "genre.name": req.query.genres }}
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