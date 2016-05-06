/*global $ */
'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:SettingCtrl
 * @description
 * # SettingCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
    .controller('SettingCtrl', function($rootScope, $scope, $routeParams, $location, usersService, filesService, notify) {
        var userId = parseInt($routeParams.userId);
        $scope.profileUser = {};

        if ($rootScope.currentUser.id !== userId) {
            $location.path('/setting/' + $rootScope.currentUser.id);
        } else {
            usersService.get(userId, function(user) {
                if (user.id !== userId) {
                    $location.path('/');
                }
                $scope.edit = user;
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
        }

        $scope.categories = [{
            name: 'Technology',
            ticked: true,
            disabled: true
        }, {
            name: 'Photography',
            ticked: true,
            disabled: true
        }, {
            name: 'Life',
            ticked: true,
            disabled: true
        }, {
            name: 'Economy',
            ticked: false,
            disabled: true
        }, {
            name: 'Joke',
            ticked: false,
            disabled: true
        }];

        $scope.preferedCategories = [{
            'name': 'Technology',
            ticked: true
        }, {
            'name': 'Photography',
            ticked: true
        }, {
            'name': 'Life',
            ticked: true
        }];

        $scope.updateUser = function() {
            $('input').each(function() {
                $(this).attr('readonly', false);
            });
            for (var i = $scope.categories.length - 1; i >= 0; i--) {
                $scope.categories[i].disabled = false;
            }
            $('#re-pass').toggle();
            $('.save').toggle();
            $('.edit').toggle();
            $('.multiSelect > button').css('pointer-events', 'all');
            $('.multiSelect > button').css('background-color', '#fff');
        };

        $scope.save = function() {
            $('input').each(function() {
                $(this).attr('readonly', true);
            });
            for (var i = $scope.categories.length - 1; i >= 0; i--) {
                $scope.categories[i].disabled = true;
            }
            $('.save').toggle();
            $('.edit').toggle();
            $('#re-pass').toggle();
            $('.multiSelect > button').css('pointer-events', 'none');
            $('.multiSelect > button').css('background-color', '#eeeeee');

            usersService.update($rootScope.currentUser.id, $scope.edit, function(res) {
                if (res.status_code === '200') {
                    notify({
                        message: 'Congratulation! You just updated information successfully!',
                        duration: '5000',
                        position: 'center'
                    });
                    $rootScope.currentUser = res.data;
                } else {
                    notify({
                        message: 'Please make sure your information is correct!',
                        duration: '5000',
                        position: 'center'
                    });
                }
            });

        };

        $scope.changeAvatar = function() {
            $('#avatar-input').click();
        };

        $scope.changeBackground = function() {
            $('#cover-input').click();
        };

        //handle avatar file change
        $scope.$watch('avatar', function(avatar) {
            if (avatar) {
                filesService.upload(avatar, function(_res) {
                    if (_res.data && _res.data.id) { //success
                        usersService.update($rootScope.currentUser.id, {
                            avatar_id: _res.data.id
                        }, function(res) {
                            if (res.status_code === '200') {
                                notify({
                                    message: 'Changed avatar!',
                                    duration: '5000',
                                    position: 'center'
                                });
                                $rootScope.currentUser = res.data;
                                $rootScope.currentUser.avatar_url = $rootScope.apiUrl + '/files/' + $rootScope.currentUser.avatar_id;
                            } else {
                                notify({
                                    message: 'Failed to change avatar. Please try again.',
                                    duration: '5000',
                                    position: 'center'
                                });
                            }
                        });
                    } else { // cannot upload
                        notify({
                            message: 'Failed to upload file. Please try again.',
                            duration: '5000',
                            position: 'center'
                        });
                    }
                });
            }
        });

        //handle cover file change
        $scope.$watch('cover', function(cover) {
            if (cover) {
                filesService.upload(cover, function(_res) {
                    if (_res === null) { // exceed image length
                        notify({
                            message: 'Your file is too large! Please upload <8MB file!',
                            duration: '5000',
                            position: 'center'
                        });
                    } else if (_res.data && _res.data.id) { //success
                        usersService.update($rootScope.currentUser.id, {
                            cover_id: _res.data.id
                        }, function(res) {
                            if (res.status_code === '200') {
                                notify({
                                    message: 'Changed cover!',
                                    duration: '5000',
                                    position: 'center'
                                });
                                $rootScope.currentUser = res.data;
                                $rootScope.currentUser.cover_url = $rootScope.apiUrl + '/files/' + $rootScope.currentUser.cover_id;
                            } else {
                                notify({
                                    message: 'Failed to change cover. Please try again.',
                                    duration: '5000',
                                    position: 'center'
                                });
                            }
                        });
                    } else { // cannot upload
                        notify({
                            message: 'Failed to upload file. Please try again.',
                            duration: '5000',
                            position: 'center'
                        });
                    }
                });
            }
        });
    });