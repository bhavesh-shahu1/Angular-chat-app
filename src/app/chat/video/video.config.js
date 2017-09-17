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
        .state('default-layout.admin-layout.wait-list-video', {
            url: '/waitlist-video/:parameter',
            templateUrl: 'app/chat/video/wait-list-video.tmpl.html',
            controller: 'WaitListVideoController',
            controllerAs: 'vm'
        })
        .state('play-list-video', {
            url: '/playlist-video',
            templateUrl: 'app/chat/video/play-list-video.tmpl.html',
            controller: 'PlayListVideoController',
            controllerAs: 'vm'
        })
        .state('default-layout.admin-layout.play-list-video1', {
            url: '/playlist-video1',
            templateUrl: 'app/chat/video/play-list-video1.tmpl.html',
            controller: 'PlayListVideoController1',
            controllerAs: 'vm'
        })
    }
})();