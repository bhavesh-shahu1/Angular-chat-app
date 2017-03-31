(function() {
    'use strict';
    angular.module('app.chat.video').controller('WaitListVideoController', WaitListVideoController);
    /* @ngInject */
    function WaitListVideoController($mdDialog,videoService,commonService) {
        var vm = this;
        vm.data = {};
        vm.init = init;
        vm.getCurrentVideo = getCurrentVideo;   
        function init() {
          vm.getCurrentVideo();
        }

        vm.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';

        function getCurrentVideo() {
            videoService.getData('api','waitlist','current','').
            then(function(response) {
              response =  response.data;
              commonService.showToast(response.message);
            })
        }

        vm.init();

    }
})();
