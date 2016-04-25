'use strict';
/**
 * @ngdoc service
 * @name linkyApp.UserData
 * @description
 * # UserData
 * Factory in the linkyApp.
 */
angular.module('linkyApp')
    .factory('UserData', function($cookieStore, $window, $location, $http, localStorageService) {
        var currentUser = null;

        var userData = {
            init: function() {
                // Check if user 's back after first-time login
                if (($cookieStore.get('userId') && currentUser == null)) {
                    $.ajaxSetup({
                        async: false
                    });
                    update({
                        'id': $cookieStore.get('userId')
                    }, function(response) {
                        userData.adminRestrict(response);
                        $.ajaxSetup({
                            async: true
                        });

                    });
                } else {
                    this.adminRestrict();
                }
            },

            isAdmin: function() {
                return (currentUser && currentUser.isAdmin == '1') ? true : false;
            },

            adminRestrict: function(response) {
                response = response || currentUser;
                // Redirect to homepage if not admin but try to
                // access /admin
                if (!this.isAdmin() && !/^\/(admin)?$/.test($window.location.pathname)) {
                    $location.path('/');
                }
            },

            update: function(callback) {
                var user = this.getCurrentUser();
                if (user != null) {
                    update(user, function(response) {
                        if (typeof func === 'function') {
                            callback.call(this, response);
                        }
                    });
                }
            },

            setCurrentUser: function(user, callback) {
                currentUser = user;
                $cookieStore.put('userId', user.id);
                if (callback && typeof callback == 'function') {
                    callback.call();
                }
            },

            getCurrentUser: function() {
                return currentUser;
            },

            isLoggedIn: function() {
                return (!_.isEmpty(currentUser)) ? currentUser : false;
            },

            register: function(user) {
                this.setCurrentUser(user);
            },

            login: function() {
                if (this.getCurrentUser() == null) {
                    $location.path('/login');
                }
            },

            logout: function() {
                if ($cookieStore.get('userId') != null) {
                    $cookieStore.remove('userId');
                };

                currentUser = null;

                $location.path('/');
                $location.$$compose();
            },
        };

        function update(user, callback) {
            var id;
            if ($cookieStore.get('userId') != null) {
                id = $cookieStore.get('userId');
            } else {
                id = user.id;
            }

            // TO-DO
            // api-to-validate-user-with-userId
            $.get(localStorageService.get('apiUrl') + '/users/' + id)
                .success(function(response) {
                    if (typeof response == 'object') {
                        userData.setCurrentUser(response, function() {
                            callback.call(this, response);
                        });
                    }
                })
                .error(function(error) {});
        }

        return userData;
    });