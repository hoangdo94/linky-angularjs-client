'use strict';

describe('Service: prefercategoriesService', function () {

  // load the service's module
  beforeEach(module('linkyApp'));

  // instantiate service
  var prefercategoriesService;
  beforeEach(inject(function (_prefercategoriesService_) {
    prefercategoriesService = _prefercategoriesService_;
  }));

  it('should do something', function () {
    expect(!!prefercategoriesService).toBe(true);
  });

});
