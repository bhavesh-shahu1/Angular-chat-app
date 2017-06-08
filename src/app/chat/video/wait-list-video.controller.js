(function() {
    'use strict';
    angular.module('app.chat.video').controller('WaitListVideoController', WaitListVideoController);
    /* @ngInject */
    function WaitListVideoController($mdDialog, videoService, commonService, $scope, $rootScope) {
        var vm = this;
        vm.data = {};
        vm.init = init;
        vm.userInfo = commonService.getUserInfo();
        vm.getCurrentVideo = getCurrentVideo;
        vm.getNextVideo = getNextVideo;
        vm.setVedioInfo = setVedioInfo;
        vm.addToWaitList = addToWaitList;
        vm.getWaitListStatus = getWaitListStatus;
        vm.removeFromWaitList = removeFromWaitList;
        vm.playerVars = {
            // controls: 0,
            autoplay: 1,
            // showinfo: 0,
            // rel: 0
            start: 0
        };

        function init() {
            vm.getWaitListStatus();
            vm.getCurrentVideo();
        }

        vm.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';

        function getCurrentVideo() {
            videoService.getData('api', 'waitlist', 'current', '').
            then(function(response) {

                if (angular.isDefined(response.data.data) && response.data.data != null) {
                    vm.playerVars.start = response.data.start_time;
                    console.log(vm.playerVars);
                    vm.response = response.data.data;
                    if (angular.isDefined(vm.response.videoplaylists_id)) {
                        vm.setVedioInfo(vm.response.videoplaylists_id);
                    }

                    commonService.showToast(response.data.message);
                } else {
                    vm.addWaitlistMessage = 'Please add video in waitlist';
                }

            })
        }

        function getWaitListStatus() {
            videoService.getData('api', 'get_waitlist_status', vm.userInfo._id, '')
                .then(function(response) {
                    vm.waitlistStatus = response.data.data.already_in_waitlist;
                })
        }

        function getNextVideo() {
            videoService.getData('api', 'waitlist', 'next', vm.response._id).
            then(function(response) {
                vm.response = response.data.data;
                if (angular.isDefined(vm.response.videoplaylists_id)) {
                    vm.setVedioInfo(vm.response.videoplaylists_id);
                    // Update video info on toolbar
                    $rootScope.$broadcast('nextVideoInfo', vm.response.videoplaylists_id);
                }

                commonService.showToast(response.data.message);
            })
        }

        function setVedioInfo(videoInfo) {
            vm.videoInformation = angular.toJson(videoInfo);
            localStorage.setItem('videoInfo', vm.videoInformation);
            $rootScope.$broadcast('playUserSelectedVideo', vm.videoInformation);
        }

        function addToWaitList() {
            vm.postParameter = {
                'user_id': vm.userInfo._id
            }
            videoService.postData('waitlist', vm.postParameter).then(function(response) {
                vm.getWaitListStatus();
                //Update Waitlist in rigth sidebar
                $rootScope.$broadcast('updateWaitList', 'updateWaitList');
                commonService.showToast(response.message);
            })
        }

        function removeFromWaitList($event) {
            $mdDialog.show(
                    $mdDialog.confirm()
                    .title('Delete Waitlist')
                    .content('Are you sure you want to remove from waitlist.')
                    .ok('ok')
                    .cancel('cancel')
                    .targetEvent($event)
                )
                .then(function() {
                    videoService.getData('api', 'removevideofromplaylistbyuserid', vm.userInfo._id, '')
                        .then(function(response) {
                            vm.getWaitListStatus();
                            $rootScope.$broadcast('updateWaitList', 'updateWaitList');
                            commonService.showToast(response.data.message);
                        })
                });
        }

        $scope.$on('youtube.player.ended', function($event, player) {
            vm.getNextVideo();
            // play it again
            // player.playVideo();
        });

        // Whenever video remove from waitList update button status
        $scope.$on('updateWaitListButton', function($event, message) {
            vm.getWaitListStatus();
        });

        vm.init();

    }
})();
