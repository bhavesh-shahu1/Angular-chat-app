(function() {
    'use strict';
    angular.module('app.chat.home').controller('historyController', historyController);
    /* @ngInject */
    function historyController($mdDialog, homeService, commonService, $state) {
        var vm = this;
        vm.data = {};
        vm.init = init;
        vm.openHistory = openHistory;

        function init() {
        }
        
        function openHistory(){

        }
        
        vm.init();
    }
})();
