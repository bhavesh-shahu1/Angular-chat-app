(function() {
    angular.module('app').service('logoutService', logoutService);
    /* @ngInject */
    function logoutService($mdToast,localStorageService) {
        

        

        var logout = function() {
            localStorageService.clearAll();

        };

        return{
        
            logout: logout
        }
    }
})();