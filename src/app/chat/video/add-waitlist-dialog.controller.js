(function() {
    'use strict';
    angular.module('app.chat.video').controller('AddWaitListController', AddWaitListController);
    /* @ngInject */
    function AddWaitListController($mdDialog, homeService, commonService, Restangular, videoService) {
        var vm = this;
        vm.data = {};
        vm.init = init;
        vm.getUserPlayList = getUserPlayList;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.userInfo = commonService.getUserInfo();
        vm.addToWaitList = addToWaitList;

        // init
        function init() {
            vm.getUserPlayList();
        }

        // Get user playlist
        function getUserPlayList() {
            videoService.getData('api', 'userplaylist', vm.userInfo._id, '').
            then(function(response) {
                vm.playList = response.data;
                commonService.showToast(response.message);
            })
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

        function cancelClick() {
            $mdDialog.cancel();
        }

        function okClick() {
            $mdDialog.hide();
        }

        vm.init();

    }
})();
