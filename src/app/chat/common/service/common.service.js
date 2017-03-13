(function() {
    angular.module('app.chat.common').service('commonService', commonService);
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
            localStorageService.set('userPermission', userPermission);
        }

        var getUserPermission = function(){
            userPermission = localStorageService.get('userPermission');
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

        var logout = function() {
            localStorageService.clearAll();

        };

        return{
            showToast : showToast,
            setUserInfo: setUserInfo,
            getUserInfo: getUserInfo,
            setUserPermission: setUserPermission,
            getUserPermission: getUserPermission,
            logout: logout
        }
    }
})();