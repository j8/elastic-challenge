![Reedsy Challenge](https://cloud.githubusercontent.com/assets/818400/11432055/6a832d4c-94ae-11e5-9672-ce11a8c834fd.png
)
# reedsy-challenge

Reedsy challenge is AngularJS SPA app with Node.js and Elasticsearch bakcend. It demonstrates simple functionallity of importing .json data in Elastic via comamnd line and building simple REST client for connecting the data.

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.14.0 and [restify](http://restify.com)

# Preresquits

## Install 'jq'

### Mac OS X

```
brew install jq
```

### Ubuntu

```
sudo apt-get install jq
```

## Install Elasticsearch
```
brew install elastic

```
__Note: version 2.0.0_1 should be installed to support the backend queries__

## Setup the backend

[Download](https://nodejs.org/en/download/) Node.js or verify if you have already installed it:

```
$ node -v
v5.1.0
```

__Note: the project is build with Node.js v5.1.0__

## Build & development

### Clone the repo:

```
git clone https://github.com/j8/reedsy-challenge.git
```

Install needed package dependancies

```
bower install && npm install
```

### Import books.json into Elasticsearch

__Note: books.josn was preformated in https://jsonformatter.curiousconcept.com to match RFC 4627__

We need to import books.json file into Elasticsearch:

```
cat backend/books.json | jq -c '.[] | {"index": {"_index": "books", "_type": "book", "_id": .id}}, .' | curl -XPOST localhost:9200/_bulk --data-binary @-
```

Test if import is succesful by browsing to: ``http://localhost:9200/books/book/{id}``, for example ``http://localhost:9200/books/book/b334861393``

# Run reedsy-challenge

### Run elasticsearch
```
elasticsearch
```

### Run Node.js REST API

```
node server.js
```

### Run the AngularJS front end

```
grunt serve
```


# Testing

TODO: Running `grunt test` will run the unit tests with karma.

# Author

J8

# License

MIT