'use strict';

/**
 * @ngdoc function
 * @name linkyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the linkyApp
 */
angular.module('linkyApp')
    .controller('MainCtrl', function($rootScope, $scope) {
            // data
            $scope.categories = ['Technology', 'Photography', 'Life', 'Economy', 'Joke'];
            $scope.preferredCategories = $scope.categories.slice(0, 3);
            $scope.otherCategories = $scope.categories.slice(3, $scope.categories.length);

            $scope.feeds = [{
                id: 1,
                category: 'Life',
                user: 'rphillips0',
                url: 'http://friendfeed.com',
                type: 'article',
                description: 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.'
            }, {
                id: 2,
                category: 'Life',
                user: 'echapman1',
                url: 'https://shinystat.com',
                type: 'image',
                description: 'uis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.'
            }, {
                id: 3,
                category: 'Photography',
                user: 'nbailey2',
                url: 'http://forbes.com',
                type: 'video',
                description: 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.'
            }, {
                id: 4,
                category: 'Economy',
                user: 'jbanks3',
                url: 'http://a8.net',
                type: 'image',
                description: 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.'
            }, {
                id: 5,
                category: 'Economy',
                user: 'ehanson4',
                url: 'http://clickbank.net',
                type: 'image',
                description: 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.'
            }, {
                id: 6,
                category: 'Life',
                user: 'cbrooks5',
                url: 'http://geocities.com',
                type: 'video',
                description: 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.'
            }, {
                id: 7,
                category: 'Economy',
                user: 'clynch6',
                url: 'http://baidu.com',
                type: 'image',
                description: 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.'
            }, {
                id: 8,
                category: 'Life',
                user: 'hreyes7',
                url: 'https://etsy.com',
                type: 'article',
                description: 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.'
            }, {
                id: 9,
                category: 'Photography',
                user: 'csanchez8',
                url: 'https://deviantart.com',
                type: 'image',
                description: 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.'
            }, {
                id: 10,
                category: 'Economy',
                user: 'fmorales9',
                url: 'http://npr.org',
                type: 'video',
                description: 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.'
            }, {
                id: 11,
                category: 'Life',
                user: 'jstonea',
                url: 'http://github.io',
                type: 'image',
                description: 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.'
            }, {
                id: 12,
                category: 'Photography',
                user: 'cruizb',
                url: 'http://businessinsider.com',
                type: 'article',
                description: 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.'
            }, {
                id: 13,
                category: 'Life',
                user: 'btuckerc',
                url: 'https://unblog.fr',
                type: 'image',
                description: 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.'
            }, {
                id: 14,
                category: 'Photography',
                user: 'jryand',
                url: 'https://ihg.com',
                type: 'article',
                description: 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.'
            }, {
                id: 15,
                category: 'Life',
                user: 'dwheelere',
                url: 'http://google.cn',
                type: 'article',
                description: 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.'
            }, {
                id: 16,
                category: 'Technology',
                user: 'jyoungf',
                url: 'http://mozilla.com',
                type: 'video',
                description: 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.'
            }, {
                id: 17,
                category: 'Life',
                user: 'rwilliamsong',
                url: 'http://ibm.com',
                type: 'article',
                description: 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.'
            }, {
                id: 18,
                category: 'Life',
                user: 'dmillerh',
                url: 'http://unicef.org',
                type: 'article',
                description: 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.'
            }, {
                id: 19,
                category: 'Economy',
                user: 'carmstrongi',
                url: 'https://pcworld.com',
                type: 'article',
                description: 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.'
            }, {
                id: 20,
                category: 'Life',
                user: 'jwashingtonj',
                url: 'https://ebay.com',
                type: 'article',
                description: 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.'
            }];
            $scope.current = {};
            $scope.link = '';
            $scope.isFormShown = false;
            $scope.moreCategoriesText = 'More...';

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
            $scope.shown = $scope.feeds;

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