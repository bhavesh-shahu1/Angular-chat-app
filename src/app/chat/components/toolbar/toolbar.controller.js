(function() {
    'use strict';
    angular.module('app.chat.component').controller('ToolbarController', ToolbarController);
    /* @ngInject */
    function ToolbarController($mdSidenav, $scope, videoService, commonService, $mdDialog, $state, $rootScope) {
        var vm = this;
        vm.init = init;
        vm.openLeftMenu = openLeftMenu;
        vm.getUserPlayList = getUserPlayList;
        vm.userInfo = commonService.getUserInfo();
        vm.uploadVideo = uploadVideo;
        vm.getWaitListVideo = getWaitListVideo;
        vm.playUserVideo = playUserVideo;
        vm.addToWaitList = addToWaitList;
        vm.openRightMenu = openRightMenu;

        function init() {

        }

        function openLeftMenu() {
            $mdSidenav('left').toggle();
        }

        function openRightMenu(){
            $mdSidenav('right').toggle();
        }

        // Get user playlist
        function getUserPlayList() {
            videoService.getData('api', 'userplaylist', vm.userInfo._id, '').
            then(function(response) {
                vm.playList = response.data;
                commonService.showToast(response.message);
            })
        }

        // Play User video select from left navigation bar
        function playUserVideo(videoInfo){
            console.log(videoInfo.title);
            vm.videoInformation = angular.toJson(videoInfo);
        	localStorage.setItem('videoInfo', vm.videoInformation);
            $mdSidenav('left').close();
            $rootScope.$broadcast('playUserSelectedVideo', vm.videoInformation);
        	$state.go('default-layout.admin-layout.video');
        }

        // Add event show data in left navigation bar
        $scope.$on('VideoListTab', function($event, message) {
            vm.getUserPlayList();
        });

        // Upload video
        function uploadVideo($event) {
          //  $mdBottomSheet.hide();
            $mdDialog.show({
                controller: 'UploadVideoController',
                controllerAs: 'vm',
                templateUrl: 'app/chat/video/upload-video-dialog.tmpl.html',
                targetEvent: $event
            }).then(function() {
                // Add success code
            })
        }

        // Get WaitList video
        function getWaitListVideo(){
        	$state.go('default-layout.admin-layout.wait-list-video');
        }

        function addToWaitList(video_id){
            vm.postParameter = {
                'video_id' : video_id
            }
            videoService.postData('waitlist',vm.postParameter).then(function(response){
                //Update Waitlist in rigth sidebar
                $rootScope.$broadcast('updateWaitList','updateWaitList');
                commonService.showToast(response.message);
            })
        }
    }
})();
