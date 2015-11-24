# reedsy-challenge

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.14.0.

## Build & development

Install first with

```
bower install && npm install
```

Run `grunt` for building and `grunt serve` for preview.

## Setup the backend

# Mac OS X
brew install jq

# Ubuntu
sudo apt-get install jq


### Install Elasticsearch

brew instal elastic

### Insert books.json into Elasticsearch

Note: books.josn was preformated in https://jsonformatter.curiousconcept.com to match RFC 4627
```
cat backend/books.json | jq -c '.[] | {"index": {"_index": "books", "_type": "book", "_id": .id}}, .' | curl -XPOST localhost:9200/_bulk --data-binary @-
```
Test if import is succesful by browsing to: http://localhost:9200/books/book/{id}, for example http://localhost:9200/books/book/b334861393

## Testing

Running `grunt test` will run the unit tests with karma.
