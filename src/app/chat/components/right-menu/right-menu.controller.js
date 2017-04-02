(function() {
    'use strict';
    angular.module('app.chat.component').controller('RightMenuController', RightMenuController);
    /* @ngInject */
    function RightMenuController(videoService,$scope,commonService) {
        var vm = this;
        vm.init = init;
        vm.getWaitList = getWaitList;
        vm.userInfo = commonService.getUserInfo();
        vm.userId = vm.userInfo._id
        vm.removeFromWaitList = removeFromWaitList;
        function init() {
            vm.getWaitList();
        }

        // Get video wait List
        function getWaitList() {
            videoService.getData('api', 'waitlist').then(function(response) {
                vm.waitList = response.data;
                vm.waitlistCount = response.data.data.length;
            })
        }

        function removeFromWaitList(waitlist_id, video_id){
            vm.postParameter = {
                'user_id' : vm.userId,
                'video_id' : video_id,
                'waitlist_id': waitlist_id
            }
            videoService.postData('video_remove_from_waitlist',vm.postParameter).then(function(response){
                commonService.showToast(response.data.message);
                vm.getWaitList();
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
