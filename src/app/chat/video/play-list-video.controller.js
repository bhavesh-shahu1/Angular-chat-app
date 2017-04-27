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

        function init() {
            vm.getPlayListName();
        }

        function getPlayListName() {
            videoService.getData('api', 'uservideoplaylist', vm.userInfo._id, '').
            then(function(response) {
                console.log(response.data);
                vm.playlist = response.data.data;
                if (angular.isDefined(vm.response) && vm.response != null) {
                    commonService.showToast(response.data.message);
                } 
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
                // Add success code
            })
        }
        

        vm.init();

    }
})();
