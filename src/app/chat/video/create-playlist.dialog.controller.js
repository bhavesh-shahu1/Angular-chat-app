(function() {
    'use strict';
    angular.module('app.chat.video').controller('CreatePlaylistController', CreatePlaylistController);
    /* @ngInject */
    function CreatePlaylistController($mdDialog, homeService, commonService, Restangular, videoService) {
        var vm = this;
        vm.createPlaylistData = {};
        vm.init = init;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.userInfo = commonService.getUserInfo();
        vm.createPlayList = createPlayList;
        // init
        function init() {
        }

        // Create user playlist name
        function createPlayList(){
            var postParam = {
                user_id : vm.userInfo._id,
                name: vm.createPlaylistData.name
            }
            videoService.postData('uservideoplaylist',postParam).then(function(response){
                commonService.showToast(response.message);
                vm.okClick();
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
