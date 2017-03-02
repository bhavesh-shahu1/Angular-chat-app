(function() {
    'use strict';
    angular.module('app.chat').config(webServiceAuthentication);
    /* @ngInject */
    function webServiceAuthentication(RestangularProvider) {
        RestangularProvider.setBaseUrl('https://video-playlist.herokuapp.com/');
        RestangularProvider.setDefaultHeaders({
            //'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'application/json'
        });
        // RestangularProvider.setDefaultHttpFields({
        //     'withCredentials': true

        // });
    }
})();