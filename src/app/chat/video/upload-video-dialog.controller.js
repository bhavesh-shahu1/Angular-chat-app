(function() {
    'use strict';
    angular.module('app.chat.video').controller('UploadVideoController', UploadVideoController);
    /* @ngInject */
    function UploadVideoController($mdDialog, homeService, commonService, Restangular, videoService, $http) {
        var vm = this;
        vm.data = {};
        vm.init = init;
        vm.getVideo = getVideo;
        vm.cancelClick = cancelClick;
        vm.okClick = okClick;
        vm.userInfo = commonService.getUserInfo();

        // init
        function init() {
        }
        // vm.testurl = 'https://youtu.be/g5md_fRk2ZA';
        // Get video information from youtube
        function getVideo() {
            if (angular.isDefined(vm.uploadVideoUrl)) {
                 vm.url = 'https://www.youtube.com/oembed?url=' + vm.uploadVideoUrl + '&format=json';
                $http.get(vm.url).then(function(response){
                    vm.response = response;
                 console.log(response);
                });
            }
        }

        function cancelClick() {
            $mdDialog.cancel();
        }

        function okClick() {
            // Upload video on server
            vm.postParam = {
                'url': vm.uploadVideoUrl,
                'user_id': vm.userInfo._id
            }
            videoService.postData('userplaylist', vm.postParam).then(function(response) {
                commonService.showToast(response.message);
            });
            $mdDialog.hide();
        }

        vm.init();

    }
})();
