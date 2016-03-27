'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:SettingCtrl
 * @description
 * # SettingCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
  .controller('SettingCtrl', function ($scope) {
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
    $scope.edit = function(){
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
		
	};
	$scope.change_avatar = function(){
		$('#fileinput').click();
	};
	$scope.change_background = function(){
		$('#fileinput').click();
	};
  });
