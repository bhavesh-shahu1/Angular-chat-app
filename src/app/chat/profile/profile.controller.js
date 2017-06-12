(function() {
    'use strict';
    angular
        .module('app.chat.home')
        .controller('ProfileController', ProfileController);

    function ProfileController(commonService, homeService, Upload, $scope, $state, $stateParams) {
        var vm = this;
        vm.init = init;
        vm.user = commonService.getUserInfo();
        // console.log(vm.user);
        vm.getUserProfile = getUserProfile;
        vm.userInfo = commonService.getUserInfo();
        vm.uploadPic = uploadPic;
        vm.userData = {};
        vm.isUsernameAvaliable = isUsernameAvaliable;
        vm.updateUserProfile = updateUserProfile;
        vm.goToWaitList = goToWaitList;
        vm.stateParams = commonService.decodeToObject($stateParams.parameter);          
        console.log(vm.stateParams);
        vm.userInfo._id = vm.stateParams.userInfo._id;
        function init() {
            vm.getUserProfile();
        }

        function getUserProfile() {
            homeService.getData('api', 'user', vm.userInfo._id, '')
                .then(function(response) {
                    if(angular.isDefined(response.data)){
                        vm.userData = response.data;
                        vm.userData.profilePic = 'http://video-playlist.herokuapp.com/images/user_avtar/'+ vm.userData.avtar;
                        if(angular.isDefined(response.data.username)){
                        vm.username = response.data.username;   
                        vm.userData.password = null;     
                        }
                    
                    }
                })
        }

        function updateUserProfile(){
                var postParam =  vm.userData;
              homeService.postCustomData('api', 'user', vm.userInfo._id, '', null, null, postParam)
                .then(function(response) {
                    if(angular.isDefined(response)){
                            commonService.showToast(response.message);
                        }
                    })            
        }

        function uploadPic(file) {
            console.log(file);
                if (file) {
                    Upload.upload({
                        url: 'http://video-playlist.herokuapp.com/api/user_profile_image/' + vm.userInfo._id,
                        // headers : {'mimeType': 'multipart/form-data','crossDomain':true,'contentType':false},
                        data: {avtar:file},
                    }).then(function(response) {
                        if(angular.isDefined(response.data.filename)){
                            vm.userData.profilePic =  'http://video-playlist.herokuapp.com/images/user_avtar/'+ response.data.filename; 
                        }
                     
                        console.log(response);
                        // scope.fileResponse = response.data.data;
                        // var fileValue = angular.fromJson(response.data.data);
                        // scope.data[customfieldName] = fileValue;
                    
                    });
                }
            // } else {
            //     commonService.showToast(errFiles[0].name + ' File too large: ' + 'max size 2MB', 'bottom right');
            // }
        };
        function isUsernameAvaliable(){
            if(vm.username != vm.userData.username){
            homeService.getData('api', 'username_avail', vm.userData.username, '')
                .then(function(response) {
                    console.log(response);
                    if(response.status == 200){
                        vm.isUserAvail = false;
                    }
                    if(response.status == 201){
                        vm.isUserAvail = true;
                    }
                })   
            }else{
                vm.isUserAvail = false;
            }
        }

        function goToWaitList() {
            $state.go('default-layout.admin-layout.wait-list-video');
        }

        // $scope.$watch("vm.userData.username", function(newValue, oldValue){
        //     console.log(vm.userData.username);

        // if(angular.isDefined(vm.userData.username) && newValue != oldValue){
        //     vm.isUsernameAvaliable();
        // }
        // });

        vm.init();
    }

})();
