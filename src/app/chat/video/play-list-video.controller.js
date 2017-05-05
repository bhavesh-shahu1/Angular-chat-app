(function() {
    'use strict';
    angular.module('app.chat.video').controller('PlayListVideoController', PlayListVideoController);
    /* @ngInject */
    function PlayListVideoController($mdDialog, videoService, commonService, $scope, $rootScope, $http, $state) {
        var vm = this;
        vm.data = {};
        vm.init = init;
        vm.userInfo = commonService.getUserInfo();
        vm.getPlayListName = getPlayListName;
        vm.createPlaylist = createPlaylist;
        vm.getVideoListByName = getVideoListByName;
        vm.activePlaylist = activePlaylist;
        // vm.addToWaitList = addToWaitList;
        vm.videoList = {};
        vm.saveOrder = saveOrder;
        vm.saveSearchVideo = saveSearchVideo;
        vm.playUserVideo = playUserVideo;
        vm.backToWaitList = backToWaitList;

        function init() {
            vm.getPlayListName();
        };

        $scope.treeOptions = {
            dragMove: function(event) {
                return true;
            },
            dropped: function(event) {
                vm.newPos = event.dest.index;
                vm.selectedList = vm.videoList[vm.newPos]
                if (vm.newPos != vm.oldPos) {
                    vm.saveOrder();
                }
            },
            dragStart: function(event) {
                vm.oldPos = event.dest.index;
            }
        };

        function saveOrder() {
            var postParameter = {
                videoplaylists_id: vm.selectedList._id,
                userplaylist_id: vm.selectedList.userplaylist_id,
                old_order_id: vm.oldPos,
                new_order_id: vm.newPos
            }
            videoService.postCustomData('api', 'video', 'reorder', null, null, null, postParameter).then(function(response) {
                commonService.showToast(response.message);
            })
        }

        // Get user playlist 
        function getPlayListName() {
            videoService.getData('api', 'uservideoplaylist', vm.userInfo._id, '').
            then(function(response) {
                vm.playlist = response.data.data;
                if (angular.isDefined(vm.response) && vm.response != null) {
                    commonService.showToast(response.data.message);
                }
                angular.forEach(vm.playlist, function(value, key) {
                    if (value.isactive) {
                        vm.getVideoListByName(value);
                    }
                });
            })
        }

        // Show waitlist
        function createPlaylist($event) {
            $mdDialog.show({
                controller: 'CreatePlaylistController',
                controllerAs: 'vm',
                templateUrl: 'app/chat/video/create-playlist.dialog.tmpl.html',
                targetEvent: $event
            }).then(function() {
                vm.getPlayListName();
                // Add success code
            })
        }

        // Get list of video by name
        function getVideoListByName(playlistInfo, index) {
            if (vm.selectedIndex === null) {
                vm.selectedIndex = index;
            } else if (vm.selectedIndex === index) {
                vm.selectedIndex = null;
            } else {
                vm.selectedIndex = index;
            }
            vm.activeListDetail = playlistInfo;
            videoService.getData('api', 'video', vm.activeListDetail._id, '').then(function(response) {
                vm.videoList = response.data;
            })
        }

        // Active user playlist
        function activePlaylist() {
            videoService.getCustomData('api', 'uservideoplaylist', 'active', vm.userInfo._id, vm.activeListDetail._id, '').then(function(response) {
                console.log(response);
                if (angular.isDefined(response.data)) {
                    commonService.showToast(response.data.message);
                }

            });
        }

        // Add to waitlist
        // function addToWaitList() {
        //     vm.postParameter = {
        //         'user_id': vm.userInfo._id
        //     }
        //     videoService.postData('waitlist', vm.postParameter).then(function(response) {
        //         //Update Waitlist in rigth sidebar
        //         $rootScope.$broadcast('updateWaitList', 'updateWaitList');
        //         commonService.showToast(response.message);
        //     })
        // }

        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;

        // Search youtube video
        function querySearch() {
            vm.youtubeVideoKey = 'AIzaSyArYZ6rnkeDpxLWlDCQ3eJ-DC9j6Eb409w';
            vm.url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + vm.searchText + '&key=' + vm.youtubeVideoKey + '&type=video';
            return $http.get(vm.url).then(function(response) {
                console.log(response.data.items);
                return response.data.items;
            });
        }

        // Add Selected video on server
        function saveSearchVideo() {
            vm.youtubeUrl = 'https://youtu.be/' + vm.selectedItem.id.videoId;
            var postParameter = {
                url: vm.youtubeUrl,
                user_id: vm.userInfo._id,
                userplaylist_id: vm.activeListDetail._id
            }
            videoService.postData('userplaylist', postParameter).then(function(response) {
                commonService.showToast(response.message);
                vm.getPlayListName();

            })
        }

        // Play User video
        function playUserVideo(videoInfo) {
            // vm.videoTitle = videoInfo.title;
            vm.videoInformation = angular.toJson(videoInfo);
            localStorage.setItem('videoInfo', vm.videoInformation);
            // $mdSidenav('left').close();
            $rootScope.$broadcast('playUserSelectedVideo', vm.videoInformation);
            $state.go('default-layout.admin-layout.video');
        }
        vm.init();

        function backToWaitList() {
            $state.go('default-layout.admin-layout.wait-list-video');
        }

    }
})();
