(function() {
    'use strict';
    angular.module('app.chat.home').controller('historyController', historyController);
    /* @ngInject */
    function historyController($mdDialog, homeService, commonService, $state, videoService) {
        var vm = this;
        vm.data = {};
        vm.userInfo = commonService.getUserInfo();
        vm.init = init;
        vm.openHistory = openHistory;

        function init() {
            vm.openHistory();
        }   
        
        // Get history
        function openHistory(){
            vm.activated = true;
            videoService.getData('api', 'userplaylist', vm.userInfo._id, '').
            then(function(response) {
                vm.activated = false;
                vm.historyResponse = response.data;
                commonService.showToast(response.message);
            })
        }
        
        vm.init();
    }
})();
