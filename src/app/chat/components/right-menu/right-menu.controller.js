(function() {
    'use strict';
    angular.module('app.chat.component').controller('RightMenuController', RightMenuController)
        .directive('schrollBottom', function() {
            return {
                scope: {
                    schrollBottom: "="
                },
                link: function(scope, element) {
                    scope.$watchCollection('schrollBottom', function(newValue) {
                        if (newValue) {
                            $(element).scrollTop($(element)[0].scrollHeight);
                        }
                    });
                }
            }
        });

    /* @ngInject */
    function RightMenuController(videoService, $scope, commonService, $rootScope, socketService, $window, $timeout, homeService, $state) {
        var vm = this;
        vm.init = init;
        vm.getWaitList = getWaitList;
        vm.userInfo = commonService.getUserInfo();
        vm.userId = vm.userInfo._id;
        vm.username = vm.userInfo.username;
        vm.status = vm.userInfo.status;
        vm.removeFromWaitList = removeFromWaitList;
        vm.postChat = postChat;
        vm.getUserChat = getUserChat;
        vm.data = {};
        vm.userChat = {};
        vm.userChat.data = [];
        vm.scrollDown = scrollDown;
        vm.onTabChanges = onTabChanges;
        vm.getRandomColor = getRandomColor;
        vm.getUserProfile = getUserProfile;
        vm.getBannedUser = getBannedUser;
        vm.getMutedUser = getMutedUser;
        vm.logout = logout;
        vm.updateUserProfile = updateUserProfile;
        vm.getUser = getUser;
        vm.getConfiguration=getConfiguration;
        vm.ChatStyle = {
            'max-height': $window.innerHeight - 181 + "px",
            'min-height': $window.innerHeight - 181 + "px",
            'overflow-y': 'scroll'
        };
        vm.userProfileStyle = {
            'max-height': $window.innerHeight - 125 + "px",
            'min-height': $window.innerHeight - 125 + "px",
            'overflow-y': 'scroll'
        };
        vm.color = ['#F44336', '#FFEB3B', '#E91E63', '#9C27B0', '#FFC107', '#673AB7', '#FF9800', '#3F51B5', '#2196F3', '#FF5722', '#03A9F4', '#795548', '#00BCD4', '#009688', '#607D8B', '#4CAF50', '#8BC34A', '#CDDC39'];

        vm.selectedTab = 'staff';

        function scrollDown($element) {
            // $timeout(function() { $("#messageDiv").scrollTop($("#messageDiv")[0].scrollHeight); }, 10);
        }
        var w = angular.element($window);
        w.bind('resize', function() {
            vm.ChatStyle = {
                'max-height': $window.innerHeight - 181 + "px",
                'min-height': $window.innerHeight - 181 + "px",
                'overflow-y': 'scroll'
            };
            vm.userProfileStyle = {
                'max-height': $window.innerHeight - 125 + "px",
                'min-height': $window.innerHeight - 125 + "px",
                'overflow-y': 'scroll'
            };
        });

        function init() {
            vm.getWaitList();
            vm.getUserChat();
        }

        // Send to server
        function postChat(argument) {
            var msg = {
                user_id: vm.userId,
                username: vm.username,
                msg: vm.data.message
            };
            socketService.emit('send_msg', msg);
            vm.data.message = null;
        }

        // Get to server
        socketService.on('broadcast', function(data) {
            // console.log(data);
            $scope.$apply(function() {
                vm.userChat.data.push(data);
            });
            // console.log(vm.userChat);
        });

        // Get user chat history
        function getUserChat() {
            videoService.getData('api', 'groupchat', '1', '').then(function(response) {
                vm.userChat = response.data;
                vm.scrollDown();
            })
        }
        vm.deleteChatMessage = deleteChatMessage;

        function deleteChatMessage(id) {
            videoService.getData('api', 'groupchat', 'delete', id).then(function(response) {
                // commonService.showToast(response.data.message);
                vm.getUserChat();
                // console.log(response);
            })
        }

        // Get video wait List
        function getWaitList() {
            videoService.getData('api', 'waitlist').then(function(response) {
                vm.waitList = response.data;
                vm.waitlistCount = response.data.data.length;
            })
        }

        function removeFromWaitList(waitlist_id, video_id) {
            vm.postParameter = {
                'user_id': vm.userId,
                'video_id': video_id,
                'waitlist_id': waitlist_id
            }
            videoService.postData('video_remove_from_waitlist', vm.postParameter).then(function(response) {
                commonService.showToast(response.data.message);
                // When wait list video remove from wait list update button on waitlist video page.
                $rootScope.$broadcast('updateWaitListButton', 'updateWaitListButtonStatus');
                vm.getWaitList();
            })
        }

        function onTabChanges(tab) {
            vm.selectedTab = tab;
        }

        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        function getUserProfile() {
            vm.activated = true;
            homeService.getData('api', 'user', vm.userInfo._id, '').then(function(response) {
                vm.activated = false;
                if (angular.isDefined(response.data)) {
                    vm.userData = response.data;
                    vm.userData.profilePic = 'https://video-playlist.herokuapp.com/images/user_avtar/' + vm.userData.avtar;
                    if (angular.isDefined(response.data.username)) {
                        vm.username = response.data.username;
                        vm.userData.password = null;
                    }

                }
            });
        };

        function updateUserProfile() {
            vm.activated = true;
            var postParam = vm.userData;
            homeService.postCustomData('api', 'user', vm.userInfo._id, '', null, null, postParam).then(function(response) {
                vm.activated = false;
            });
        }

        function logout() {
            commonService.logout();
            $state.go('authentication.login');
        }

        function getUser() {
            homeService.getData('api', 'user').
            then(function(response) {
                vm.userList = response.data;
            })
        }

        function getBannedUser() {
            homeService.getData('api', 'user', 'status', '0').
            then(function(response) {
                vm.userBannedList = response.data;
            })
        }

        function getMutedUser() {
            homeService.getData('api', 'user', 'status', '0').
            then(function(response) {
                vm.userMutedList = response.data;
            })
        }

        function getConfiguration() {
            homeService.getData('api', 'configuration').
            then(function(response) {
                vm.configuration = response.data[0];
            })
        }


        // Whenever video add in waitList update waitlist
        $scope.$on('updateWaitList', function($event, message) {
            vm.getWaitList();
        });

        // Whenever next video load in waitList update waitlist
        $scope.$on('nextVideoInfo', function($event, nextVideoInfo) {
            vm.getWaitList();
        });

        vm.init();
    }
})();