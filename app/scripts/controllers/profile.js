'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
    .controller('ProfileCtrl', function($scope, $rootScope, $routeParams, $location, usersService, postsService, followsService) {
        $scope.profileUser = {};
        var userId = parseInt($routeParams.userId);
        usersService.get(userId, function(user) {
            if (user.id !== userId) {
                $location.path('/');
            }
            $scope.profileUser = user;

            // Get user avatar
            if ($scope.profileUser.avatar_id !== null) {
                $scope.profileUser.avatar_url = $rootScope.apiUrl + '/files/' + $scope.profileUser.avatar_id;
            } else {
                $scope.profileUser.avatar_url = '/images/default/default_avatar.png';
            }

            // Get user cover
            if ($scope.profileUser.cover_id !== null) {
                $scope.profileUser.cover_url = $rootScope.apiUrl + '/files/' + $scope.profileUser.cover_id;
            } else {
                $scope.profileUser.cover_url = '/images/default/default_cover.png';
            }
        });

        $scope.categories = ['Feeds', 'Followers', 'Following'];

        postsService.getUserPost(userId, function(posts) {

            posts.forEach(function(row, index) {
                // Update avatar_url for each post
                if (row.avatar_id !== null) {
                    posts[index].avatar_url = $rootScope.apiUrl + '/files/' + row.avatar_id;
                } else {
                    posts[index].avatar_url = '/images/default/default_avatar.png';
                }

                // Update thumb_url for each post
                if (row.thumb_id !== null) {
                    posts[index].thumb_url = $rootScope.apiUrl + '/files/' + row.thumb_id;
                } else {
                    posts[index].thumb_url = '/images/default/default_thumbnail.png';
                }
            });
            $scope.feeds = posts;
        });

        followsService.getFollowers(userId, function(followers) {
            $scope.followers = followers;
        });

        followsService.getFollowings(userId, function(followings) {
            $scope.followings = followings;
        });

        // filter
        $scope.filterValue = 'Feeds';
        $scope.shown = 'Feeds';

        $scope.filter = function(cat) {
            $scope.filterValue = cat;
            if (cat === 'Feeds') {
                $scope.shown = 'Feeds';
            } else if (cat === 'Followers') {
                $scope.shown = 'Followers';
            } else if (cat === 'Following') {
                $scope.shown = 'Following';
            }
        };
    });