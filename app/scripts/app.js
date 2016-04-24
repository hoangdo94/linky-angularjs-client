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
        'isteven-multi-select',
        'LocalStorageModule',
        'angular-underscore'
    ])
    .config(function(localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('angular')
            .setStorageType('sessionStorage')
            .setNotify(true, true);
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/profile/:userId', {
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'profile'
            })
            .when('/setting/:userId', {
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
            .when('/admin', {
              templateUrl: 'views/admin.html',
              controller: 'AdminCtrl',
              controllerAs: 'admin'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .controller('linkyCtrl', ['$rootScope', '$scope', '$location', 'localStorageService',
        function($rootScope, $scope, $location, localStorageService) {
            $rootScope.viewMode = 'list';
            $scope.notInLoginScreen = false;

            // Set api Url
            localStorageService.set('apiUrl', 'http://localhost:1234/api');

            $rootScope.$on("$routeChangeStart", function(event) {
                $('#details-modal').modal('hide');
            });

            $rootScope.$on('$routeChangeSuccess', function(scope, current) {
                if (current.$$route) {
                    $scope.notInLoginScreen = current.$$route.originalPath !== '/login' && current.$$route.originalPath !== '/register';
                }
            });

            $rootScope.typeIconClass = function(type) {
                if (type === 'article') {
                    return 'fa fa-newspaper-o';
                }
                if (type === 'video') {
                    return 'fa fa-video-camera';
                }
                return 'fa fa-picture-o';
            };

            // details
            $rootScope.showDetails = function(feed) {
                $rootScope.current = feed;
            };

        }
    ]);