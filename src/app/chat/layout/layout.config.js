// (function() {
//     'use strict';
//     angular.module('app.chat.layout').config(layoutConfig);
//     /* @ngInject */
//     function layoutConfig($stateProvider) {
//         $stateProvider
//             .state('default-layout', {
//                 abstract: true,
//                 //url: '/layout',
//                 templateUrl: 'app/chat/layout/default-layout.tmpl.html',
//                 controller: 'DefaultLayoutController',
//                 controllerAs: 'vm'
//             })
//             .state('default-layout.admin-layout',{
//                 // abstract: true,
//                 views: {
//                     sidebarLeft: {
//                         templateUrl: 'app/chat/components/left-menu/left-menu.tmpl.html',
//                         controller: 'LeftMenuController',
//                         controllerAs: 'vm'
//                     },
//                     sidebarRight: {
//                         templateUrl: 'app/chat/components/right-menu/right-menu.tmpl.html',
//                         controller: 'RightMenuController',
//                         controllerAs: 'vm'
//                     },
//                     toolbar: {
//                         templateUrl: 'app/chat/components/toolbar/toolbar.tmpl.html',
//                         controller: 'ToolbarController',
//                         controllerAs: 'vm'
//                     },
//                     content: {
//                          template: '<div flex ui-view>test</div>'
//                     },
//                     belowContent: {
//                         templateUrl: 'app/chat/components/footer/footer.tmpl.html',
//                         controller: 'FooterController',
//                         controllerAs: 'vm'
//                     }
//                 }
//             })
//     }
// })();
