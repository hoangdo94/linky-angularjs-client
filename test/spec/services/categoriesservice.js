'use strict';

describe('Service: categoriesService', function () {

  // load the service's module
  beforeEach(module('linkyApp'));

  // instantiate service
  var categoriesService;
  beforeEach(inject(function (_categoriesService_) {
    categoriesService = _categoriesService_;
  }));

  it('should do something', function () {
    expect(!!categoriesService).toBe(true);
  });

});
