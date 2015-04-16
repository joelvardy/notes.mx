notesApp.factory('HttpInterceptorAuthentication', ['$q', '$injector', 'Api', function ($q, $injector, Api) {
    return {

        responseError: function (response) {

            if (response.status === 401 && response.config.url !== Api.getPath() + '/users/authenticate') {
                $injector.get('$state').transitionTo('logout');
            }

            return response || $q.when(response);

        }

    };
}]);
