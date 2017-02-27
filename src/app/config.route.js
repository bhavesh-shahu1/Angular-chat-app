(function(){
'use strict';
angular.module('app').config(routeConfig);
/* @ngInject */
function routeConfig($stateProvider, $urlRouterProvider) {
	// set default routes when no path specified
        $urlRouterProvider.when('', '/login');
        $urlRouterProvider.when('/', '/login');
        // always goto 404 if route not found
        $urlRouterProvider.otherwise('/login');
}

})();