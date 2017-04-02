(function() {
    'use strict';
    angular.module('app.chat.video').controller('VideoController', VideoController);
    /* @ngInject */
    function VideoController($mdDialog,homeService,commonService,$stateParams, $scope) {
        var vm = this;
        vm.data = {};
        vm.init = init;
        vm.setUserCurrentVideo = setUserCurrentVideo;
        vm.addToWaitList = addToWaitList;
        // vm.parameter = $stateParams.parameter;
        // vm.getUser = getUser;
        
        function init() {
          vm.videoInfo = localStorage.getItem('videoInfo');
          vm.setUserCurrentVideo(vm.videoInfo);
        }

        // Add event to get select vedio Info
        $scope.$on('playUserSelectedVideo', function($event, videoInfo) {
            vm.setUserCurrentVideo(videoInfo);
        });
        
        function setUserCurrentVideo(videoInfo){
          vm.videoInformation = JSON.parse(videoInfo);
          vm.currentVideoUrl = vm.videoInformation.url;  
        }
        
        // Show waitlist
        function addToWaitList($event) {
            $mdDialog.show({
                controller: 'AddWaitListController',
                controllerAs: 'vm',
                templateUrl: 'app/chat/video/add-waitlist-dialog.tmpl.html',
                targetEvent: $event
            }).then(function() {
                // Add success code
            })
        }

        // function getUser() {
        //     homeService.getData('api','user').
        //     then(function(response) {
        //       vm.userList =  response.data;
        //       commonService.showToast(response.message);
        //     })
        // }

        vm.init();

    }
})();
