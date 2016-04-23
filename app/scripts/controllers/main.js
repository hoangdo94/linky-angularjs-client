'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
    .controller('MainCtrl', function($rootScope, $scope, $http, localStorageService) {
        // data
        $scope.categories = ['Technology', 'Photography', 'Life', 'Economy', 'Joke'];
        $scope.preferredCategories = $scope.categories.slice(0, 3);
        $scope.otherCategories = $scope.categories.slice(3, $scope.categories.length);

        $scope.feeds = [];
        $scope.current = {};
        $scope.link = '';
        $scope.isFormShown = false;
        $scope.moreCategoriesText = 'More...';

        // Get all posts
        $scope.apiUrl = localStorageService.get('apiUrl');
        $http.get($scope.apiUrl + '/post')
            .success(function(response) {
                $scope.feeds = response;
                $scope.shown = $scope.feeds;
                console.dir(response);
            })
            .error(function(error) {
                console.error(error);
            });

        // share
        $scope.showForm = function() {
            if (isUrl($scope.link)) {
                $scope.isFormShown = true;
            } else {
                $scope.isFormShown = false;
            }
        };
        $scope.hideForm = function() {
            $scope.link = '';
            $scope.isFormShown = false;
        };
        // filter
        $scope.filterValue = 'All';

        $scope.filter = function(cat, isOther) {
            if (isOther) {
                $scope.filterValue = 'Other';
                $scope.moreCategoriesText = cat;
            } else {
                $scope.filterValue = cat;
                $scope.moreCategoriesText = 'More...';
            }

            if (cat === 'All') {
                $scope.shown = $scope.feeds;
            } else {
                $scope.shown = $scope.feeds.filter(function(f) {
                    return f.category === cat;
                });
            }
        };

        // view mode
        $scope.setViewMode = function(mode) {
            $rootScope.viewMode = mode;
        };

        function isUrl(s) {
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return regexp.test(s);
        }
    });