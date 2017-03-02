(function() {
    'use strict';
    angular.module('app.chat.authentication').controller('LoginController', LoginController);
    /* @ngInject */
    function LoginController($mdDialog, authenticationService, commonService, $stateParams) {
        var vm = this;
        vm.data = {};
        vm.parameter = $stateParams.parameter;
        vm.loginClick = loginClick;
        vm.init = init;
        vm.activateUser = activateUser;

        function init() {
            if (angular.isDefined(vm.parameter)) {
                vm.activateUser();
            }
        }

        function activateUser() {
            authenticationService.getData('activate_user', vm.parameter).
            then(function(response) {
                console.log(response);
            })
        }

        function loginClick() {
            var postParam = vm.user
                // console.log(postParam);
            authenticationService.postData('login', postParam)
                .then(function(response) {
                    commonService.showToast(response.data.message);
                    if (response.data.status == '200') {
                        // $state.go('login');
                    }
                    console.log(response);
                })
        }

        vm.init();

    }
})();
