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
        vm.setCurrnetVedioInfo = setCurrnetVedioInfo;
        vm.playerVars = {
            controls: 0,
            autoplay: 1,
            showinfo: 0,
            rel: 0,
            start: 0
        };
        vm.upvote = upvote;
        vm.downvote = downvote;

        function init() {
            vm.getWaitListStatus();
            vm.getCurrentVideo();
        }

        vm.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';

        function getCurrentVideo() {
            vm.activated = true;
            videoService.getData('api', 'waitlist', 'current', '').
            then(function(response) {
                vm.activated = false;
                if (angular.isDefined(response.data.data) && response.data.data != null) {
                    vm.playerVars.start = Math.round(response.data.start_time);
                    vm.response = response.data.data;
                    if (angular.isDefined(vm.response.videoplaylists_id)) {
                        vm.setVedioInfo(vm.response.videoplaylists_id);
                        vm.setCurrnetVedioInfo(response.data);
                    }
                    vm.upvoteCount = vm.response.videoplaylists_id.upvote.split(',');
                    vm.downvoteCount = vm.response.videoplaylists_id.downvote.split(',');
                     // Set vote button color
                        if(vm.response.videoplaylists_id.upvote.includes(vm.userInfo._id)){
                            vm.upvoteColor['color'] = 'rgb(63,81,181)';
                        }else{
                            vm.upvoteColor['color'] = 'rgba(0,0,0,0.54)';
                        }
                        if(vm.response.videoplaylists_id.downvote.includes(vm.userInfo._id)){
                            vm.downvoteColor['color'] = 'rgb(63,81,181)';
                        }else{
                            vm.downvoteColor['color'] = 'rgba(0,0,0,0.54)';
                        }
                    commonService.showToast(response.data.message);
                } else {
                    vm.addWaitlistMessage = 'Please add video in waitlist';
                }

            })
        }

        function getWaitListStatus() {
            vm.activated = true;
            videoService.getData('api', 'get_waitlist_status', vm.userInfo._id, '')
                .then(function(response) {
                    vm.activated = false;
                    vm.waitlistStatus = response.data.data.already_in_waitlist;
                })
        }

        function getNextVideo() {
            vm.activated = true;
            videoService.getData('api', 'waitlist', 'next', vm.response._id).
            then(function(response) {
                vm.activated = false;
                vm.response = response.data.data;
                if (angular.isDefined(vm.response.videoplaylists_id)) {
                    vm.setVedioInfo(vm.response.videoplaylists_id);
                    vm.setCurrnetVedioInfo(response.data);
                    // Update video info on toolbar
                    $rootScope.$broadcast('nextVideoInfo', vm.response.videoplaylists_id);
                }

                commonService.showToast(response.data.message);
            })
        }

        function setVedioInfo(videoInfo) {
            vm.videoInformation = angular.toJson(videoInfo);
            // localStorage.setItem('videoInfo', vm.videoInformation);
            $rootScope.$broadcast('playUserSelectedVideo', vm.videoInformation);
        }

        function setCurrnetVedioInfo(videoInfo) {
            vm.videoCurrentInformation = angular.toJson(videoInfo);
            $rootScope.$broadcast('playCurrentUserSelectedVideo', vm.videoCurrentInformation);
        }

        function addToWaitList() {
            vm.activated = true;
            vm.postParameter = {
                'user_id': vm.userInfo._id
            }
            videoService.postData('waitlist', vm.postParameter).then(function(response) {
                vm.activated = false;
                vm.getWaitListStatus();
                vm.getCurrentVideo();
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
                    vm.activated = true;
                    videoService.getData('api', 'removevideofromplaylistbyuserid', vm.userInfo._id, '')
                        .then(function(response) {
                            vm.activated = false;
                            vm.getWaitListStatus();
                            vm.getNextVideo();
                            $rootScope.$broadcast('updateWaitList', 'updateWaitList');
                            commonService.showToast(response.data.message);
                        })
                });
        }

        vm.upvoteColor = {};
        vm.downvoteColor = {};
        function upvote(id) {
            videoService.getData('api', 'upvote', id.toString(), vm.userInfo._id)
                .then(function(response) {
                    if (angular.isDefined(response.data.data)) {
                        vm.upvoteCount = response.data.data.upvote.split(',');
                        vm.downvoteCount = response.data.data.downvote.split(',');
                        if(response.data.data.upvote.includes(vm.userInfo._id)){
                            vm.upvoteColor['color'] = 'rgb(63,81,181)';
                        }else{
                            vm.upvoteColor['color'] = 'rgba(0,0,0,0.54)';
                        }
                        if(response.data.data.downvote.includes(vm.userInfo._id)){
                            vm.downvoteColor['color'] = 'rgb(63,81,181)';
                        }else{
                            vm.downvoteColor['color'] = 'rgba(0,0,0,0.54)';
                        }
                    }

                })
        }

        function downvote(id) {
            videoService.getData('api', 'downvote', id.toString(), vm.userInfo._id)
                .then(function(response) {
                    if (angular.isDefined(response.data.data)) {
                        vm.upvoteCount = response.data.data.upvote.split(',');
                        vm.downvoteCount = response.data.data.downvote.split(',');
                        // Set vote button color
                        if(response.data.data.upvote.includes(vm.userInfo._id)){
                            vm.upvoteColor['color'] = 'rgb(63,81,181)';
                        }else{
                            vm.upvoteColor['color'] = 'rgba(0,0,0,0.54)';
                        }
                        if(response.data.data.downvote.includes(vm.userInfo._id)){
                            vm.downvoteColor['color'] = 'rgb(63,81,181)';
                        }else{
                            vm.downvoteColor['color'] = 'rgba(0,0,0,0.54)';
                        }
                    }
                })
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