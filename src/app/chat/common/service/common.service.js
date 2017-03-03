(function() {
    angular.module('app.chat').service('commonService', commonService);
    /* @ngInject */
    function commonService($mdToast,localStorageService) {
       // var userInfo;
        var setUserInfo = function(user) {
            userInfo = user;
            console.log(userInfo);
            localStorageService.set('userInfo', user);
        };

        var getUserInfo = function() {
            userInfo = localStorageService.get('userInfo');
            return userInfo;
        };      

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
            showToast : showToast,
            setUserInfo: setUserInfo,
            getUserInfo: getUserInfo
        }
    }
})();