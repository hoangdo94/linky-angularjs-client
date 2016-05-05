'use strict';

describe('Service: filesService', function () {

  // load the service's module
  beforeEach(module('linkyApp'));

  // instantiate service
  var filesService;
  beforeEach(inject(function (_filesService_) {
    filesService = _filesService_;
  }));

  it('should do something', function () {
    expect(!!filesService).toBe(true);
  });

});
