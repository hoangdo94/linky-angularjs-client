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
    .controller('SettingCtrl', function($rootScope, $scope, usersService, filesService, prefercategoriesService, categoriesService, authService, notify) {

        usersService.get($rootScope.currentUser.id, function(user) {
            $scope.edit = user;
            $scope.profileUser = user;
        });

        prefercategoriesService.getUserPreferCategories(function(res) {
            $scope.preferedCategories = res;
            if (Array.isArray(res)) {
                res.forEach(function(cate) {
                    $scope.preferedCategories.push({
                        name: cate.name,
                        ticked: true
                    });
                });
            } else if (res) {
                $scope.preferedCategories.push({
                    name: res.name,
                    ticked: true
                });
            }
        });

        function checkPreferCategory(cateName) {
            var result = false;
            if (Array.isArray($scope.preferedCategories)) {
                $scope.preferedCategories.forEach(function(row) {
                    if (row.name === cateName) {
                        result = true;
                    }
                });
            } else if ($scope.preferedCategories && $scope.preferedCategories.name === cateName) {
                result = true;
            }

            return result;
        }

        categoriesService.getAll(function(res) {
            $scope.categories = [];
            res.forEach(function(cate) {
                $scope.categories.push({
                    name: cate.name,
                    ticked: checkPreferCategory(cate.name),
                    disabled: true
                });
            });
        });


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
                    if ($scope.edit.password) {
                        authService.updateLocalPassword($scope.edit.password);
                        delete $scope.edit.password;
                    }
                    if ($scope.edit.preferedCategories) {
                        // Update preferedCategories
                        prefercategoriesService.updateUserPreferCategories($scope.edit.preferedCategories, function() {
                            notify({
                                message: 'Updated information!',
                                duration: 2000,
                                position: 'center'
                            });
                        });
                    } else {
                        notify({
                            message: 'Updated information!',
                            duration: 2000,
                            position: 'center'
                        });
                    }
                    $rootScope.currentUser = res.data;
                } else {
                    notify({
                        message: 'Some errors happened. Please try again!',
                        duration: 2000,
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
                                    duration: 2000,
                                    position: 'center'
                                });
                                $rootScope.currentUser = res.data;
                                $scope.profileUser = $rootScope.currentUser;
                            } else {
                                notify({
                                    message: 'Failed to change avatar. Please try again.',
                                    duration: 2000,
                                    position: 'center'
                                });
                            }
                        });
                    } else { // cannot upload
                        notify({
                            message: 'Failed to upload file. Please try again.',
                            duration: 2000,
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
                            duration: 2000,
                            position: 'center'
                        });
                    } else if (_res.data && _res.data.id) { //success
                        usersService.update($rootScope.currentUser.id, {
                            cover_id: _res.data.id
                        }, function(res) {
                            if (res.status_code === '200') {
                                notify({
                                    message: 'Changed cover!',
                                    duration: 2000,
                                    position: 'center'
                                });
                                $rootScope.currentUser = res.data;
                                $scope.profileUser = $rootScope.currentUser;
                            } else {
                                notify({
                                    message: 'Failed to change cover. Please try again.',
                                    duration: 2000,
                                    position: 'center'
                                });
                            }
                        });
                    } else { // cannot upload
                        notify({
                            message: 'Failed to upload file. Please try again.',
                            duration: 2000,
                            position: 'center'
                        });
                    }
                });
            }
        });
    });
