'use strict';

describe('Service: postsservice', function () {

  // load the service's module
  beforeEach(module('linkyApp'));

  // instantiate service
  var postsservice;
  beforeEach(inject(function (_postsservice_) {
    postsservice = _postsservice_;
  }));

  it('should do something', function () {
    expect(!!postsservice).toBe(true);
  });

});
