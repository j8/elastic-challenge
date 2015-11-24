'use strict';

describe('Service: books', function () {

  // load the service's module
  beforeEach(module('reedsyChallengeApp'));

  // instantiate service
  var books;
  beforeEach(inject(function (_books_) {
    books = _books_;
  }));

  it('should do something', function () {
    expect(!!books).toBe(true);
  });

});
