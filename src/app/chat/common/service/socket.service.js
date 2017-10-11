(function() {
    angular.module('app.chat.common').service('socketService', socketService);
    /* @ngInject */
    function socketService($rootScope) {

        var socket = io.connect('video-playlist.herokuapp.com');
    	//var socket = io.connect('localhost:9000');
        function on(eventName, callback) {
            socket.on(eventName, callback);
        }

        function emit(eventName, data) {
            socket.emit(eventName, data);
        }

        function getId(){
            return socket.id
        }

        return {
            on: on,
            emit: emit,
            getId: getId
        }
    }
})();
