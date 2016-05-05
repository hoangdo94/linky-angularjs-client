'use strict';

describe('Service: commentsService', function () {

  // load the service's module
  beforeEach(module('linkyApp'));

  // instantiate service
  var commentsService;
  beforeEach(inject(function (_commentsService_) {
    commentsService = _commentsService_;
  }));

  it('should do something', function () {
    expect(!!commentsService).toBe(true);
  });

});
