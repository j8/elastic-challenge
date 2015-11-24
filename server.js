var restify = require('restify');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  // log: 'trace'
});

var server = restify.createServer();
server.use(restify.queryParser());

// Fetch all books

server.get('/books', function(req, res, next) {

  var perPage = 10
  , page = Math.max(0, req.query.page) - 1;

  // Job.search({
  //   match_all : {}
  // },{
  //     from: perPage * page,
  //     size: perPage,
  //     hydrate:true
  // }, function(err, results) {
  //     if (err) {
  //         return res.status(500).json({
  //             error: 'Cannot update the job ' + err 
  //         });
  //     }
  //     // results here
  //     res.json(results.hits)
  // });

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
      var hits = resp.hits.hits;
	  res.send(hits);
	  next();
  }, function (err) {
      console.trace(err.message);
  });

});


// Fetch book by id

server.get('/books/:id', function(req, res, next) {

  var perPage = 10
  , page = Math.max(0, req.query.page) - 1;

  // Job.search({
  //   match_all : {}
  // },{
  //     from: perPage * page,
  //     size: perPage,
  //     hydrate:true
  // }, function(err, results) {
  //     if (err) {
  //         return res.status(500).json({
  //             error: 'Cannot update the job ' + err 
  //         });
  //     }
  //     // results here
  //     res.json(results.hits)
  // });

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
      var hits = resp.hits.hits;
	  res.send(hits);
	  next();
  }, function (err) {
      console.trace(err.message);
  });

});


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});