(function() {
    angular
        .module('app.chat.video')
        .factory('videoService', videoService);

    /* @ngInject */
    function videoService(Restangular, $log) {

        var getData = function(action, id, action2, id2, flag, isPercentage, page, limit, sort_order, sort_by) {
            var queryParams = {
                page: page,
                limit: limit,
                sort_order: sort_order,
                sort_by: sort_by,
                flag: flag,
                is_percentage: isPercentage
            };

            if (action != null && id != null && action2 != null && id2 != null) {
                return Restangular.one(action, id)
                    .one(action2, id2)
                    .get(queryParams)
                    .then(function(response) {
                        return response;
                    }, handleError);
            } else if (action != null && id != null && action2 != null && id2 == null) {
                return Restangular.one(action, id)
                    .one(action2)
                    .get(queryParams)
                    .then(function(response) {
                        return response;
                    }, handleError);

            } else if (action != null && id != null && action2 == null && id2 == null) {
                return Restangular.one(action, id)
                    .get(queryParams)
                    .then(function(response) {
                        return response;
                    }, handleError);
            } else if (action != null && id == null && action2 == null && id2 == null) {
                return Restangular.one(action)
                    .get(queryParams)
                    .then(function(response) {
                        return response;
                    }, handleError);
            } else if (action == null && id == null && action2 == null && id2 == null) {
                return Restangular.get(queryParams)
                    .then(function(response) {
                        return response;
                    }, handleError);
            } else {
                return Restangular.one(action, id)
                    .one(action2, id2)
                    .get(queryParams)
                    .then(function(response) {
                        return response;
                    }, handleError);

            }
        };

        var postData = function(action, postParams) {
            return Restangular.one('api', action)
                .customPOST(postParams)
                .then(function(response) {
                    return response;
                }, handleError);
        };

        var getCustomData = function(action, id, action1, id1, action2, id2, queryParams) {
            return Restangular.one(action, id).one(action1, id1).one(action2, id2)
            .get(queryParams)
            .then(function(response) {
                return response;
            }, handleError);
        };

        function handleError(response) {
            $log.log(response);
        }

        return {
            getData: getData,
            postData: postData,
            getCustomData: getCustomData
        }
    }
})();
