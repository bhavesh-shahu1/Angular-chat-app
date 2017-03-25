// /*
//  * Get Token for client Login before requesting any API
//  * User: Bhavesh Shahu
//  * Contact: bhavesh.shahu1@gmail.com
//  */
// (function() {
//     angular
//         .module('app.chat.common')
//         .factory('chatToken', chatToken);

//     /* @ngInject */
//     function chatToken(Restangular, API_CONFIG, $cookies, $log, $rootScope, $q, HTTP_STATUS, $mdDialog, $location, $filter, authenticationService, localStorageService,commonService) {

//         restangularInterceptor(Restangular, API_CONFIG, $cookies, $log, $rootScope, $q, HTTP_STATUS, $mdDialog, $location, $filter, authenticationService, localStorageService,commonService);

//         var postData = {
//             api_key: API_CONFIG.api_key,
//             client_secret: API_CONFIG.client_secret,
//             client_password: API_CONFIG.client_password
//         };

//         /**
//          * Get Token for client
//          * @return {String} Token
//          */
//         var getToken = function() {
//             Restangular.all('client/login').post(postData)
//                 .then(function(response) {
//                     if (response.status === HTTP_STATUS.OK) {
//                         $cookies.put('token', response.data.token);
//                         return response.data.token;
//                     } else {
//                         $log.log(response.msg);
//                     }
//                 });
//         };
//         return { getToken: getToken };
//     }

//     /**
//      * Interceptor to add client token to all the API calls except client login
//      */
//     function restangularInterceptor(Restangular, API_CONFIG, $cookies, $log, $rootScope, $q, HTTP_STATUS, $mdDialog, $location, $filter, authenticationService, localStorageService,commonService) {

//         // ..or use the full request interceptor, setRequestInterceptor's more powerful brother!
//         Restangular.addFullRequestInterceptor(function(elem, operation, what, url, headers, params, httpConfig) {
//             Restangular.setBaseUrl(API_CONFIG.url);
//             //Add token to all the URLs except 'client/login'
//             $log.log(elem, operation, what, params);
//             if (what !== 'client/login') {
//                 //check for token in cookie and set it in URL
//                 $log.log($cookies.get('token'));
//                 var token = $cookies.get('token');
//                 if (angular.isDefined(token)) {
//                     Restangular.setRequestSuffix('/' + token);
//                 } else {
//                     //Client login issue - token not found
//                     $log.log('Client login issue - token not found');
//                 }

//                 //Check for JWT Token and add it in Authorization Header
//                 if (!params.skipAuth) {
//                     if (!elem.skipAuth) {
//                         // var jwt_token = authenticationService.getJwtToken();
//                         var jwt_token = false;
//                         if (jwt_token) {
//                             var defaultHeaders = { Authorization: 'Bearer ' + jwt_token };
//                             Restangular.setDefaultHeaders(defaultHeaders);
//                         }
//                     }
//                 }
//             }
//             return {
//                 element: elem,
//                 headers: headers,
//                 httpConfig: httpConfig
//             };
//         });
//         //Request Interceptors
//         // Restangular.addRequestInterceptor(
//         //     function(elem, operation, what) {
//         //         Restangular.setBaseUrl(API_CONFIG.url);
//         //         //Add token to all the URLs except 'client/login'
//         //         $log.log(elem, operation, what);
//         //         if (what !== 'client/login') {
//         //             //check for token in cookie and set it in URL
//         //             $log.log($cookies.get('token'));
//         //             var token = $cookies.get('token');
//         //             if (angular.isDefined(token)) {
//         //                 Restangular.setRequestSuffix('/' + token);
//         //             } else {
//         //                 //Client login issue - token not found
//         //                 $log.log('Client login issue - token not found');
//         //             }

//         //             //Check for JWT Token and add it in Authorization Header
//         //             if (!elem.skipAuth) {
//         //                 var jwt_token = authenticationService.getJwtToken();
//         //                 if (jwt_token) {
//         //                     var defaultHeaders = { Authorization: 'Bearer ' + jwt_token };
//         //                     Restangular.setDefaultHeaders(defaultHeaders);
//         //                 }
//         //             }
//         //         }

//         //         return elem;
//         //     });

//         //Error Interceptors
//         Restangular.setErrorInterceptor(function(response) { //, deferred, responseHandler
//             $log.log(response);
//             var content = response.data.message || $filter('translate')('DIALOG.UNAUTHORIZED.CONTENT');
//             if (response.status === HTTP_STATUS.UNAUTHORIZED || response.status ===HTTP_STATUS.SERVER_ERROR) { //401
//                 commonService.showToastWithAction(content,'top right', 5000);
//                 // $mdDialog.show(
//                 //         $mdDialog.alert()
//                 //         .title($filter('translate')('DIALOG.UNAUTHORIZED.TITLE'))
//                 //         .content(content)
//                 //         .ok($filter('translate')('DIALOG.OK'))
//                 //     )
//                 //     .then(function() {
//                 //         //localStorageService.clearAll();
//                 //         //$location.path('/login');
//                 //     });
//                 // return false; // error handled
//             }

//             return true; // error not handled
//         });

//         //Restangular.addRequestInterceptor(AuthInterceptor($rootScope, $q, AUTH_EVENTS, $cookies, Restangular));
//     }

//     //NOT USED TO  BE DELETED
//     // function AuthInterceptor($rootScope, $q, AUTH_EVENTS, $cookies, Restangular) {
//     //     return {
//     //         responseError: function(response) {
//     //             $rootScope.$broadcast({
//     //                 401: AUTH_EVENTS.notAuthenticated,
//     //                 403: AUTH_EVENTS.notAuthorized,
//     //                 419: AUTH_EVENTS.sessionTimeout,
//     //                 440: AUTH_EVENTS.sessionTimeout
//     //             }[response.status], response);
//     //             return $q.reject(response);
//     //         }
//     //     };
//     // }

// })();
