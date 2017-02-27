(function() {
    'use strict';
    angular.module('app.chat.home').config(homeConfig);
    /* @ngInject */
    function homeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home.user', {
            url: '/user',
            templateUrl: 'app/chat/home/user/user.tmpl.html',
            controller: 'UserController',
            controllerAs: 'vm'
        })
    }
})();