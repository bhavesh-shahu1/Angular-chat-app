(function() {
    'use strict';

    angular
        .module('app.chat.authentication')
        .controller('ForgotController', ForgotController);

    /* @ngInject */
    function ForgotController($scope, $state, $mdToast, $filter, $http,authenticationService,commonService) {
        var vm = this;
        vm.resetClick = resetClick;
        // vm.user = {
        //     email: ''
        // };
        function resetClick() {

            var postParam = vm.user
              console.log(postParam);
            authenticationService.postData('forget_password', postParam)
                .then(function(response) {
                    commonService.showToast(response.data.message);
                    if (response.data.status == '200') {
                         $state.go('login');
                    }
                })
        }
    }
})();
