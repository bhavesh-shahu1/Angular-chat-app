(function() {
    'use strict';
    angular.module('app.chat.video').controller('WaitListVideoController', WaitListVideoController);
    /* @ngInject */
    function WaitListVideoController($mdDialog, videoService, commonService, $scope, $rootScope) {
        var vm = this;
        vm.data = {};
        vm.init = init;
        vm.getCurrentVideo = getCurrentVideo;
        vm.getNextVideo = getNextVideo;
        vm.setVedioInfo = setVedioInfo;

        function init() {
            vm.getCurrentVideo();
        }

        vm.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';

        function getCurrentVideo() {
            videoService.getData('api', 'waitlist', 'current', '').
            then(function(response) {
                vm.response = response.data.data;
                vm.setVedioInfo(vm.response.videoplaylists_id);
                commonService.showToast(response.data.message);
            })
        }

        function getNextVideo() {
            videoService.getData('api', 'waitlist', 'next', vm.response._id).
            then(function(response) {
                vm.response = response.data.data;
                vm.setVedioInfo(vm.response.videoplaylists_id);
                // Update video info on toolbar
                $rootScope.$broadcast('nextVideoInfo', vm.response.videoplaylists_id);
                commonService.showToast(response.data.message);
            })
        }

        function setVedioInfo(videoInfo){
            vm.videoInformation = angular.toJson(videoInfo);
            localStorage.setItem('videoInfo', vm.videoInformation);
            $rootScope.$broadcast('playUserSelectedVideo', vm.videoInformation);
        }

        $scope.$on('youtube.player.ended', function($event, player) {
            vm.getNextVideo();
            console.log('video over');
            // play it again
            // player.playVideo();
        });

        vm.init();

    }
})();
