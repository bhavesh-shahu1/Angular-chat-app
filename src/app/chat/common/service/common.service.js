(function() {
    angular.module('app.chat').service('commonService', commonService);
    /* @ngInject */
    function commonService($mdToast,localStorageService) {
        //var userInfo;
        var userPermission;
        var setUserInfo = function(user) {
            userInfo = user;
            localStorageService.set('userInfo', user);
        };

        var getUserInfo = function() {
            userInfo = localStorageService.get('userInfo');
            return userInfo;
        };      
        
        var setUserPermission = function(permission){
            userPermission = permission;
        }

        var getUserPermission = function(){
            return userPermission;
        }

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
            getUserInfo: getUserInfo,
            setUserPermission: setUserPermission,
            getUserPermission: getUserPermission
        }
    }
})();