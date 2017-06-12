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
        // console.log(vm.userInfo);
        vm.uploadVideo = uploadVideo;
        vm.getWaitListVideo = getWaitListVideo;
        vm.playUserVideo = playUserVideo;
        vm.addToWaitList = addToWaitList;
        vm.openRightMenu = openRightMenu;
        vm.getPlayListHistory = getPlayListHistory;
        vm.showUserList = showUserList;
        vm.showUserProfile = showUserProfile;
        vm.logout = logout;

        function init() {
            // vm.videoInfo = localStorage.getItem('videoInfo');
            if (angular.isDefined(localStorage.getItem('videoInfo')) && localStorage.getItem('videoInfo') != null) {
                vm.videoInfo = localStorage.getItem('videoInfo');
                vm.videoInformation1 = JSON.parse(vm.videoInfo);
                vm.videoTitle = vm.videoInformation1.title;
            }
        }

        function logout(){
            commonService.logout();
            $state.go('authentication.login');
        }

        function openLeftMenu() {
            $mdSidenav('left').toggle();
        }

        function openRightMenu() {
            $mdSidenav('right').toggle();
            vm.getPlayListHistory();
        }

        // Get user playlist
        function getUserPlayList() {
            videoService.getData('api', 'userplaylist', vm.userInfo._id, '').
            then(function(response) {
                vm.playList = response.data;
                commonService.showToast(response.message);
            })
        }

        // Get playlist History
        function getPlayListHistory() {
            videoService.getData('api', 'waitlist', 'history', '').
            then(function(response) {
                vm.playListHistory = response.data;
                commonService.showToast(response.data.message);
            })
        }

        // Play User video select from left navigation bar
        function playUserVideo(videoInfo) {
            vm.videoTitle = videoInfo.title;
            vm.videoInformation = angular.toJson(videoInfo);
            localStorage.setItem('videoInfo', vm.videoInformation);
            $mdSidenav('left').close();
            $rootScope.$broadcast('playUserSelectedVideo', vm.videoInformation);
            $state.go('default-layout.admin-layout.video');
        }

        function showUserList(){
            $state.go('default-layout.admin-layout.user');
        }

        function showUserProfile(){
            var userInfo = {
                'userInfo': vm.userInfo
            };
            var encode = commonService.encodeObject(userInfo);
            $state.go('default-layout.admin-layout.profile', {
                parameter: encode
            });
            // $state.go('default-layout.admin-layout.profile');
        }
        // Add event show data in left navigation bar
        $scope.$on('VideoListTab', function($event, message) {
            vm.getUserPlayList();
        });

        $scope.$on('nextVideoInfo', function($event, nextVideoInfo) {
            vm.videoTitle = nextVideoInfo.title;
        });

        // Upload videoTitle
        function uploadVideo($event) {
            //  $mdBottomSheet.hide();
            $mdDialog.show({
                controller: 'UploadVideoController',
                controllerAs: 'vm',
                templateUrl: 'app/chat/video/upload-video-dialog.tmpl.html',
                targetEvent: $event
            }).then(function() {
                vm.getUserPlayList();
            })
        }

        // Get WaitList video
        function getWaitListVideo() {
            $state.go('default-layout.admin-layout.wait-list-video');
        }

        function addToWaitList(video_id) {
            vm.postParameter = {
                'video_id': video_id
            }
            videoService.postData('waitlist', vm.postParameter).then(function(response) {
                //Update Waitlist in rigth sidebar
                $rootScope.$broadcast('updateWaitList', 'updateWaitList');
                commonService.showToast(response.message);
            })
        }

        vm.init();
    }
})();
