var restify = require('restify');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  // log: 'trace'
});

var server = restify.createServer();
server.use(restify.queryParser());

// Enable CORS *** THIS IS FOR THE DEMO PURPOSES ONLY ***

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

// Fetch all books

server.get('/books', function(req, res, next) {

  var perPage = 10
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
	size: perPage,
    }
  }).then(function (resp) {
      var hits = resp.hits;
	  res.send(hits);
	  next();
  }, function (err) {
      console.trace(err.message);
      res.status(500).json({
      	error: err.message 
      });
      next();
  });

});

// Fetch book by id

server.get('/books/:id', function(req, res, next) {

  var perPage = 10
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
	size: perPage,
    }
  }).then(function (resp) {
      var hits = resp.hits;
	  res.send(hits);
	  next();
  }, function (err) {
	console.trace(err.message);
	res.status(500).json({
		error: err.message 
	});
	next();
  });

});


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});