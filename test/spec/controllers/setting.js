'use strict';

describe('Controller: SettingCtrl', function () {

  // load the controller's module
  beforeEach(module('linkyApp'));

  var SettingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SettingCtrl = $controller('SettingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(SettingCtrl.awesomeThings.length).toBe(3);
  // });
});
