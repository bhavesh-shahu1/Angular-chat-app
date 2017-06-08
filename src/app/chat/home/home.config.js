(function() {
    'use strict';
    angular.module('app.chat.home').config(homeConfig);
    /* @ngInject */
    function homeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('default-layout.admin-layout.user', {
            url: '/user',
            templateUrl: 'app/chat/home/user/user.tmpl.html',
            controller: 'UserController',
            controllerAs: 'vm'
        })
        .state('default-layout.admin-layout.profile', {
            url: '/profile',
            templateUrl: 'app/chat/profile/profile.tmpl.html',
            controller: 'ProfileController',
            controllerAs: 'vm'
        })
    }
})();