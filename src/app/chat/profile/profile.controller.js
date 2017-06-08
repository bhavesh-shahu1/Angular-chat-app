(function() {
    'use strict';
    angular
        .module('app.chat.home')
        .controller('ProfileController', ProfileController);

    function ProfileController(commonService,homeService) {
        var vm = this;
        vm.init = init;
        vm.user = commonService.getUserInfo();
        console.log(vm.user);
        vm.getUserProfile = getUserProfile;
        vm.userInfo = commonService.getUserInfo();
        vm.userData = {};
        function init() {
            vm.getUserProfile();
        }

        function getUserProfile() {
            homeService.getData('api', 'user', vm.userInfo._id, '')
                .then(function(response) {
                    console.log(response);
                    vm.userData = response.data;
                })
        }

        vm.init();
        // vm.user = {
        //   title: 'Admin',
        //   email: 'contact@flatlogic.com',
        //   firstName: '',
        //   lastName: '' ,
        //   company: 'FlatLogic Inc.' ,
        //   address: 'Fabritsiusa str, 4' ,
        //   city: 'Minsk' ,
        //   state: '' ,
        //   biography: 'We are young and ambitious full service design and technology company. ' +
        //   'Our focus is JavaScript development and User Interface design.',
        //   postalCode : '220007'
        // };
    }

})();
