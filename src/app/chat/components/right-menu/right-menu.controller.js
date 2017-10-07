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
    function RightMenuController(videoService, $scope, commonService, $rootScope, Upload, socketService, $window, $timeout, homeService, $state) {
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
        vm.getConfiguration = getConfiguration;
        vm.updateConfiguration = updateConfiguration;
        vm.uploadPic = uploadPic;
        vm.upvote = upvote;
        vm.downvote = downvote;
        vm.getCurrentVideo = getCurrentVideo;

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
            vm.getCurrentVideo();
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


        // Get to server
        socketService.on('voting_waitlist', function(data) {
            console.log(data);
            $scope.$apply(function() {
                vm.getWaitList();
                vm.voting = {};
                vm.voting.upvote = data.upvote != '' ? data.upvote.split(',').length - 1 : 0;
                vm.voting.downvote = data.downvote != '' ? data.downvote.split(',').length - 1 : 0;
            });
            console.log(vm.voting);
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

        function getCurrentVideo() {
            vm.activated = true;
            videoService.getData('api', 'waitlist', 'current', '').
            then(function(response) {
                vm.activated = false;
                vm.currentVideoInformation = response.data.data;
                vm.Id = vm.currentVideoInformation.videoplaylists_id._id;
                if (angular.isDefined(response.data.data) && response.data.data != null) {
                    vm.upvoteCount = vm.response.videoplaylists_id.upvote.split(',');
                    vm.downvoteCount = vm.response.videoplaylists_id.downvote.split(',');
                    vm.voting.upvote = response.data.data.upvote != '' ? response.data.data.upvote.split(',').length - 1 : 0;
                    vm.voting.downvote = response.data.data.downvote != '' ? response.data.data.downvote.split(',').length - 1 : 0;
                    // Set vote button color
                    if (vm.response.videoplaylists_id.upvote.includes(vm.userInfo._id)) {
                        vm.upvoteColor['color'] = 'rgb(63,81,181)';
                    } else {
                        vm.upvoteColor['color'] = 'rgba(0,0,0,0.54)';
                    }
                    if (vm.response.videoplaylists_id.downvote.includes(vm.userInfo._id)) {
                        vm.downvoteColor['color'] = 'rgb(63,81,181)';
                    } else {
                        vm.downvoteColor['color'] = 'rgba(0,0,0,0.54)';
                    }
                    // commonService.showToast(response.data.message);
                } else {
                    vm.addWaitlistMessage = 'Please add video in waitlist';
                }
            })
        }


        // Add event to get select vedio Info
        $scope.$on('playUserSelectedVideo', function($event, videoInfo) {
            vm.currentVideoInformation = JSON.parse(videoInfo);
            vm.Id = vm.currentVideoInformation.videoplaylists_id._id;
            // vm.videoInformation = videoInfo;
            console.log(currentVideoInformation);
            vm.init();
        });

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
            if (vm.userData.old_password && vm.userData.password && vm.userData.confirm) {
                if (vm.userData.password == vm.userData.confirm) {
                    var postParam = vm.userData;
                    homeService.postCustomData('api', 'user', vm.userInfo._id, '', null, null, postParam).then(function(response) {
                        vm.activated = false;
                        commonService.showToast(response.message);
                    });

                } else {
                    commonService.showToast("Password Does not match!");
                }
            } else {
                commonService.showToast("Some Parameter are missing")
            }
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
                console.log(vm.configuration);
            })
        }

        function updateConfiguration() {
            var postParam = vm.configuration;
            homeService.postCustomData('api', 'configuration', null, null, null, null, postParam).then(function(response) {
                vm.activated = false;
                vm.getConfiguration();
            });
        }

        function uploadPic(file) {
            vm.activated = true;
            console.log('hi');
            if (file) {
                Upload.upload({
                    url: 'https://video-playlist.herokuapp.com/api/user_profile_image/' + vm.userInfo._id,
                    // headers : {'mimeType': 'multipart/form-data','crossDomain':true,'contentType':false},
                    data: { avtar: file },
                }).then(function(response) {
                    vm.activated = false;
                    if (angular.isDefined(response.data.filename)) {
                        vm.userData.profilePic = 'https://video-playlist.herokuapp.com/images/user_avtar/' + response.data.filename;
                    }
                });
            }
            // } else {
            //     commonService.showToast(errFiles[0].name + ' File too large: ' + 'max size 2MB', 'bottom right');
            // }
        };

        function upvote() {
            // console.log(id);
            if(angular.isDefined(vm.Id)){
            videoService.getData('api', 'upvote', vm.Id.toString(), vm.userInfo._id).then(function(response) {
                if (angular.isDefined(response.data.data)) {
                    vm.upvoteCount = response.data.data.upvote.split(',');
                    vm.downvoteCount = response.data.data.downvote.split(',');
                    vm.voting.upvote = response.data.data.upvote != '' ? response.data.data.upvote.split(',').length - 1 : 0;
                    vm.voting.downvote = response.data.data.downvote != '' ? response.data.data.downvote.split(',').length - 1 : 0;
                    if (response.data.data.upvote.includes(vm.userInfo._id)) {
                        vm.upvoteColor['color'] = 'rgb(63,81,181)';
                    } else {
                        vm.upvoteColor['color'] = 'rgba(0,0,0,0.54)';
                    }
                    if (response.data.data.downvote.includes(vm.userInfo._id)) {
                        vm.downvoteColor['color'] = 'rgb(63,81,181)';
                    } else {
                        vm.downvoteColor['color'] = 'rgba(0,0,0,0.54)';
                    }
                }
            });
            }else{
                commonService.showToast('There is no video avaliable.');
            }
        }

        function downvote() {
            if(angular.isDefined(vm.Id)){
            videoService.getData('api', 'downvote', vm.Id.toString(), vm.userInfo._id).then(function(response) {
                if (angular.isDefined(response.data.data)) {
                    vm.upvoteCount = response.data.data.upvote.split(',');
                    vm.downvoteCount = response.data.data.downvote.split(',');
                    // Set vote button color
                    if (response.data.data.upvote.includes(vm.userInfo._id)) {
                        vm.upvoteColor['color'] = 'rgb(63,81,181)';
                    } else {
                        vm.upvoteColor['color'] = 'rgba(0,0,0,0.54)';
                    }
                    if (response.data.data.downvote.includes(vm.userInfo._id)) {
                        vm.downvoteColor['color'] = 'rgb(63,81,181)';
                    } else {
                        vm.downvoteColor['color'] = 'rgba(0,0,0,0.54)';
                    }
                }
            });
            }else{
                commonService.showToast('There is no video avaliable.');
            }
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