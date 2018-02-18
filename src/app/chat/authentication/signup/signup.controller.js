(function() {
    'use strict';

    angular
        .module('app.chat.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($scope, $state, $mdToast, $http, $filter,authenticationService,commonService) {
        var vm = this;
        vm.init = init;
        vm.user = {};
        vm.signupClick = signupClick;

        function init(){
            // Add intial code
        }

        function signupClick(){
            var postParam = vm.user
            // console.log(postParam);
            authenticationService.postData('signup',postParam)
            .then(function(response){
                commonService.showToast(response.data.message);
                if(response.data.status == '200'){
                    $state.go('authentication.login');
                }
                console.log(response);
            })
        }
       
    }
})();