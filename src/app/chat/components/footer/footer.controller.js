(function() {
    'use strict';
    angular.module('app.chat.component').controller('FooterController', FooterController);
    /* @ngInject */
    function FooterController($mdBottomSheet) {
        var vm = this;
        vm.init = init;
        vm.showGridBottomSheet = showGridBottomSheet;

        function init() {

        }

        function showGridBottomSheet() {
            $mdBottomSheet.show({
                templateUrl: 'app/chat/components/footer/bottom-grid-sheet.tmpl.html',
                controller: 'BottomGridSheetController',
                controllerAs : 'vm'
            }).then(function(clickedItem) {
                //     $mdToast.show(
                //         $mdToast.simple()
                //         .textContent(clickedItem['name'] + ' clicked!')
                //         .position('top right')
                //         .hideDelay(1500)
                //     );
            })
        }
    }


})();
