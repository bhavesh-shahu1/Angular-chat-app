(function() {
    angular.module('app.chat.common').service('socketService', socketService);
    /* @ngInject */
    function socketService($rootScope) {

    	var socket = io.connect('video-playlist.herokuapp.com');
        function on(eventName, callback) {
            socket.on(eventName, callback);
        }

        function emit(eventName, data) {
            socket.emit(eventName, data);
        }

        return {
            on: on,
            emit: emit
        }
    }
})();
