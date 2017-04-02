(function() {
    'use strict';
    angular.module('app.chat.component').controller('FooterController', FooterController);
    /* @ngInject */
    function FooterController($mdBottomSheet, $rootScope, $mdSidenav, $scope) {
        var vm = this;
        vm.init = init;
        vm.showGridBottomSheet = showGridBottomSheet;
        vm.openBottomLeftMenu = openBottomLeftMenu;

        function init() {
            vm.videoInfo = localStorage.getItem('videoInfo');
            vm.videoInformation = JSON.parse(vm.videoInfo);
        }

        function showGridBottomSheet() {
            $mdBottomSheet.show({
                templateUrl: 'app/chat/components/footer/bottom-grid-sheet.tmpl.html',
                controller: 'BottomGridSheetController',
                controllerAs: 'vm'
            }).then(function(clickedItem) {
                // Add success function
            })
        }

        // Add event to get select vedio Info
        $scope.$on('playUserSelectedVideo', function($event, videoInfo) {
            vm.init();
        });



        // Brodcast event show data in left navigation bar
        function openBottomLeftMenu() {
            $mdSidenav('left').toggle();
            $rootScope.$broadcast('VideoListTab', 'vedioList');
        }

        vm.init();

    }
})();
