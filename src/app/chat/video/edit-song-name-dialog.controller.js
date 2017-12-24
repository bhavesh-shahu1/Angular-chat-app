(function() {
    'use strict';
    angular.module('app.chat.video').controller('EditSongNameController', EditSongNameController);
    /* @ngInject */
    function EditSongNameController($mdDialog, homeService, commonService, Restangular, videoService, locals) {
        var vm = this;
        vm.data = locals;
        vm.init = init;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.userInfo = commonService.getUserInfo();
        vm.getData = getData;
        vm.saveSongInfo = saveSongInfo;
        // init
        function init() {
            vm.getData();
        }

        function getData(){

        }

        // Create user playlist name
        function saveSongInfo(){
            // var postParam = {
            //     user_id : vm.userInfo._id,
            //     name: vm.data.title
            // }

            var postParam = vm.data;
            videoService.postCustomData('api','','videoplaylists','edit',null,null,postParam).then(function(response){
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
