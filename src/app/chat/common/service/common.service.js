(function() {
    angular.module('app.chat').service('commonService', commonService);
    /* @ngInject */
    function commonService($mdToast) {
        /**
         * Pass a message to show a Toast
         * message: String
         */
        var showToast = function(message, position, hideDelay) {
            position = position || 'bottom right';
            hideDelay = hideDelay || 5000;
            $mdToast.show({
                template: '<md-toast><span flex translate>' + message + '</span></md-toast>',
                position: position,
                hideDelay: hideDelay
            });
        };

        return{
            showToast : showToast
        }
    }
})();