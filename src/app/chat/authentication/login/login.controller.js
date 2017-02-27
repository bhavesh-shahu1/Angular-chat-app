(function() {
    'use strict';
    angular.module('app.chat.authentication').controller('LoginController', LoginController);
    /* @ngInject */
    function LoginController($mdDialog) {
        var vm = this;
        vm.data = {};
        vm.loginClick = loginClick;

        function loginClick(){
            var postData = {
                data : vm.user
            }
            console.log(postData);

        }


    }
})();