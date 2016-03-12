'use strict';

describe('Controller: ProfileEditCtrl', function () {

  // load the controller's module
  beforeEach(module('linkyApp'));

  var ProfileEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileEditCtrl = $controller('ProfileEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfileEditCtrl.awesomeThings.length).toBe(3);
  });
});
