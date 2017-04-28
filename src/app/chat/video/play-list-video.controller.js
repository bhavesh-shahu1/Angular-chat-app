(function() {
    'use strict';
    angular.module('app.chat.video').controller('PlayListVideoController', PlayListVideoController);
    /* @ngInject */
    function PlayListVideoController($mdDialog, videoService, commonService, $scope, $rootScope) {
        var vm = this;
        vm.data = {};
        vm.init = init;
        vm.userInfo = commonService.getUserInfo();
        vm.getPlayListName = getPlayListName;
        vm.createPlaylist = createPlaylist;
        vm.getVideoListByName = getVideoListByName;
        vm.activePlaylist = activePlaylist;

        function init() {
            vm.getPlayListName();
        }

        // Get user playlist 
        function getPlayListName() {
            videoService.getData('api', 'uservideoplaylist', vm.userInfo._id, '').
            then(function(response) {
                vm.playlist = response.data.data;
                if (angular.isDefined(vm.response) && vm.response != null) {
                    commonService.showToast(response.data.message);
                }
                angular.forEach(vm.playlist, function(value, key) {
                    if(value.isactive){
                        vm.getVideoListByName(value);
                    }
                });
            })
        }

        // Show waitlist
        function createPlaylist($event) {
            $mdDialog.show({
                controller: 'CreatePlaylistController',
                controllerAs: 'vm',
                templateUrl: 'app/chat/video/create-playlist.dialog.tmpl.html',
                targetEvent: $event
            }).then(function() {
                vm.getPlayListName();
                // Add success code
            })
        }

        // Get list of video by name
        function getVideoListByName(playlistInfo) {
            vm.activeListDetail = playlistInfo;
            videoService.getData('api', 'video', vm.activeListDetail._id, '').then(function(response) {
                vm.videoList = response.data;
            })
        }

        // Active user playlist
        function activePlaylist(){
            console.log(vm.userInfo._id);
            console.log(vm.activeListDetail._id);
            videoService.getCustomData('api','uservideoplaylist','active', vm.userInfo._id, vm.activeListDetail._id, '').then(function(response){
                console.log(response);
                if(angular.isDefined(response.data)){
                    commonService.showToast(response.data.message);    
                }
                
            });
        }

        vm.init();

    }
})();
