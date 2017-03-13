(function(){
'use strict';
angular.module('app').config(routeConfig);
/* @ngInject */
function routeConfig($stateProvider, $urlRouterProvider) {
		// $stateProvider
  //       .state('chat.admin-default', {
  //           abstract: true,
  //           templateUrl: 'app/chat/layout/default-layout.tmpl.html',
  //           controller: 'DefaultLayoutController',
  //           controllerAs : 'vm',
  //           views: {
  //               sidebarLeft: {
  //                   templateUrl: 'app/chat/components/left-menu/left-menu.tmpl.html',
  //                   controller: 'LeftMenuController',
  //                   controllerAs: 'vm'
  //               },
  //               sidebarRight: {
  //                   templateUrl: 'app/chat/components/right-menu/right-menu.tmpl.html',
  //                   controller: 'RightMenuController',
  //                   controllerAs: 'vm'
  //               },
  //               toolbar: {
  //                   templateUrl: 'app/chat/components/toolbar/toolbar.tmpl.html',
  //                   controller: 'ToolbarController',
  //                   controllerAs: 'vm'
  //               },
  //               // content: {
  //               //      template: '<div flex ui-view></div>'
  //               // },
  //               belowContent: {
  //                   templateUrl: 'app/chat/components/footer/footer.tmpl.html',
  //                   controller: 'FooterController',
  //                   controllerAs: 'vm'
  //               }
  //           }
  //       })	

	// set default routes when no path specified
         $urlRouterProvider.when('', '/login');
        $urlRouterProvider.when('/', '/login');
        // always goto 404 if route not found
        $urlRouterProvider.otherwise('/login');
}

})();