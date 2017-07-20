(function() {
    'use strict';

    angular.module('app.chat', [
            'app.chat.common', 'app.chat.authentication', 'app.chat.layout', 'app.chat.component', 'ngAnimate', 'ngCookies',
            'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'pascalprecht.translate','youtube-embed','ui.tree','ngFileUpload','base64','app.chat.video'
        ]).constant('HTTP_STATUS', {
            'OK': 200,
            'PARTIAL_CONTENT': 206,
            'UNAUTHORIZED': 401,
            'FORBIDDEN': 403,
            'NOT_FOUND': 404,
            'SERVER_ERROR': 500
        })
        .run(function() {
            // chatToken
            // Call Token
        });
})();
