(function() {
    'use strict';
    angular.module('app.chat.home').controller('UserController', UserController);
    /* @ngInject */
    function UserController($mdDialog, homeService, commonService, $state) {
        var vm = this;
        console.log('home');
        vm.data = {};
        vm.init = init;
        vm.getUser = getUser;
        vm.selected = [];
        vm.limitOptions = [5, 10, 15];

        vm.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: false,
            limitSelect: true,
            pageSelect: true
        };

        vm.query = {
            order: 'name',
            limit: 5,
            page: 1
        };

        function init() {
            vm.getUser();
        }

        function getUser() {
            homeService.getData('api', 'user').
            then(function(response) {
                vm.userList = response.data;
                commonService.showToast(response.message);
            })
        }
        vm.editUserProfile = editUserProfile;
        
        function editUserProfile(userInfo) {
            console.log(userInfo);
            var userInfo = {
                'userInfo': userInfo
            };
            var encode = commonService.encodeObject(userInfo);
            $state.go('default-layout.admin-layout.profile', {
                parameter: encode
            });
        }
        vm.init();
    }
})();
