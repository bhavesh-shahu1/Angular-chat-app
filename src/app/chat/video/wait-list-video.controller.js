(function() {
    'use strict';
    angular.module('app.chat.video').controller('WaitListVideoController', WaitListVideoController);
    /* @ngInject */
    function WaitListVideoController($mdDialog, videoService, commonService, $scope, $rootScope, $stateParams, $http, $window, homeService) {
        var vm = this;
        $scope.Math = Math;
        vm.stateParams = {};
        $scope.$on('menu-open', function($event, message) {
            vm.stateParams = commonService.decodeToObject(message);
            vm.screenType = vm.stateParams.screenType;
            if (vm.screenType == 'history') {
                vm.openHistory();
            }
            if (vm.screenType == 'createdPlayList') {
                vm.getPlayListName();
            }
            if (vm.screenType == 'socialMedia') {
                vm.getConfiguration();
            }

        });
        vm.data = {};
        vm.init = init;
        vm.userInfo = commonService.getUserInfo();
        vm.getCurrentVideo = getCurrentVideo;
        vm.getNextVideo = getNextVideo;
        vm.setVedioInfo = setVedioInfo;
        vm.addToWaitList = addToWaitList;
        vm.getWaitListStatus = getWaitListStatus;
        vm.removeFromWaitList = removeFromWaitList;
        vm.setCurrnetVedioInfo = setCurrnetVedioInfo;
        vm.uploadPic = uploadPic;
        vm.playerVars = {
            controls: 0,
            autoplay: 1,
            showinfo: 0,
            rel: 0,
            start: 0
        };
        vm.upvote = upvote;
        vm.downvote = downvote;
        vm.openHistory = openHistory;
        vm.getConfiguration = getConfiguration;
        vm.screenType = vm.stateParams.screenType;



        function init() {
            vm.getWaitListStatus();
            vm.getCurrentVideo();
            if (vm.screenType == 'history') {
                vm.openHistory();
            }
            if (vm.screenType == 'createdPlayList') {
                vm.getPlayListName();
            }
        }

        vm.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';

        function getCurrentVideo() {
            vm.activated = true;
            videoService.getData('api', 'waitlist', 'current', '').
            then(function(response) {
                vm.activated = false;
                if (angular.isDefined(response.data.data) && response.data.data != null) {
                    vm.playerVars.start = Math.round(response.data.start_time);
                    vm.response = response.data.data;
                    if (angular.isDefined(vm.response.videoplaylists_id)) {
                        vm.setVedioInfo(vm.response.videoplaylists_id);
                        vm.setCurrnetVedioInfo(response.data);
                    }
                    vm.upvoteCount = vm.response.videoplaylists_id.upvote.split(',');
                    vm.downvoteCount = vm.response.videoplaylists_id.downvote.split(',');
                    // Set vote button color
                    if (vm.response.videoplaylists_id.upvote.includes(vm.userInfo._id)) {
                        vm.upvoteColor['color'] = 'rgb(63,81,181)';
                    } else {
                        vm.upvoteColor['color'] = 'rgba(0,0,0,0.54)';
                    }
                    if (vm.response.videoplaylists_id.downvote.includes(vm.userInfo._id)) {
                        vm.downvoteColor['color'] = 'rgb(63,81,181)';
                    } else {
                        vm.downvoteColor['color'] = 'rgba(0,0,0,0.54)';
                    }
                    // commonService.showToast(response.data.message);
                } else {
                    vm.addWaitlistMessage = 'Please add video in waitlist';
                }

            })
        }

        function getWaitListStatus() {
            vm.activated = true;
            videoService.getData('api', 'get_waitlist_status', vm.userInfo._id, '')
                .then(function(response) {
                    vm.activated = false;
                    vm.waitlistStatus = response.data.data.already_in_waitlist;
                    $rootScope.$broadcast('waitlistStatus', vm.waitlistStatus);
                })
        }

        function getNextVideo() {
            vm.activated = true;
            videoService.getData('api', 'waitlist', 'next', vm.response._id).
            then(function(response) {
                vm.activated = false;
                vm.response = response.data.data;
                if (angular.isDefined(vm.response.videoplaylists_id)) {
                    vm.setVedioInfo(vm.response.videoplaylists_id);
                    vm.setCurrnetVedioInfo(response.data);
                    // Update video info on toolbar
                    $rootScope.$broadcast('nextVideoInfo', vm.response.videoplaylists_id);
                }

                commonService.showToast(response.data.message);
            })
        }

        function setVedioInfo(videoInfo) {
            vm.videoInformation = angular.toJson(videoInfo);
            // localStorage.setItem('videoInfo', vm.videoInformation);
            $rootScope.$broadcast('playUserSelectedVideo', vm.videoInformation);
        }

        function setCurrnetVedioInfo(videoInfo) {
            vm.videoCurrentInformation = angular.toJson(videoInfo);
            $rootScope.$broadcast('playCurrentUserSelectedVideo', vm.videoCurrentInformation);
        }

        function addToWaitList() {
            vm.activated = true;
            vm.postParameter = {
                'user_id': vm.userInfo._id
            }
            videoService.postData('waitlist', vm.postParameter).then(function(response) {
                vm.activated = false;
                vm.getWaitListStatus();
                vm.getCurrentVideo();
                //Update Waitlist in rigth sidebar
                $rootScope.$broadcast('updateWaitList', 'updateWaitList');
                commonService.showToast(response.message);
            })
        }

        function removeFromWaitList($event) {
            $mdDialog.show(
                    $mdDialog.confirm()
                    .title('Delete Waitlist')
                    .content('Are you sure you want to remove from waitlist.')
                    .ok('ok')
                    .cancel('cancel')
                    .targetEvent($event)
                )
                .then(function() {
                    vm.activated = true;
                    videoService.getData('api', 'removevideofromplaylistbyuserid', vm.userInfo._id, '')
                        .then(function(response) {
                            vm.activated = false;
                            vm.getWaitListStatus();
                            vm.getNextVideo();
                            $rootScope.$broadcast('updateWaitList', 'updateWaitList');
                            commonService.showToast(response.data.message);
                        })
                });
        }

        vm.upvoteColor = {};
        vm.downvoteColor = {};

        function upvote(id) {
            videoService.getData('api', 'upvote', id.toString(), vm.userInfo._id)
                .then(function(response) {
                    if (angular.isDefined(response.data.data)) {
                        vm.upvoteCount = response.data.data.upvote.split(',');
                        vm.downvoteCount = response.data.data.downvote.split(',');
                        if (response.data.data.upvote.includes(vm.userInfo._id)) {
                            vm.upvoteColor['color'] = 'rgb(63,81,181)';
                        } else {
                            vm.upvoteColor['color'] = 'rgba(0,0,0,0.54)';
                        }
                        if (response.data.data.downvote.includes(vm.userInfo._id)) {
                            vm.downvoteColor['color'] = 'rgb(63,81,181)';
                        } else {
                            vm.downvoteColor['color'] = 'rgba(0,0,0,0.54)';
                        }
                    }

                })
        }

        function downvote(id) {
            videoService.getData('api', 'downvote', id.toString(), vm.userInfo._id)
                .then(function(response) {
                    if (angular.isDefined(response.data.data)) {
                        vm.upvoteCount = response.data.data.upvote.split(',');
                        vm.downvoteCount = response.data.data.downvote.split(',');
                        // Set vote button color
                        if (response.data.data.upvote.includes(vm.userInfo._id)) {
                            vm.upvoteColor['color'] = 'rgb(63,81,181)';
                        } else {
                            vm.upvoteColor['color'] = 'rgba(0,0,0,0.54)';
                        }
                        if (response.data.data.downvote.includes(vm.userInfo._id)) {
                            vm.downvoteColor['color'] = 'rgb(63,81,181)';
                        } else {
                            vm.downvoteColor['color'] = 'rgba(0,0,0,0.54)';
                        }
                    }
                })
        }

        $scope.$on('youtube.player.ended', function($event, player) {
            vm.getNextVideo();
            // play it again
            // player.playVideo();
        });

        // Whenever video remove from waitList update button status
        $scope.$on('updateWaitListButton', function($event, message) {
            vm.getWaitListStatus();
        });

        $scope.$on('setWaitListStatus', function($event, message) {
            if(message == 'joinWaitList'){
                vm.addToWaitList();
            }
            if(message == 'stopPlaying'){
                vm.removeFromWaitList();
            }
        });

        // Get history
        function openHistory() {
            vm.activated = true;
            videoService.getData('api', 'waitlist', 'history', '').
            then(function(response) {
                vm.activated = false;
                vm.historyResponse = response.data.data;
                //commonService.showToast(response.message);
            })
        }

        // Create Playlist Methods
        vm.getPlayListName = getPlayListName;
        vm.createPlayList = createPlayList;
        vm.getVideoListByName = getVideoListByName;
        vm.activePlaylist = activePlaylist;
        vm.videoList = {};
        vm.saveOrder = saveOrder;
        vm.saveSearchVideo = saveSearchVideo;
        vm.getActivePlayListName = getActivePlayListName;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.createPlaylistData = {};

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
                // commonService.showToast(response.message);
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
                    // commonService.showToast(response.data.message);
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
                    // commonService.showToast(response.data.message);
                }
                vm.getVideoListByName(vm.activeListDetail);
                // angular.forEach(vm.playlist, function(value, key) {
                //     if (value.isactive) {
                //         vm.getVideoListByName(value);
                //     }
                // });
            })
        }
        // Create user playlist name
        function createPlayList() {
            if (angular.isDefined(vm.createPlaylistData.name) && vm.createPlaylistData.name != null && vm.createPlaylistData.name != '') {
                vm.activatedPlaylistVedio = true;
                var postParam = {
                    user_id: vm.userInfo._id,
                    name: vm.createPlaylistData.name
                }
                videoService.postData('uservideoplaylist', postParam).then(function(response) {
                    vm.activatedPlaylistVedio = false;
                    // commonService.showToast(response.message);
                    vm.getPlayListName();
                    vm.createPlaylistData.name = null;
                })
            } else {
                commonService.showToast('Enter playlist name first !');
            }
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

        // Search youtube video
        function querySearch() {
            if (vm.searchText) {

                vm.youtubeVideoKey = 'AIzaSyArYZ6rnkeDpxLWlDCQ3eJ-DC9j6Eb409w';
                vm.url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + vm.searchText + '&key=' + vm.youtubeVideoKey + '&type=video';
                return $http.get(vm.url).then(function(response) {
                    // console.log(response.data.items);
                    return response.data.items;
                });
            }
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
                // commonService.showToast(response.message);
                vm.getActivePlayListName();
                vm.getVideoListByName(vm.activeListDetail);
                vm.selectedItem = null;

            })
        }

        function uploadPic(file) {
            vm.activated = true;
            if (file) {
                Upload.upload({
                    url: 'https://video-playlist.herokuapp.com/api/user_profile_image/' + vm.userInfo._id,
                    // headers : {'mimeType': 'multipart/form-data','crossDomain':true,'contentType':false},
                    data: {
                        avtar: file
                    },
                }).then(function(response) {
                    vm.activated = false;
                    if (angular.isDefined(response.data.filename)) {
                        vm.userData.profilePic = 'https://video-playlist.herokuapp.com/images/user_avtar/' + response.data.filename;
                    }
                });
            }
            // } else {
            //     commonService.showToast(errFiles[0].name + ' File too large: ' + 'max size 2MB', 'bottom right');
            // }
        };
        setTimeout(function() {
            var youtubeDiv = angular.element(document.getElementById('youtubePanel')).innerHeight();
            var currentPlaylistInfoBoxDiv = angular.element(document.getElementById('currentPlaylistInfoBox')).innerHeight();
            var divsize = angular.element(document.getElementById('activ_video')).prop('offsetWidth');
            var divheight = angular.element(document.getElementById('activ_video')).prop('offsetHeight')
            var footerheight = angular.element(document.getElementById('bottom-bar')).prop('offsetHeight');
            var topheight = angular.element(document.getElementById('top-bar')).prop('offsetHeight');
            $scope.$apply(function() {
                vm.playlistStyle = {
                    'max-width': divsize + 'px',
                    'min-width': divsize + 'px',
                    'max-height': $window.innerHeight - footerheight - topheight + "px",
                    'min-height': $window.innerHeight - footerheight - topheight + "px"
                        // 'overflow-y': 'scroll'

                };
                vm.playlistVedioStyle = {
                        'overflow-y': scroll,
                        'max-height': $window.innerHeight - footerheight - topheight - currentPlaylistInfoBoxDiv - youtubeDiv + "px"
                    }
                    // vm.createPlaylistSidebarStyle = {
                    //     'overflow-y': scroll,
                    //     'max-height': $window.innerHeight - footerheight - topheight - youtubeDiv + "px"
                    // }
                vm.historyStyle = {
                    'max-width': divsize + 'px',
                    'min-width': divsize + 'px',
                    'max-height': $window.innerHeight - footerheight - topheight + "px",
                    'min-height': $window.innerHeight - footerheight - topheight + 18 + "px",
                    'overflow-y': 'scroll'
                };
            });
        }, 50);

        var w = angular.element($window);
        w.bind('resize', function() {
            var currentPlaylistInfoBoxDiv = angular.element(document.getElementById('currentPlaylistInfoBox')).innerHeight();
            var youtubeDiv = angular.element(document.getElementById('youtubePanel')).innerHeight();
            var divsize = angular.element(document.getElementById('activ_video')).prop('offsetWidth');
            var divheight = angular.element(document.getElementById('activ_video')).prop('offsetHeight')
            var footerheight = angular.element(document.getElementById('bottom-bar')).prop('offsetHeight');
            var topheight = angular.element(document.getElementById('top-bar')).prop('offsetHeight');
            $scope.$apply(function() {
                vm.playlistStyle = {
                    'max-width': divsize + 'px',
                    'min-width': divsize + 'px',
                    'max-height': $window.innerHeight - footerheight - topheight + "px",
                    'min-height': $window.innerHeight - footerheight - topheight + "px"
                        // 'overflow-y': 'scroll'
                };
                vm.playlistVedioStyle = {
                    'overflow-y': scroll,
                    'max-height': $window.innerHeight - footerheight - topheight - currentPlaylistInfoBoxDiv - youtubeDiv + "px"
                };
                // vm.createPlaylistSidebarStyle = {
                //     'overflow-y': scroll,
                //     'max-height': $window.innerHeight - footerheight - topheight - youtubeDiv + "px"
                // }
                vm.historyStyle = {
                    'max-width': divsize + 'px',
                    'min-width': divsize + 'px',
                    'max-height': $window.innerHeight - footerheight - topheight + "px",
                    'min-height': $window.innerHeight - footerheight - topheight + 18 + "px",
                    'overflow-y': 'scroll'
                };
            });
        });

        function getConfiguration() {
            homeService.getData('api', 'configuration').
            then(function(response) {
                vm.configuration = response.data[0];
            })
        }


        vm.init();

    }
})();