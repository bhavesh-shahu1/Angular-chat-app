(function() {
    'use strict';
    angular.module('app.chat.video').controller('UploadVideoController', UploadVideoController);
    /* @ngInject */
    function UploadVideoController($mdDialog,homeService,commonService) {
        var vm = this;
        vm.data = {};
        vm.init = init; 
        vm.getVideo = getVideo;
        // vm.getUser = getUser;
        
        
        function init() {
          // vm.getUser();
        }

        function getVideo(){
            console.log('--------------------------------');
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
