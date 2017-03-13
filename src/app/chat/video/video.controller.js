(function() {
    'use strict';
    angular.module('app.chat.video').controller('VideoController', VideoController);
    /* @ngInject */
    function VideoController($mdDialog,homeService,commonService) {
        var vm = this;
        vm.data = {};
        vm.init = init;
        // vm.getUser = getUser;

        function init() {
          // vm.getUser();
        }

        vm.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';
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
