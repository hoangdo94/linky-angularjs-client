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
  .controller('SettingCtrl', function ($rootScope, $scope, $routeParams, $location, usersService, notify) {
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
      });
    }
  	$scope.categories = [
    	{name: 'Technology', ticked: true, disabled: true},
    	{name: 'Photography', ticked: true, disabled: true},
    	{name: 'Life', ticked: true, disabled: true},
    	{name: 'Economy', ticked: false, disabled: true},
    	{name: 'Joke', ticked: false, disabled: true}
    ];
    $scope.preferedCategories = [
    	{'name': 'Technology', ticked: true},
    	{'name': 'Photography', ticked: true},
    	{'name': 'Life', ticked: true}
    ];
    $scope.updateUser = function(){
		$('input').each(function(){
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
	$scope.save = function(){
		$('input').each(function(){
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
			} else {
				notify({
                    message: 'Please make sure your information is correct!',
                    duration: '5000',
                    position: 'center'
                });
			}
			
		});

	};
	$scope.changeAvatar = function(){
		$('#fileinput').click();
	};
	$scope.changeBackground = function(){
		$('#fileinput').click();
	};
  });
