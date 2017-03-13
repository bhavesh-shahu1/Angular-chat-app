(function(){
	'use strict';
	angular.module('app.chat.component').controller('ToolbarController',ToolbarController);
	/* @ngInject */
	 function ToolbarController($mdSidenav){
		var vm = this;
		vm.init = init;
		vm.openLeftMenu = openLeftMenu;
		function init(){
			
		}

		function openLeftMenu(){
			console.log('----------------------');
			$mdSidenav('left').toggle();
		}
	}
})();
