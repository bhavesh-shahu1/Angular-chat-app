(function() {
    'use strict';
    angular.module('app.chat.authentication').config(authenticationConfig);
    /* @ngInject */
    function authenticationConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/chat/authentication/login/login.tmpl.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        }),
        $stateProvider.state('loginactive', {
            url: '/login/:parameter',
            templateUrl: 'app/chat/authentication/login/login.tmpl.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        }),
        $stateProvider.state('signup', {
            url: '/signup',
            templateUrl: 'app/chat/authentication/signup/signup.tmpl.html',
            controller: 'SignupController',
            controllerAs: 'vm'
        }),$stateProvider.state('forgot', {
            url: '/forgot',
            templateUrl: 'app/chat/authentication/forgot/forgot.tmpl.html',
            controller: 'ForgotController',
            controllerAs: 'vm'
        })
    }
})();