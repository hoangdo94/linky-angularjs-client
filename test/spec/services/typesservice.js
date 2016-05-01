'use strict';

describe('Service: typesService', function () {

  // load the service's module
  beforeEach(module('linkyApp'));

  // instantiate service
  var typesService;
  beforeEach(inject(function (_typesService_) {
    typesService = _typesService_;
  }));

  it('should do something', function () {
    expect(!!typesService).toBe(true);
  });

});
