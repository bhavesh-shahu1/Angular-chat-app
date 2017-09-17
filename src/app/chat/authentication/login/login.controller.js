(function() {
    'use strict';
    angular.module('app.chat.authentication').controller('LoginController', LoginController);
    /* @ngInject */
    function LoginController($mdDialog, authenticationService, commonService, $stateParams, $state) {
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

        // Active user when user first time login
        function activateUser() {
            authenticationService.getData('api', 'user', 'activate_user', vm.parameter).
            then(function(response) {
                commonService.showToast(response.data.message);
            });
        }


        function loginClick() {
            var postParam = vm.user
            authenticationService.postData('login', postParam)
                .then(function(response) {
                    commonService.showToast(response.data.message);
                    commonService.setUserInfo(response.data.data);
                    if (response.data.status == '200') {
                        commonService.setUserPermission(true);
                        // $state.go('home.profile');
                        // $state.go('default-layout.admin-layout.user');
                        // $state.go('default-layout.admin-layout.video');
                        // $state.go('default-layout.admin-layout.wait-list-video');
                        //$state.go('default-layout');
                        var screenType = {
                            screenType: 'waitlistVedio'
                        }
                        var encode = commonService.encodeObject(screenType);
                        $state.go('default-layout.admin-layout.wait-list-video', {
                            parameter: encode
                        });
                    }
                })
        }

        vm.init();

    }
})();