'use strict';

describe('Service: followsService', function () {

  // load the service's module
  beforeEach(module('linkyApp'));

  // instantiate service
  var followsService;
  beforeEach(inject(function (_followsService_) {
    followsService = _followsService_;
  }));

  it('should do something', function () {
    expect(!!followsService).toBe(true);
  });

});
