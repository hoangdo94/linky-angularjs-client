/*globals $:false */
'use strict';

/**
 * @ngdoc overview
 * @name linkyApp
 * @description
 * # linkyApp
 *
 * Main module of the application.
 */
angular
    .module('linkyApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'LocalStorageModule',
        'isteven-multi-select',
        'cgNotify'
    ])
    .config(function($routeProvider, localStorageServiceProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/profile/:userId', {
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'profile'
            })
            .when('/setting', {
                templateUrl: 'views/setting.html',
                controller: 'SettingCtrl',
                controllerAs: 'setting'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'register'
            })
            .when('/admin/:entity', {
                templateUrl: 'views/admin.html',
                controller: 'AdminCtrl',
                controllerAs: 'admin'
            })
            .when('/admin', {
                templateUrl: 'views/admin.html',
                controller: 'AdminCtrl',
                controllerAs: 'admin'
            })
            .otherwise({
                redirectTo: '/'
            });

        localStorageServiceProvider.setPrefix('linky');
    })
    .run(function(
        $rootScope,
        $location,
        authService,
        likesService,
        followsService,
        commentsService,
        metaService,
        postsService,
        notify
    ) {
        $rootScope.apiUrl = 'http://localhost:3000/api';
        $rootScope.viewMode = 'list';
        $rootScope.notInLoginScreen = false;
        $rootScope.authInited = false;
        // $rootScope.liked = false;
        // $rootScope.unliked = true;

        $rootScope.$on('$routeChangeStart', function() {
            $('#details-modal').modal('hide');
        });
        $rootScope.$on('$routeChangeSuccess', function(scope, current) {
            if (current.$$route) {
                $rootScope.notInLoginScreen = current.$$route.originalPath !== '/login' && current.$$route.originalPath !== '/register';
                if ($rootScope.notInLoginScreen && $rootScope.authInited && !authService.isLoggedIn()) {
                    $location.path('/login');
                }
                if (!$rootScope.notInLoginScreen && $rootScope.authInited && authService.isLoggedIn()) {
                    $location.path('/');
                }
            }
        });

        $rootScope.resolveImg = function(id, type) {
            if (id) {
                return $rootScope.apiUrl + '/files/' + id;
            } else {
                switch (type) {
                    case 'avatar':
                        return 'images/default/default_avatar.png';
                    case 'cover':
                        return 'images/default/default_cover.png';
                    default:
                        return 'images/default/default_thumbnail.png';
                }
            }
        };

        // details
        $rootScope.showDetails = function(post) {
            // Refresh comment storage
            $rootScope.comments = [];

            // Get comments of post
            commentsService.getComment(post.id, function(resComments) {
                $rootScope.current = post;
                $rootScope.comments = resComments;
            });

            // Reload post for refreshing new likes
            postsService.getPostById(post.id, function(newPost) {
                post.num_likes = newPost.num_likes;
            });
        };

        $rootScope.commentPost = function(postId, content) {
            commentsService.commentPost(postId, content, function(data) {
                if (data.status_code === '200') {
                    var newComment = {
                        'username': $rootScope.currentUser.username,
                        'avatar_id': $rootScope.currentUser.avatar_id,
                        'content': content,
                        'created_at': 'just now'
                    };
                    // Add to current Comments object, at first
                    $rootScope.comments.push(newComment);
                    // Refresh currentUserComment
                    $('#input_comment').val('');
                } else {
                    notify({
                        message: 'Something going wrong with your comment! Please try again!',
                        duration: 2000,
                        position: 'center'
                    });
                }
            });
        };

        function reloadLike(current) {
            if (!current.isFirstLike) {
                current.num_likes++;
                current.isFirstLike = true;
            }
        }

        // like post
        $rootScope.likePost = function(post) {
            likesService.likePost(post.id, function(res) {
                if (res.message === 'already liked this post') {
                    notify({
                        message: 'You already liked this this post!',
                        duration: 2000,
                        position: 'right'
                    });

                    post.isFirstLike = true;
                } else if (res.status_code && res.status_code === '200'){
                    notify({
                        message: 'You just liked this post!',
                        duration: 2000,
                        position: 'right'
                    });

                    reloadLike(post);
                }
            });
        };

        // Init auth
        $rootScope.checkAuth = function() {
          authService.init(function(isLoggedIn, user) {
              $rootScope.authInited = true;
              if (isLoggedIn) {
                  $rootScope.currentUser = user;

                  // Get Followings of Current User to check follow status of this user
                  followsService.getFollowings($rootScope.currentUser.id, function(followings) {
                      $rootScope.followingsOfCurrentUser = followings.data;
                  });

              } else {
                  $location.path('/login');
              }
          });
        };

        $rootScope.followedUser = function(followerId) {
            var result = false;
            $rootScope.followingsOfCurrentUser.forEach(function(row) {
                if (row.id === followerId) {
                    result = true;
                }
            });
            return result;
        };

        $rootScope.isLoggedIn = authService.isLoggedIn;
        $rootScope.logout = authService.logout;
        $rootScope.checkAuth();
    })
    .controller('linkyCtrl', function() {
        // Press Enter to send comment
        $('#input_comment').on('keypress', function(event) {
            if (event.which === 13 || event.keyCode === 13) {
                $('#button_comment').click();
                $('#input_comment').val('');
            }
        });
    });
