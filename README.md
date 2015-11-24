# reedsy-challenge

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.14.0.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Setup the backend

# Mac OS X
brew install jq

# Ubuntu
sudo apt-get install jq


### Install Elasticsearch

### Insert books.json into Elasticsearch

cd backend/

curl -XPUT localhost:9200/_bulk --data-binary @books.json

## Testing

Running `grunt test` will run the unit tests with karma.
