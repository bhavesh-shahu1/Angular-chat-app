(function() {
    'use strict';

    angular
        .module('app.chat.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($scope, $state, $mdToast, $http, $filter,authenticationService) {
        var vm = this;
        // vm.signupClick = signupClick;
        vm.user = {
            name: '',
            email: '',
            password: '',
            confirm: ''
        };

        vm.signupClick = signupClick;

        function signupClick(){
            var postParam =vm.data;
            authenticationService.postData(postParam)
            .then(function(response){
                console.log(response);
            })
        }
        ////////////////

        // function signupClick() {
        //     $http({
        //         method: 'POST',
        //         url: API_CONFIG.url + 'signup',
        //         data: $scope.user
        //     }).
        //     success(function(data) {
        //         $mdToast.show(
        //             $mdToast.simple()
        //             .content($filter('translate')('SIGNUP.MESSAGES.CONFIRM_SENT') + ' ' + data.email)
        //             .position('bottom right')
        //             .action($filter('translate')('SIGNUP.MESSAGES.LOGIN_NOW'))
        //             .highlightAction(true)
        //             .hideDelay(0)
        //         ).then(function() {
        //             $state.go('public.auth.login');
        //         });
        //     }).
        //     error(function() {
        //         $mdToast.show(
        //             $mdToast.simple()
        //             .content($filter('translate')('SIGNUP.MESSAGES.NO_SIGNUP'))
        //             .position('bottom right')
        //             .hideDelay(5000)
        //         );
        //     });
        // }
    }
})();