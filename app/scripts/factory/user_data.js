'use strict';
/**
 * @ngdoc service
 * @name linkyApp.UserData
 * @description
 * # UserData
 * Factory in the linkyApp.
 */
angular.module('linkyApp')
    .factory('UserData', function($cookieStore, $window, $location) {
        var currentUser = null;

        var userData = {
            init: function() {
                // Check if user 's back after first-time login
                if (($cookieStore.get('userId') && currentUser == null)) {
                    $.ajaxSetup({
                        async: false
                    });
                    update({
                        '_id': $cookieStore.get('userId')
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
                return (currentUser && currentUser.is_admin) ? true : false;
            },

            adminRestrict: function(response) {
                response = response || currentUser;
                // Redirect to homepage if not admin but try to
                // access /admin
                if (!response.isAdmin() && !/^\/(admin)?$/.test($window.location.pathname)) {
                    $location.path('/');
                }
            },

            setCurrentUser: function(user) {
                currentUser = user;
                $cookieStore.put('userId', user._id);
            },

            getCurrentUser: function() {
                return currentUser;
            },

            isLoggedIn: function() {
                return (currentUser) ? currentUser : false;
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
                id = user._id;
            }

            // TO-DO
            // api-to-validate-user-with-userId

            // $.get(localStorageService.get('apiUrl') + '/api/user?id=' + id, function(response) {
            //   if (typeof response == 'object') {
            //       userData.setCurrentUser(response);
            //   }
            // })
            // .fail(function() {

            // });
        }

        return userData;
    });