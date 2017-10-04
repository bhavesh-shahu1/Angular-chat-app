(function() {
    'use strict';
    angular.module('app.chat.component').controller('FooterController', FooterController);
    /* @ngInject */
    function FooterController($mdBottomSheet, $rootScope, $mdSidenav, $scope, $state, commonService) {
        var vm = this;
        vm.init = init;
        vm.showGridBottomSheet = showGridBottomSheet;
        vm.openBottomLeftMenu = openBottomLeftMenu;
        vm.openBottomLeftMenu1 = openBottomLeftMenu1;

        function init() {
            // vm.videoInfo = localStorage.getItem('videoInfo');
            // vm.videoInformation = JSON.parse(vm.videoInfo);
            // console.log(vm.videoInformation);
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
            vm.videoInformation = JSON.parse(videoInfo);
            // vm.videoInformation = videoInfo;
            // console.log(videoInfo);
            vm.init();
        });



        // Brodcast event show data in left navigation bar
        function openBottomLeftMenu() {
            $state.go('play-list-video');
            // $mdSidenav('left').toggle();
            // $rootScope.$broadcast('VideoListTab', 'vedioList');
        }


        function openBottomLeftMenu1() {
            $state.go('default-layout.admin-layout.play-list-video1');
            // $mdSidenav('left').toggle();
            // $rootScope.$broadcast('VideoListTab', 'vedioList');
        }

        vm.openCreatedPlayList = openCreatedPlayList;

        function openCreatedPlayList(action) {
            vm.isCreatedPlayList = action;
            if (vm.isCreatedPlayList) {
                var screenType = {
                    screenType: 'createdPlayList'
                }
                var encode = commonService.encodeObject(screenType);
                $rootScope.$broadcast('menu-open', encode);
                // $state.go('default-layout.admin-layout.wait-list-video', {
                //     parameter: encode
                // });
                // $state.go('default-layout.admin-layout.play-list-video1');
            } else {
                var screenType = {
                    screenType: 'waitlistVedio'
                }
                var encode = commonService.encodeObject(screenType);
                $rootScope.$broadcast('menu-open', encode);
                // $state.go('default-layout.admin-layout.wait-list-video', {
                //     parameter: encode
                // });
            }
        }

        vm.init();

    }
})();