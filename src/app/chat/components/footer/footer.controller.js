(function() {
    'use strict';
    angular.module('app.chat.component').controller('FooterController', FooterController);
    /* @ngInject */
    function FooterController($mdBottomSheet, $rootScope, $mdSidenav) {
        var vm = this;
        vm.init = init;
        vm.showGridBottomSheet = showGridBottomSheet;
        vm.openBottomLeftMenu = openBottomLeftMenu;

        function init() {

        }

        function showGridBottomSheet() {
            $mdBottomSheet.show({
                templateUrl: 'app/chat/components/footer/bottom-grid-sheet.tmpl.html',
                controller: 'BottomGridSheetController',
                controllerAs : 'vm'
            }).then(function(clickedItem) {
                // Add success function
            })
        }

        // Brodcast event show data in left navigation bar
        function openBottomLeftMenu(){
            $mdSidenav('left').toggle();
            $rootScope.$broadcast('VideoListTab', 'vedioList');
        }
    }


})();
