(function() {
    'use strict';
    angular.module('app.chat.authentication').controller('LoginController', LoginController);
    /* @ngInject */
    function LoginController($mdDialog, authenticationService, commonService, $stateParams, $state,socketService, $base64) {
        var vm = this;
        vm.data = {};
        vm.parameter = $stateParams.parameter;
        vm.loginClick = loginClick;
        vm.init = init;
        vm.activateUser = activateUser;
        vm.loginAutomtically = loginAutomtically;
        vm.userInfo = commonService.getUserInfo();
        function init() {
            if (angular.isDefined(vm.parameter)) {
                vm.activateUser();
            }
            if(angular.isDefined(vm.userInfo)){
                vm.loginAutomtically();
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
            vm.password1 =  {
                password1 : vm.user.password
            } 
            // Encode Password
            vm.encode = commonService.encodeObject(vm.password1);
            // console.log(encode);
            authenticationService.postData('login', postParam)
                .then(function(response) {
                    commonService.showToast(response.data.message);
                    response.data.data['password1'] = vm.encode;
                    commonService.setUserInfo(response.data.data);
                    if (response.data.status == '200') {
                        commonService.setUserPermission(true);
                        // $state.go('home.profile');
                        // $state.go('default-layout.admin-layout.user');
                        // $state.go('default-layout.admin-layout.video');
                        // $state.go('default-layout.admin-layout.wait-list-video');
                        //$state.go('default-layout');
                        var user = response.data.data;
                        var socketOnlineData = {
                            user_id : user._id,
                            username : user.username,
                            user_role :user.user_role,
                            socket_id: socketService.getId(),
                            avtar: user.avtar
                        }
                        socketService.emit('userGetsOnlineServerAck', socketOnlineData);
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

        // Login to system whiout entring creadential
        function loginAutomtically() {
            vm.decode = commonService.decodeToObject(vm.userInfo.password1);
            var postParam = {
                name : vm.userInfo.username,
                password : vm.decode.password1
            }
            authenticationService.postData('login', postParam)
                .then(function(response) {
                    commonService.showToast(response.data.message);
                    if (response.data.status == '200') {
                        commonService.setUserPermission(true);
                        var user = response.data.data;
                        var socketOnlineData = {
                            user_id : user._id,
                            username : user.username,
                            user_role :user.user_role,
                            socket_id: socketService.getId(),
                            avtar: user.avtar
                        }
                        socketService.emit('userGetsOnlineServerAck', socketOnlineData);
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