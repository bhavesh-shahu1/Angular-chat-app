(function() {
    'use strict';
    angular.module('app.chat.video').controller('PlayListVideoController1', PlayListVideoController1);
    /* @ngInject */
    function PlayListVideoController1($mdDialog, videoService, commonService, $scope, $rootScope, $http, $state) {
        var vm = this;
        vm.data = {};
        vm.createPlaylistData = {};
        vm.init = init;
        vm.userInfo = commonService.getUserInfo();
        vm.getPlayListName = getPlayListName;
        vm.createPlayList = createPlayList;
        vm.getVideoListByName = getVideoListByName;
        vm.activePlaylist = activePlaylist;
        // vm.addToWaitList = addToWaitList;
        vm.videoList = {};
        vm.saveOrder = saveOrder;
        vm.saveSearchVideo = saveSearchVideo;
        // vm.playUserVideo = playUserVideo;
        vm.backToWaitList = backToWaitList;
        vm.getActivePlayListName = getActivePlayListName;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;


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
            vm.activatedPlaylistVedio = true;
            var postParameter = {
                videoplaylists_id: vm.selectedList._id,
                userplaylist_id: vm.selectedList.userplaylist_id,
                old_order_id: vm.oldPos,
                new_order_id: vm.newPos
            }
            videoService.postCustomData('api', 'video', 'reorder', null, null, null, postParameter).then(function(response) {
                vm.activatedPlaylistVedio = false;
                commonService.showToast(response.message);
            })
        }

        // Get user playlist 
        function getPlayListName() {
            vm.activatedPlaylistVedio = true;
            videoService.getData('api', 'uservideoplaylist', vm.userInfo._id, '').
            then(function(response) {
                vm.activatedPlaylistVedio = false;
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

        // Get active user playlist second time
        function getActivePlayListName() {
            vm.activatedPlaylistVedio = true;
            videoService.getData('api', 'uservideoplaylist', vm.userInfo._id, '').
            then(function(response) {
                vm.activatedPlaylistVedio = false;
                vm.playlist = response.data.data;
                if (angular.isDefined(vm.response) && vm.response != null) {
                    commonService.showToast(response.data.message);
                }
                vm.getVideoListByName(vm.activeListDetail);
                // angular.forEach(vm.playlist, function(value, key) {
                //     if (value.isactive) {
                //         vm.getVideoListByName(value);
                //     }
                // });
            })
        }

        //  Show playlist dialog
        // function createPlayList($event) {
        //     $mdDialog.show({
        //         controller: 'CreatePlaylistController',
        //         controllerAs: 'vm',
        //         templateUrl: 'app/chat/video/create-playlist.dialog.tmpl.html',
        //         targetEvent: $event
        //     }).then(function() {
        //         vm.getPlayListName();
        //         // Add success code
        //     })
        // }

        // Create user playlist name
        function createPlayList(){
            var postParam = {
                user_id : vm.userInfo._id,
                name: vm.createPlaylistData.name
            }
            videoService.postData('uservideoplaylist',postParam).then(function(response){
                commonService.showToast(response.message);
                vm.getPlayListName();
            })
        }

        // Get list of video by name
        function getVideoListByName(playlistInfo, index) {
            vm.activatedPlaylistVedio = true;
            if (vm.selectedIndex === null) {
                vm.selectedIndex = index;
            } else if (vm.selectedIndex === index) {
                vm.selectedIndex = null;
            } else {
                vm.selectedIndex = index;
            }
            vm.activeListDetail = playlistInfo;
            videoService.getData('api', 'video', vm.activeListDetail._id, '').then(function(response) {
                vm.activatedPlaylistVedio = false;
                vm.videoList = response.data;
            })
        }

        // Active user playlist
        function activePlaylist() {
            vm.activatedPlaylistVedio = true;
            videoService.getCustomData('api', 'uservideoplaylist', 'active', vm.userInfo._id, vm.activeListDetail._id, '').then(function(response) {
                vm.activatedPlaylistVedio = false;
                vm.getPlayListName();
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
        // Search youtube video
        function querySearch() {
            vm.youtubeVideoKey = 'AIzaSyArYZ6rnkeDpxLWlDCQ3eJ-DC9j6Eb409w';
            vm.url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + vm.searchText + '&key=' + vm.youtubeVideoKey + '&type=video';
            return $http.get(vm.url).then(function(response) {
                // console.log(response.data.items);
                return response.data.items;
            });
        }

        // Add Selected video on server
        function saveSearchVideo() {
            vm.activatedPlaylistVedio = true;
            vm.youtubeUrl = 'https://youtu.be/' + vm.selectedItem.id.videoId;
            var postParameter = {
                url: vm.youtubeUrl,
                user_id: vm.userInfo._id,
                userplaylist_id: vm.activeListDetail._id
            }
            videoService.postData('userplaylist', postParameter).then(function(response) {
                vm.activatedPlaylistVedio = false;
                commonService.showToast(response.message);
                vm.getActivePlayListName();
                vm.getVideoListByName(vm.activeListDetail);
                vm.selectedItem = null;

            })
        }

        // Play User video
        // function playUserVideo(videoInfo) {
        //     // vm.videoTitle = videoInfo.title;
        //     vm.videoInformation = angular.toJson(videoInfo);
        //     localStorage.setItem('videoInfo', vm.videoInformation);
        //     // $mdSidenav('left').close();
        //     $rootScope.$broadcast('playUserSelectedVideo', vm.videoInformation);
        //     $state.go('default-layout.admin-layout.video');
        // }

        vm.init();

        function backToWaitList() {
            $state.go('default-layout.admin-layout.wait-list-video');
        }

    }
})();
