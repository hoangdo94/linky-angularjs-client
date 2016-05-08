'use strict';

/**
 * @ngdoc service
 * @name linkyApp.authService
 * @description
 * # authService
 * Factory in the linkyApp.
 */
angular.module('linkyApp')
  .factory('authService', function ($rootScope, $http, $location, localStorageService) {
    var username = null;
    var password = null;
    var isLoggedIn = false;
    var currentUser = {};

    // Public API here
    return {
      init: function(callback) {
          username = localStorageService.get('username');
          password = localStorageService.get('password');
          currentUser = localStorageService.get('currentUser');
          $rootScope.currentUser = currentUser;
          if (username && password) {
            this.login(username, password, callback);
          } else {
            if (callback) {
              callback(false, null);
            }
          }
      },
      updateLocalPassword: function(password) {
        localStorageService.set('password', password);
        var username = localStorageService.get('username');
        $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa(username + ':' + password); // jshint ignore:line
      },
      login: function(username, password, callback) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa(username + ':' + password); // jshint ignore:line
          $http.post($rootScope.apiUrl + '/auth')
            .success(function(data) {
                localStorageService.set('username', username);
                localStorageService.set('password', password);
                localStorageService.set('currentUser', data);
                isLoggedIn = true;
                currentUser = data;
                if (callback) {
                  callback(true, currentUser);
                }
            })
            .error(function() {
                //remove the auth header
                $http.defaults.headers.common['Authorization'] = ''; // jshint ignore:line
                if (callback) {
                  callback(false, null);
                }
            });
      },
      logout: function() {
          username = null;
          password = null;
          currentUser = {};
          isLoggedIn = false;
          localStorageService.remove('username', 'password', 'currentUser');
          //remove the auth header
          $http.defaults.headers.common['Authorization'] = ''; // jshint ignore:line
          $location.path('/login');
      },
      isLoggedIn: function() {
        return isLoggedIn;
      },
      isAdmin: function() {
        return parseInt(currentUser.isAdmin);
      },
      getCurrentUser: function() {
        return currentUser;
      }
    };
  });
