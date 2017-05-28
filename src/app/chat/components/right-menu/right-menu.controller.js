(function() {
    'use strict';
    angular.module('app.chat.component').controller('RightMenuController', RightMenuController);
    /* @ngInject */
    function RightMenuController(videoService, $scope, commonService, $rootScope, socketService) {
        var vm = this;
        vm.init = init;
        vm.getWaitList = getWaitList;
        vm.userInfo = commonService.getUserInfo();
        vm.userId = vm.userInfo._id;
        vm.username = vm.userInfo.username;
        vm.removeFromWaitList = removeFromWaitList;
        vm.postChat = postChat;
        vm.getUserChat = getUserChat;
        vm.data = {};
        vm.userChat = {};
        vm.userChat.data = [];

        function init() {
            vm.getWaitList();
            vm.getUserChat();
        }

        // Send to server
        function postChat(argument) {
            var msg = {
                user_id: vm.userId,
                username: vm.username,
                msg: vm.data.message
            };
            socketService.emit('send_msg', msg);
        }

        // Get to server
        socketService.on('broadcast', function(data) {
            // console.log(data);
            vm.userChat.data.push(data);
            // console.log(vm.userChat);
        });

        // Get user chat history
        function getUserChat() {
            videoService.getData('api', 'groupchat','1', '').then(function(response) {
                vm.userChat = response.data;
            })
        }
        vm.deleteChat  = deleteChat;
        function deleteChat() {
            videoService.getData('api', 'groupchat','delete', vm.userId).then(function(response) {
                commonService.showToast(response.data.message);
                // console.log(response);
            })   
        }

        // Get video wait List
        function getWaitList() {
            videoService.getData('api', 'waitlist').then(function(response) {
                vm.waitList = response.data;
                vm.waitlistCount = response.data.data.length;
            })
        }

        function removeFromWaitList(waitlist_id, video_id) {
            vm.postParameter = {
                'user_id': vm.userId,
                'video_id': video_id,
                'waitlist_id': waitlist_id
            }
            videoService.postData('video_remove_from_waitlist', vm.postParameter).then(function(response) {
                commonService.showToast(response.data.message);
                // When wait list video remove from wait list update button on waitlist video page.
                $rootScope.$broadcast('updateWaitListButton', 'updateWaitListButtonStatus');
                vm.getWaitList();
            })
        }

        // Whenever video add in waitList update waitlist
        $scope.$on('updateWaitList', function($event, message) {
            vm.getWaitList();
        });

        // Whenever next video load in waitList update waitlist
        $scope.$on('nextVideoInfo', function($event, nextVideoInfo) {
            vm.getWaitList();
        });

        vm.init();
    }
})();
