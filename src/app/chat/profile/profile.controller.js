(function(){
	'use strict';
  angular
    .module('app.chat.home')
    .controller('ProfileController',ProfileController);

  function ProfileController(commonService) {
    var vm = this;
    vm.user = commonService.getUserInfo();
    console.log(vm.user);
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
