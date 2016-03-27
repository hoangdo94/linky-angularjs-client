'use strict';

/**
 * @ngdoc service
 * @name linkyApp.details
 * @description
 * # details
 * Factory in the linkyApp.
 */
angular.module('linkyApp')
  .factory('details', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
