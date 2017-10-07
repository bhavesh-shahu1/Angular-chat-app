(function() {
    'use strict';

    angular.module('app', ['ngMaterial', 
        'md.data.table', 
        'restangular', 
        'pascalprecht.translate', 
        'ui.router', 
        'app.chat',
        'app.chat.home', 
        'ngAnimate', 
        'ngCookies', 
        'ngSanitize', 
        'nvd3', 
        'ngMessages', 
        'angularMaterialAdmin', 
        'LocalStorageModule',
        'base64'
        ])
        .constant('API_CONFIG', {
            'url': 'https://video-playlist.herokuapp.com/',
            // 'url': 'http://localhost:9000/',
            'api_key': 'local_key',
            'client_secret': '100010134',
            'client_password': 'admin@123'
        });
})();
