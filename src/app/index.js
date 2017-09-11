'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngCookies',
    'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3','app'
])

.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider,
    $mdIconProvider) {
    $stateProvider
        .state('home', {
            url: '',
            templateUrl: 'app/views/main.html',
            controller: 'MainController',
            controllerAs: 'vm',
            abstract: true
        })
        .state('home.dashboard', {
            url: '/dashboard',
            templateUrl: 'app/views/dashboard.html',
            data: {
                title: 'Dashboard'
            }
        })
        .state('home.profile', {
            url: '/profile',
            templateUrl: 'app/chat/profile/profile.tmpl.html',
            controller: 'ProfileController',
            controllerAs: 'vm',
            data: {
                title: 'Profile'
            }
        })
        .state('home.table', {
            url: '/table',
            controller: 'TableController',
            controllerAs: 'vm',
            templateUrl: 'app/views/table.html',
            data: {
                title: 'Table'
            }
        });

    $urlRouterProvider.otherwise('/login');

    $mdThemingProvider
    //.theme('default')
        .theme('cyan')
        .primaryPalette('grey', {
            'default': '600'
        })
        .accentPalette('teal', {
            'default': '500'
        })
        .warnPalette('defaultPrimary');

    $mdThemingProvider.theme('dark', 'default')
        .primaryPalette('defaultPrimary')
        .dark();

    $mdThemingProvider.theme('grey', 'default')
        .primaryPalette('grey');

    $mdThemingProvider.theme('custom', 'default')
        .primaryPalette('defaultPrimary', {
            'hue-1': '50'
        });

    $mdThemingProvider.definePalette('defaultPrimary', {
        '50': '#FFFFFF',
        '100': 'rgb(255, 198, 197)',
        '200': '#E75753',
        '300': '#E75753',
        '400': '#E75753',
        '500': '#E75753',
        '600': '#E75753',
        '700': '#E75753',
        '800': '#E75753',
        '900': '#E75753',
        'A100': '#E75753',
        'A200': '#E75753',
        'A400': '#E75753',
        'A700': '#E75753'
    });

    var customAccent = {
    '50': '#d7294f',
    '100': '#d7294f',
    '200': '#d7294f',
    '300': '#d7294f',
    '400': '#d7294f',
    '500': '#d7294f',
    '600': '#d7294f',
    '700': '#d7294f',
    '800': '#d7294f',
    '900': '#d7294f',
    'A100': '#d7294f',
    'A200': '#d7294f',
    'A400': '#d7294f',
    'A700': '#d7294f',
    'contrastDefaultColor': 'light'
};
var  blackAccent ={
     '50': '#fff',
    '100': '#000000',
    '200': '#000000',
    '300': '#000000',
    '400': '#000000',
    '500': '#000',
    '600': '#fff',
    '700': '#000000',
    '800': '#000000',
    '900': '#000000',
    'A100': '#000000',
    'A200': '#000000',
    'A400': '#000000',
    'A700': '#000000',
    'contrastDefaultColor': 'light'
}
$mdThemingProvider
.definePalette('whiteAccent', customAccent);

$mdThemingProvider
.definePalette('blackAccent', blackAccent);

$mdThemingProvider.theme('whiteAccentTheme')
    .primaryPalette('blackAccent')
    .accentPalette('whiteAccent');

    $mdIconProvider.icon('user', 'assets/images/user.svg', 64);
$mdThemingProvider.setDefaultTheme('whiteAccentTheme');

}).run(function($rootScope,commonService,$state) {
    $rootScope.$on('$stateChangeStart', function(e, to) {
        // console.log(e);
        // console.log(to);
        if(angular.equals(to.name, 'authentication.login') || angular.equals(to.name, 'authentication.signup') || angular.equals(to.name, 'authentication.forgot') || angular.equals(to.name,'authentication.loginactive')) {
          
        }else{
          if(!commonService.getUserPermission()){
            e.preventDefault();
          }
        }
        // if(false){
        //   e.preventDefault();
        //    $state.go('login');
        // }
    })
});
