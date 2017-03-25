(function() {
    'use strict';
    angular.module('app.chat.component').controller('BottomGridSheetController', BottomGridSheetController);
    /* @ngInject */
    function BottomGridSheetController($mdDialog, $mdBottomSheet) {

        var vm = this;
        vm.init = init;
        vm.uploadVideo = uploadVideo;

        function init() {
        }

        // Upload video
        function uploadVideo($event) {
            $mdBottomSheet.hide();
            $mdDialog.show({
                controller: 'UploadVideoController',
                controllerAs: 'vm',
                templateUrl: 'app/chat/video/upload-video-dialog.tmpl.html',
                targetEvent: $event
            }).then(function() {
                // Add success code
            })
        }
        vm.init();
    }

})();
