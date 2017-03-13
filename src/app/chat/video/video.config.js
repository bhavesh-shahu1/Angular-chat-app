(function() {
    'use strict';
    angular.module('app.chat.video').config(videoConfig);
    /* @ngInject */
    function videoConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('default-layout.admin-layout.video', {
            url: '/video',
            templateUrl: 'app/chat/video/video.tmpl.html',
            controller: 'VideoController',
            controllerAs: 'vm'
        })
    }
})();