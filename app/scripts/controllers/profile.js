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
        $scope.followers = [];
        $scope.followings = [];
        $scope.isFollowing = false;

        // pagination
        $scope.currentPostPage = 1;
        $scope.canLoadMorePosts = false;
        $scope.postCount = 0;

        $scope.currentFollowerPage = 1;
        $scope.canLoadMoreFollowers = false;
        $scope.followerCount = 0;

        $scope.currentFollowingPage = 1;
        $scope.canLoadMoreFollowings = false;
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
            followsService.getFollowers(userId, $scope.currentFollowerPage, 5, function(res) {
                $scope.followerCount = res.total;
                if (res.next_page_url) {
                    $scope.canLoadMoreFollowers = true;
                } else {
                    $scope.canLoadMoreFollowers = false;
                }
                res.data.forEach(function(f) {
                    $scope.followers.push(f);
                });
            });
        }

        function getUserFollowings() {
            followsService.getFollowings(userId, $scope.currentFollowingPage, 5, function(res) {
                $scope.followingCount = res.total;
                if (res.next_page_url) {
                    $scope.canLoadMoreFollowings = true;
                } else {
                    $scope.canLoadMoreFollowings = false;
                }
                res.data.forEach(function(f) {
                    $scope.followings.push(f);
                });
            });
        }

        function reloadFollowers() {
          $scope.followers = [];
          followsService.getFollowers(userId, 1, $scope.currentFollowerPage*5, function(res) {
              $scope.followerCount = res.total;
              if (res.next_page_url) {
                  $scope.canLoadMoreFollowers = true;
              } else {
                  $scope.canLoadMoreFollowers = false;
              }
              res.data.forEach(function(f) {
                  $scope.followers.push(f);
              });
          });
        }

        function checkFollow() {
          if (userId === $rootScope.currentUser.id) {
            return;
          }
          followsService.isFollowing(userId, function(res) {
            $scope.isFollowing = res.following;
          });
        }

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
        $scope.loadMoreFollowers = function() {
            $scope.currentFollowerPage++;
            getUserFollowers();
        };
        $scope.loadMoreFollowings = function() {
            $scope.currentFollowingPage++;
            getUserFollowings();
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
              $scope.isFollowing = true;
              reloadFollowers();
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
              $scope.isFollowing = false;
              reloadFollowers();
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

        checkFollow();
        getUserPosts();
        getUserFollowers();
        getUserFollowings();
    });
