(function(){
	angular
	.module('app.chat.authentication')
	.factory('authenticationService',authenticationService);

	/* @ngInject */
	function authenticationService(Restangular,$log){
       
		var getData = function(moduleType, organizationId, action, id, action2, id2, flag, isPercentage, page, limit, sort_order, sort_by) {
            var queryParams = {
                page: page,
                limit: limit,
                sort_order: sort_order,
                sort_by: sort_by,
                flag: flag,
                is_percentage: isPercentage
            };

            if (action != null && id != null && action2 != null && id2 != null) {
                return Restangular.one(moduleType, organizationId)
                    .one(action, id)
                    .one(action2, id2)
                    .get(queryParams)
                    .then(function(response) {
                        return response;
                    }, handleError);
            } else if (action != null && id != null && action2 != null && id2 == null) {
                return Restangular.one(moduleType, organizationId)
                    .one(action, id)
                    .one(action2)
                    .get(queryParams)
                    .then(function(response) {
                        return response;
                    }, handleError);

            } else if (action != null && id != null && action2 == null && id2 == null) {
                return Restangular.one(moduleType, organizationId)
                    .one(action, id)
                    .get(queryParams)
                    .then(function(response) {
                        return response;
                    }, handleError);
            } else if (action != null && id == null && action2 == null && id2 == null) {
                return Restangular.one(moduleType, organizationId)
                    .one(action)
                    .get(queryParams)
                    .then(function(response) {
                        return response;
                    }, handleError);
            } else if (action == null && id == null && action2 == null && id2 == null) {
                return Restangular.one(moduleType, organizationId)
                    .get(queryParams)
                    .then(function(response) {
                        return response;
                    }, handleError);
            } else {
                return Restangular.one(moduleType, organizationId)
                    .one(action, id)
                    .one(action2, id2)
                    .get(queryParams)
                    .then(function(response) {
                        return response;
                    }, handleError);

            }
        };

        var postData = function(postParams) {
            return Restangular.one('auth', 'signup')
                .customPOST(postParams)
                .then(function(response) {
                    $log.log(response.data);
                    return response.data;
                }, handleError);
        };

        function handleError(response) {
            $log.log(response);
        }

        return{
            getData : getData,
            postData : postData
        }
	}
})();