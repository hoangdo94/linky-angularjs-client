'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
    .controller('ProfileCtrl', function($scope, $rootScope, $routeParams, $location, usersService, postsService, followsService, notify) {
        $scope.profileUser = {};
        var userId = parseInt($routeParams.userId);
        usersService.get(userId, function(user) {
            if (user.id !== userId) {
                $location.path('/');
            }
            $scope.profileUser = user;
            if (user.website && user.website.length > 0 && user.email && user.email.length > 0) {
                $scope.showDelimiter = true;
            } else {
                $scope.showDelimiter = false;
            }
        });


        $scope.feeds = [];
        // pagination
        $scope.currentPostPage = 1;
        $scope.canLoadMorePosts = false;
        $scope.postCount = 0;
        $scope.followerCount = 0;
        $scope.followingCount = 0;

        $scope.categories = ['Shared Links', 'Followers', 'Following'];

        function getUserPosts() {
            postsService.getUserPost(userId, $scope.currentPostPage, 5, function(res) {
                $scope.postCount = res.total;
                if (res.next_page_url) {
                    $scope.canLoadMorePosts = true;
                } else {
                    $scope.canLoadMorePosts = false;
                }
                res.data.forEach(function(post) {
                    $scope.feeds.push(post);
                });
            });
        }

        function getUserFollowers() {
            followsService.getFollowers(userId, function(res) {
                $scope.followerCount = res.total;
                $scope.followers = res.data;
            });
        }

        function getUserFollowings() {
            followsService.getFollowings(userId, function(res) {
                $scope.followingCount = res.total;
                $scope.followings = res.data;
            });
        }

        function reloadFollowingsOfCurrentUser() {
            followsService.getFollowings($rootScope.currentUser.id, function(followings) {
                $rootScope.followingsOfCurrentUser = followings.data;
            });
        }

        $scope.reloadFollow = function() {
            getUserFollowers();
            getUserFollowings();
            reloadFollowingsOfCurrentUser();
        };

        // filter
        $scope.filterValue = 'Shared Links';
        $scope.shown = 'Shared Links';

        $scope.filter = function(cat) {
            $scope.filterValue = cat;
            $scope.shown = cat;
        };

        // pagination
        $scope.loadMorePosts = function() {
            $scope.currentPostPage++;
            getUserPosts();
        };

        // followings
        $scope.isFollowing = function() {
          if (!$scope.followers) {
            return false;
          }
          var u = $scope.followers.find(function(f) {
            return f.id === $rootScope.currentUser.id;
          });
          if (u) {
            return true;
          } else {
            return false;
          }
        };

        $scope.followUser = function() {
          followsService.followUser($scope.profileUser.id, function(res) {
            if (res.status_code === '200') {
              $scope.reloadFollow();
              notify({
                message: 'Followed ' + $scope.profileUser.username,
                duration: 2000,
                position: 'center'
              });
            } else {
              notify({
                message: 'Some errors happened. Please try again later',
                duration: 2000,
                position: 'center'
              });
            }
          });
        };

        $scope.unfollowUser = function() {
          followsService.unfollowUser($scope.profileUser.id, function(res) {
            if (res.status_code === '200') {
              $scope.reloadFollow();
              notify({
                message: 'Unfollowed ' + $scope.profileUser.username,
                duration: 2000,
                position: 'center'
              });
            } else {
              notify({
                message: 'Some errors happened. Please try again later',
                duration: 2000,
                position: 'center'
              });
            }
          });
        };

        getUserPosts();
        getUserFollowers();
        getUserFollowings();
        reloadFollowingsOfCurrentUser();
    });
