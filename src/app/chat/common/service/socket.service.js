(function() {
    angular.module('app.chat.common').service('socketService', socketService);
    /* @ngInject */
    function socketService($rootScope, commonService) {

        var socket = io.connect('video-playlist.herokuapp.com');
        console.log(commonService.getUserInfo());
        var user = commonService.getUserInfo();
        if (user) {
            var socketOnlineData = {
                user_id: user._id,
                username: user.username,
                user_role: user.user_role,
                socket_id: socket.id,
                avtar: user.avtar
            }
            socket.emit('userGetsOnlineServerAck', socketOnlineData);
        }
        // var socket = io.connect('localhost:9000');
        function on(eventName, callback) {
            socket.on(eventName, callback);
        }

        function emit(eventName, data) {
            socket.emit(eventName, data);
        }

        function getId() {
            return socket.id
        }

        return {
            on: on,
            emit: emit,
            getId: getId
        }
    }
})();