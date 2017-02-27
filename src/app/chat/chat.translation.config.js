(function() {
    'use strict';
    angular.module('app.chat').config(chatTranslate);
    /* @ngInject */
    function chatTranslate($translateProvider) {
        // add translation table
        $translateProvider
            .translations('en', translations)
            .preferredLanguage('en');
    }
})();