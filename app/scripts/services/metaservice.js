'use strict';

/**
 * @ngdoc service
 * @name linkyApp.metaService
 * @description
 * # metaService
 * Factory in the linkyApp.
 */
angular.module('linkyApp')
  .factory('metaService', function ($rootScope, $http) {
    // Public API here
    return {
      getLinkMeta: function (link, callback) {
          $http.post($rootScope.apiUrl + '/meta', {link: link})
            .success(function(data) {
              console.log(data);
              if (callback) {
                callback(data);
              }
            })
            .error(function() {
              if (callback) {
                callback(null);
              }
            });
      }
    };
  });
