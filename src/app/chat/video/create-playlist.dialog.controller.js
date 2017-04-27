(function() {
    'use strict';
    angular.module('app.chat.video').controller('CreatePlaylistController', CreatePlaylistController);
    /* @ngInject */
    function CreatePlaylistController($mdDialog, homeService, commonService, Restangular, videoService) {
        var vm = this;
        vm.data = {};
        vm.init = init;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.userInfo = commonService.getUserInfo();
        vm.createPlayList = createPlayList;
        // init
        function init() {
        }

        function createPlayList(){
            var postParam = {
                user_id : vm.userInfo._id,
                name: vm.data.name
            }
            videoService.postData('uservideoplaylist',postParam).then(function(response){
                commonService.showToast(response.message);
                vm.cancelClick();
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
